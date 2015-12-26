/*var r = document.createRange();
r.setStart(document.body,0);
r.setEnd(document.body,document.body.childNodes.length-1);
r.selectNodeContents(document.body);
*/
var ele = document.getElementsByTagName("body");
 ele[0].addEventListener('mouseover',function(ev){
    var selection = getSelection();
    if(selection.rangeCount > 0){
      var range = selection.getRangeAt(0);
      //新しいspan要素を作る
      var newspan = document.createElement('span');
      //background-colorを設定
      newspan.style.backgroundColor="red";

      var df = range.extractContents();
      newspan.appendChild(df);
      range.insertNode(newspan);
    }
  },false);

 var test = document.getElementById("main");
 test.addEventListener('input', function(el){
 	var range = document.createRange();

 	range.selectNodeContents(this)
 	var sel = window.getSelection();
 	sel.removeAllRanges();
 	sel.addRange(range);

 },false);