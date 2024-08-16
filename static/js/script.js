const buttonOpen = document.getElementById('modalOpen');
const modal = document.getElementById('Modal');
const buttonClose = document.getElementsByClassName('modalClose')[0];

// ボタンがクリックされた時
buttonOpen.addEventListener('click', modalOpen);
function modalOpen() {
  modal.style.display = 'block';
}

// バツ印がクリックされた時
buttonClose.addEventListener('click', modalClose);
function modalClose() {
  modal.style.display = 'none';
}

// モーダルコンテンツ以外がクリックされた時
addEventListener('click', outsideClose);
function outsideClose(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}


function interpolateData(data, numPoints) {
    const interpolatedData = [];

    function catmullRom(p0, p1, p2, p3, t) {
        const t2 = t * t, t3 = t2 * t;
        return p1.map((_, i) => (
            0.5 * ((2 * p1[i]) + (-p0[i] + p2[i]) * t + (2 * p0[i] - 5 * p1[i] + 4 * p2[i] - p3[i]) * t2 + (-p0[i] + 3 * p1[i] - 3 * p2[i] + p3[i]) * t3)
        ));
    }

    const extendedData = [data[0], ...data, data[data.length - 1]];

    for (let i = 1; i < extendedData.length - 2; i++) {
        interpolatedData.push(extendedData[i]);
        for (let j = 1; j <= numPoints; j++) {
            interpolatedData.push(catmullRom(extendedData[i-1], extendedData[i], extendedData[i+1], extendedData[i+2], j / (numPoints + 1)));
        }
    }
    interpolatedData.push(data[data.length - 1]);
    return interpolatedData;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const resultDiv = document.getElementById('result');
    const loader=document.getElementById('loader');
    let emotionChart;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        loader.style.display='flex';
        resultDiv.style.display='none';

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: document.getElementById('inputText').value,
                    splitNum: document.getElementById('splitNum').value
                }),
            });
            data = await response.json();
            console.log('Received data:', data);

            const ctx = document.getElementById('emotionChart').getContext('2d');
            const emotions = ["喜び", "信頼", "恐怖", "驚愕", "悲しみ", "嫌悪", "怒り", "期待"];
            colors = [
                "rgba(255, 255, 0,1)", "rgba(0, 255, 0,0.7)", "rgba(0, 128, 0,0.5)",
                "rgba(0, 255, 255,0.5)", "rgba(0, 0, 255,0.5)", "rgba(128, 0, 128,0.5)", 
                "rgba(255, 0, 0,0.5)", "rgba(255, 165, 0,0.8)"
            ];
            loader.style.display='none';
            resultDiv.style.display='block';
            if (emotionChart) emotionChart.destroy();

            if (data.length === 1) {
                colors = [
                    "rgba(255, 255, 0,0.3)", "rgba(0, 255, 0,0.3)", "rgba(0, 128, 0,0.3)",
                    "rgba(0, 255, 255,0.3)", "rgba(0, 0, 255,0.3)", "rgba(128, 0, 128,0.3)", 
                    "rgba(255, 0, 0,0.3)", "rgba(255, 165, 0,0.3)"
                ];
                emotionChart = new Chart(ctx, {
                    type: 'polarArea',
                    data: {
                        labels: emotions,
                        datasets: [{
                            label: '感情分析結果',
                            data: Object.values(data[0]),
                            backgroundColor: colors.map(color => color.replace(/0\.9|0\.5/, '0.2'))
                        }]
                    },
                    options: {
                        scale: { ticks: { beginAtZero: true } },
                        plugins:{
                            legend: {
                                position:'top',
                                labels:{
                                    boxWidth: 15
                                }
                                
                            }
                        },
                        animation: { duration: 3000 },


                    }
                });
            } else {
                if(data.length!=2)data=data.slice(0,-1)
                const interpolatedData = interpolateData(data, 100 / data.length);
                const datasets = emotions.map((emotion, i) => ({
                    label: emotion,
                    data: interpolatedData.map((row, j) => ({ x: j, y: row[i] })),
                    borderColor: colors[i],
                    backgroundColor: colors[i],
                    borderWidth: 1,
                    tension: 0.6,
                    radius: 0,
                    fill: false,
                }));

                emotionChart = new Chart(ctx, {
                    type: 'line',
                    data: { labels: interpolatedData.map((_, i) => `Part ${i + 1}`), datasets },
                    options: {
                        responsive: true,
                        interaction: { intersect: false },
                        plugins: { 
                            legend:{
                                position: 'top',
                                labels:{
                                    boxWidth: 15
                                }

                        } },
                        animation: {
                            x: {
                                type: 'number',
                                easing: 'linear',
                                duration: 2000 / interpolatedData.length,
                                from: NaN,
                                delay(ctx) { return ctx.index * 2000 / interpolatedData.length; }
                            },
                            y: {
                                type: 'number',
                                easing: 'linear',
                                duration: 2000 / interpolatedData.length,
                                from: ctx => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(0) : 
                                    ctx.chart.data.datasets[ctx.datasetIndex].data[ctx.index - 1]?.y || 
                                    ctx.chart.scales.y.getPixelForValue(0),
                                delay(ctx) { return ctx.index * 2000 / interpolatedData.length; }
                            }
                        },
                        scales: {
                            x: {
                                title: { display: true, text: 'Parts' },
                                beginAtZero: true,
                                ticks: { display: false },
                            },
                            y: { min: 0, beginAtZero: true }
                        }
                    }
                });
            }
            
        } catch (error) {
            loader.style.display = 'none';
            console.error('Error:', error);
            resultDiv.textContent = 'エラーが発生しました。';
            
        }
    });
});