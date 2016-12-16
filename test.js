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
            var result = check($t.val());
           if(result.length > 0) {
                $t.trigger('newInput', result);
            }
            $t.data('oldVal', $t.val());
        }
    });
    setTimeout(scan, 100);
})();

var blackList = {
  script: [],
  img: ['src', 'onmouseover', 'onerror', 'dynsrc', 'lowsrc'],
  iframe: ['src'],
  input: ['src'],
  body: ['background', 'onload'],
  sytle: ['url', 'import'],
  svg: ['onload'],
  link: ['rel'],
  a: ['href'],
  video: ['onerror'],
  php: ['echo']
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
                        result += 'XSS Vulnerability: &lt;' + key + '&gt; ' + attr + " <br/>";
                    }
                });
            };
        }
    //console.log(result);
    return result;
}
