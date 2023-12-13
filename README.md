# home-react-app
[piijey.github.io](https://piijey.github.io/) で公開中の React アプリのソースコードです

## SoundButton
ぴぇぴぇ鳴くボタンです。再生と一時停止ができます。
ボタンを押すと `isPlaying` 状態を反転します。状態の変更を `useEffect` で検知して、`isPlaying` が `true` の場合は音声を再生し、`false` の場合は一時停止します。

## Board
ちっちゃいゲームです。
四角いボタンを押すたびに `value` が 0~3 の間で1ずつ増加します。すべてのマスの `value` が0に揃ったら、音を鳴らします。

ボタンのクリック操作や色は `Square` 関数で、盤面の配置や状態管理などは `Board` 関数で行っています。[チュートリアル：三目並べ – React](https://ja.react.dev/learn/tutorial-tic-tac-toe) を参考にしました。

## その他
ボタンやコンテナ、アイコンには [Bootstrap](https://getbootstrap.jp/) を使っています。
