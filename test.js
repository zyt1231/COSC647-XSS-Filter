// Choose relevant input elements
var inputs = $('#code')
  // Bind a new event to the inputs
  .bind("newInput", function(event,p1){
    var $t = $(this);
    $('#log').text(p1);
  });

(function scan(){

  inputs.each(function() {
    $t = $(this);
    if ( $t.data('oldVal') !== $t.val() ) {
      $t.trigger('newInput',check($t.val()));
      $t.data('oldVal',$t.val());

    }
  });
  setTimeout(scan,100);
})();

//xss type vunerability
var XSSChar = ['&', '<', '>', '\'','"', '/'];
var codeXSSChar = ['&amp', '&lt', '&gt', '&quot', '&#x27', '&3x2F'];

var XSSHTMLCode = {
  a:      ['target', 'href', 'title'],
  abbr:   ['title'],
  area:   ['shape', 'coords', 'href', 'alt'],
  audio:  ['autoplay', 'controls', 'loop', 'preload', 'src'],
  blockquote: ['cite'],
  col:    ['align', 'valign', 'span', 'width'],
  colgroup: ['align', 'valign', 'span', 'width'],
  font:   ['color', 'size', 'face'],
  img:    ['src', 'alt', 'title', 'width', 'height'],
  ins:    ['datetime'],
  table:  ['width', 'border', 'align', 'valign'],
  tbody:  ['align', 'valign'],
  td:     ['width', 'rowspan', 'colspan', 'align', 'valign'],
  tfoot:  ['align', 'valign'],
  th:     ['width', 'rowspan', 'colspan', 'align', 'valign'],
  thead:  ['align', 'valign'],
  tr:     ['rowspan', 'align', 'valign'],
  video:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width'],
  div:    ['attr']
};


//check xss vunerability
function check(str){
  var result = "";

  for(var i in XSSChar){
    if(str.includes(XSSChar[i])) {
      result += '"'+XSSChar[i]+ '"' + " in the code. It should be changed to " + '"' +codeXSSChar[i] +'"'+ "\n";
    }
  }

  //console.log(result);
  return result;
};
