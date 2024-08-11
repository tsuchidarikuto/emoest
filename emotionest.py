import pandas as pd
import numpy as np
import MeCab

def roaddata():
    data=pd.read_csv("./datas/fcm.csv")
    words=data['words']
    emotions=data.drop(columns=['words'])
    emotion_words= ["喜び", "信頼", "恐怖", "驚愕", "悲しみ", "嫌悪", "怒り", "期待"]
    return words,emotions,emotion_words,data


def get_emoval(text):
    words,emotions,emotion_words,data=roaddata()
    mecab=MeCab.Tagger("-Owakati")
    text_keitaiso=mecab.parse(text).split()
    weights=np.zeros(len(emotion_words))

    for word in text_keitaiso:
        word_data=data[data['words']==word]
        if not word_data.empty:
            weights+=word_data[emotion_words].values[0]
    
    weights_sum=np.sum(weights)
    if weights_sum !=0:
        weights_ratio=weights/weights_sum
    else :
        weights_ratio=weights
    return weights_ratio*100

if __name__ =="__main__":
    text=input("ここにテキストを入力")
    result=get_emoval(text).tolist()
    print(result)



