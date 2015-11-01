# memoer
<p>メモを記録して活用出来るアプリを作成する。</P>

<p>フレームワークとして以下を利用する。</p>
<ul>
  <li>BackEnd</li>
  <ul>
    <li>Node.js
    <li>Mongodb
  </ul>
  <li>FrontEnd</li>
  <ul>
    <li>Fluxxor
    <li>React.js
    </ul>
</ul>

#React.js Component
<p>React.jsにて以下のコンポーネントを作成しました。</p>
<ul>
  <li>ContentEditable.jsx:ContentEditableにて入力可能なコンポーネント</li>
  <li>InputLine.jsx：番号とメモを１つにまとめたコンポーネント</li>
  <li>InputMultiLine.jsx：メモをList形式でまとめるコンポーネント</li>
  <li>memoer.jsx：各コンポーネントをまとめたトップコンポーネント</li>
</ul>

#Fluxxor
<p>Fluxxorフレームワークを使用して、ActionとStoreを作成しました。Fluxxorは、ActionとStoreをつなぐDispathcerは、フレームワーク側が受け持ってくれるので、以下を作成。</p>
<ul>
  <li>MemoAction.js:Fluxのアクション</li>
  <li>MemoStore.js：Fluxのストアー</li>
</ul>

