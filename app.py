from flask import Flask,render_template,request,jsonify
import emotionest

app=Flask(__name__)

@app.route('/',methods=['GET','POST'])
def index():
    if request.method=='POST':
        
        text=request.json.get('text','')
        if not text:
            return jsonify({"error": "入力データが存在しません"}), 400
        split_num=int(request.json.get('splitNum',''))
        
        try:
            text_parts = split_text(text, split_num)
        except Exception as e:
            return jsonify({"error": "テキストの分割中にエラーが発生しました: " + str(e)}), 500
        emotions=[emotionest.get_emoval(part).tolist() for part in text_parts]

        
        return jsonify(emotions)
    return render_template('index.html')

def split_text(text,split_num):
    length=len(text)
    part_length=length//split_num
    return [text[i:i+part_length] for i in range(0, length, part_length)]


if __name__=='__main__':
    import os
    port =int(os.environ.get('PORT',5000))
    app.run(host='0.0.0.0',port=port)