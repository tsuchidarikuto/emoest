from flask import Flask,render_template,request,jsonify
import emotionest

app=Flask(__name__)

@app.route('/',methods=['GET','POST'])
def index():
    if request.method=='POST':
        text=request.json.get('text','')
        result=emotionest.get_emoval(text).tolist()
        return jsonify(result)
    return render_template('index.html')

if __name__=='__main__':
    app.run(debug=True)