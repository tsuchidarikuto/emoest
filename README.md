# 感情分析Webアプリケーション (EmoEst)

## 使用技術一覧

<p style="display: inline">
  <img src="https://img.shields.io/badge/-Python-F2C63C.svg?logo=python&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Flask-000000.svg?logo=flask&style=for-the-badge">
  <img src="https://img.shields.io/badge/-HTML5-E34F26.svg?logo=html5&style=for-the-badge&logoColor=white">
  <img src="https://img.shields.io/badge/-CSS3-1572B6.svg?logo=css3&style=for-the-badge">
  <img src="https://img.shields.io/badge/-JavaScript-F7DF1E.svg?logo=javascript&style=for-the-badge&logoColor=black">
  <img src="https://img.shields.io/badge/-Chart.js-FF6384.svg?logo=chart.js&style=for-the-badge&logoColor=white">
  <img src="https://img.shields.io/badge/-Render-46E3B7.svg?logo=render&style=for-the-badge&logoColor=white">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [特徴](#特徴)
3. [使用技術](#使用技術)
4. [アクセス方法](#アクセス方法)
5. [使い方](#使い方)

## プロジェクトについて

このプロジェクトは、**感情分析**を行うWebアプリケーション「EmoEst」です。ユーザーがテキストを入力すると、感情分析を実行し、結果をグラフで視覚化して表示します。

## 特徴

- 日本語テキストの感情分析
- 8種類の感情（喜び、信頼、恐怖、驚愕、悲しみ、嫌悪、怒り、期待）のスコアを計算
- テキストを複数のパートに分割して分析可能
- 結果をポーラエリアチャートまたは折れ線グラフで視覚化
- アニメーション付きのグラフ表示

<p align="right">(<a href="#top">トップへ</a>)</p>

## 使用技術

- **フレームワーク**: Flask
- **フロントエンド**: HTML, CSS, JavaScript, Chart.js
- **バックエンド**: Python, MeCab
- **デプロイ**: Render.com

<p align="right">(<a href="#top">トップへ</a>)</p>

## アクセス方法

EmoEstは以下のURLでアクセスできます：

[https://emoest.onrender.com/](https://emoest.onrender.com/)

注意：ローカル環境での実行には感情語辞書が必要なため、現実的ではありません。上記のURLからアクセスしてご利用ください。

<p align="right">(<a href="#top">トップへ</a>)</p>

## 使い方

1. テキストボックスに分析したい日本語の文章を入力します。
2. 分割数を指定します。これにより、テキストを何パートに分けて感情分析を行うかが決まります。
3. 「分析開始」ボタンをクリックします。
4. 分析結果が表示されます：
   - 分割数が1の場合：ポーラエリアチャートで8種類の感情の割合が表示されます。
   - 分割数が2以上の場合：各感情の時系列データが折れ線グラフとして表示されます。

<p align="right">(<a href="#top">トップへ</a>)</p>
