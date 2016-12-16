function addDiv() {
    //create a div and append it to body
    var div = document.createElement('div');
    div.id = 'result';
    div.className = 'log block marginLeft';
    document.getElementsByTagName('body')[0].appendChild(div);
}
// Choose relevant input elements
var inputs = $('input,textarea')
// Bind a new event to the inputs
    .bind("newInput", function (event, p1) {
        var $t = $(this);
        //check if result div exist
        if (!document.getElementById('result')) {
            addDiv();
        }
        $('#result').html(p1);
    });

(function scan() {

    inputs.each(function () {
        $t = $(this);
        if ($t.data('oldVal') !== $t.val()) {
            var string = $t.val().toLowerCase();
            var result1 = CheckSymbel(string);
            var result2 = CheckTags(string);
            var result = result1 + result2;
           if(result.length > 0) {
                $t.trigger('newInput', result);
            }
            $t.data('oldVal', $t.val());
        }
    });
    setTimeout(scan, 100);
})();

var XSSChar = ['&', '<', '>', '\'','"', '/'];
var blackList = {
  img: ['src', 'onmouseover', 'onerror', 'dynsrc', 'lowsrc'],
  iframe: ['src'],
  input: ['src'],
  body: ['background', 'onload'],
  sytle: ['url', 'import'],
  svg: ['onload'],
  link: ['rel'],
  a: ['href'],
  video: ['onerror'],
  div: ['attr', 'onmouseover', ]
};

function CheckTags(str) {
    var string = "<div>" + str + "</div>";
    var result = "";
        var $elements = $(string);//this turns your string into real html
        for (var key in blackList) {
            var element = $elements.find(key);
            var attrs = blackList[key]
            if (element.length > 0) {
                attrs.forEach(function(attr){
                    if (element.attr(attr)){
                        //console.log(element.attr(attr));
                        result += 'XSS Vulnerability: user input contains &lt;' + key + ' ' + attr + "= &gt; <br/>";
                    }
                });
            };
        }
    //console.log(result);
    return result;
}


//check xss vulnerability symbel
function CheckSymbel(str){
  var result = "";
  var content = str.replace(/[^a-zA-Z<]+/g, '');
  if(content.includes("<script")) result += "XSS Vulnerability: user input contains &lt;script&gt;.<br/>";
  for(var i in XSSChar){
    if(str.includes(XSSChar[i])) result += "XSS Vulnerability: user input contains " + XSSChar[i] + ".<br/>";
  }
  //find php code
  var checkPHP = str.replace(/ /g, ";");
  if(checkPHP.includes("<?php")){
    var startPHP = checkPHP.indexOf("<?php");
    var endPHP = checkPHP.indexOf("?>");
    var temp = "";
    if(endPHP > startPHP) temp = checkPHP.slice(startPHP, endPHP);
    else temp = checkPHP.slice(startPHP);
    if(temp.includes("echo")) result += "XSS Vulnerability: user input contains PHP code and there is unchecked output inside PHP code.<br/>";
  }
  return result;
}
