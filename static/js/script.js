document.addEventListener('DOMContentLoaded',function(){
    const form=document.querySelector('form');
    const resultDiv= document.getElementById('result');
    let emotionChart;


    form.addEventListener('submit',function(event){
        event.preventDefault();

        const inputText=document.getElementById('inputText').value;

        fetch('/',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({text:inputText}),
        })
        .then(response => response.json())
        .then(data=>{
            const ctx=document.getElementById('emotionChart').getContext('2d');
            if(emotionChart){
                emotionChart.destroy();
            }
            emotionChart=new Chart(ctx,{
                type: 'polarArea',
                data : {
                    labels: ["喜び", "信頼", "恐怖", "驚愕", "悲しみ", "嫌悪", "怒り", "期待"],
                    datasets: [{
                        label:'感情分析結果',
                        data:Object.values(data),
                        backgroundColor:[
                            "rgba(255, 255, 0,0.2)", 
                            "rgba(0, 255, 0,0.2)", 
                            "rgba(0, 128, 0,0.2)",
                            "rgba(0, 255, 255,0.2)", 
                            "rgba(0, 0, 255,0.2)",
                            "rgba(128, 0, 128,0.2)", 
                            "rgba(255, 0, 0,0.2)",
                            "rgba(255, 165, 0,0.2)"
                        ]

                    }]
                },
                options:{
                    scale:{
                        ticks:{beginAtZero:true}
                    },
                    
                    animation:{
                        duration:3000
                    }
                
                }
            
            });
        })
        .catch(error =>{
            console.error('Error:',error);
            resultDiv.textContent='エラーが発生しました。';        
        });
    });
});