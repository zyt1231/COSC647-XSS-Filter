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
            if (result.xss) {
                $t.trigger('newInput', result.str);
            }
            $t.data('oldVal', $t.val());
        }
    });
    setTimeout(scan, 100);
})();

//xss type vunerability
var XSSChar = ['&', '<', '>', '\'', '"', '/'];
var codeXSSChar = ['&amp', '&lt', '&gt', '&quot', '&#x27', '&3x2F'];

var XSSHTMLCode = {
    a: ['target', 'href', 'title'],
    abbr: ['title'],
    area: ['shape', 'coords', 'href', 'alt'],
    audio: ['autoplay', 'controls', 'loop', 'preload', 'src'],
    blockquote: ['cite'],
    col: ['align', 'valign', 'span', 'width'],
    colgroup: ['align', 'valign', 'span', 'width'],
    font: ['color', 'size', 'face'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    ins: ['datetime'],
    table: ['width', 'border', 'align', 'valign'],
    tbody: ['align', 'valign'],
    td: ['width', 'rowspan', 'colspan', 'align', 'valign'],
    tfoot: ['align', 'valign'],
    th: ['width', 'rowspan', 'colspan', 'align', 'valign'],
    thead: ['align', 'valign'],
    tr: ['rowspan', 'align', 'valign'],
    video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width'],
    div: ['attr']
};


//check xss vunerability
function check(str) {
    var result = new Object();
    result.str = "";
    result.xss = false;
    for (var i in XSSChar) {
        if (str.includes(XSSChar[i])) {
            result.str += '"' + XSSChar[i] + "\" in the code. It should be changed to \"" + codeXSSChar[i] + "\"<br>";
            result.xss = true;
        }
    }

    //console.log(result.str);
    return result;
};

//check if the tag in string
function CheckTags(str) {
    var string = "<div>" + str + "</div>";
    $(function () {
        var $elements = $(string);//this turns your string into real html
        for (var key in XSSHTMLCode) {
            var element = $elements.find(key);
            var attrs = XSSHTMLCode[key]
            if (element.length > 0) {
                attrs.forEach(function (attr) {
                    if (element.attr(attr)) {
                        // console.log(element.attr(attr));
                        var output = 'Found <' + key + '>' + " in the string with attribute " + attr + " = " + element.attr(attr) + "\n";
                        console.log(output);
                    }
                });
            };
        }
    });
}

CheckTags("<a href='www.attack.com'></a><area href='www.bank.com'></areahref><thead></thead>");
