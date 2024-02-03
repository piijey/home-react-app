# home-react-app
[piijey.github.io](https://piijey.github.io/) で公開中の React アプリのソースコードです

## こんにちは、みなさん！ `SoundButton`
※ 非表示中  
ぴぇぴぇ鳴くボタンです。再生と一時停止ができます。
ボタンを押すと `isPlaying` 状態を反転します。状態の変更を `useEffect` で検知して、`isPlaying` が `true` の場合は音声を再生し、`false` の場合は一時停止します。

## ミニゲーム `Board`
ちっちゃいゲームです。
3x3のマス（ボタン）には、0~3 の値 (`value`、色に相当) が割り当てられ、ボタンをクリックすると値が1ずつ増加します。縦・横・斜めいずれかのボタンの値が揃ったら、ボタンが透明 (`value = 0`) に変化します。すべてのボタンが透明になったら、音を鳴らします。

ボタンのクリック操作や色は `Square` 関数で、盤面の配置や状態管理などは `Board` 関数で行っています。Reactの [チュートリアル：三目並べ](https://ja.react.dev/learn/tutorial-tic-tac-toe) を参考にしました。

## リンク `ListLinks`
SNS、GitHub、ブログ、作成中のアプリへのリンク

## その他
- タイトルのフォント: ["Monomaniac One" by Maniackers Design](https://fonts.google.com/specimen/Monomaniac+One)
- ゲーム終了の音: ["game-win.mp3" by mickleness, Freesound](https://freesound.org/people/mickleness/sounds/269198/)
- ボタン・コンテナ: [Bootstrap](https://getbootstrap.jp/)
- アイコン: [React Icons](https://react-icons.github.io/react-icons/)
