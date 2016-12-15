// Choose relevant input elements
var inputs = $('input,textarea')
  // Bind a new event to the inputs
  .bind("newInput", function(p1){
    // Abbreviate
    var $t = $(this);
    //$('#log').text($t.val()+$t.attr('id')+": Suffer from XSS.\n");
    //pop out alert
    alert("Input "+$t.attr('id')+": Suffer from XSS.\n"+p1);
  });

(function scan(){

  inputs.each(function() {
    $t = $(this);
    if ( $t.data('oldVal') !== $t.val() ) {
      $t.data('oldVal',$t.val());
      if(check($t.val())){
        $t.trigger('newInput',"test");
      }

    }
  });
  setTimeout(scan,100);
})();

//xss type vunerability
var xssType = {
  a:      ['target', 'href', 'title'],
  abbr:   ['title'],
  address: [],
  area:   ['shape', 'coords', 'href', 'alt'],
  article: [],
  aside:  [],
  audio:  ['autoplay', 'controls', 'loop', 'preload', 'src'],
  b:      [],
  bdi:    ['dir'],
  bdo:    ['dir'],
  big:    [],
  blockquote: ['cite'],
  br:     [],
  caption: [],
  center: [],
  cite:   [],
  code:   [],
  col:    ['align', 'valign', 'span', 'width'],
  colgroup: ['align', 'valign', 'span', 'width'],
  dd:     [],
  del:    ['datetime'],
  details: ['open'],
  div:    [],
  dl:     [],
  dt:     [],
  em:     [],
  font:   ['color', 'size', 'face'],
  footer: [],
  h1:     [],
  h2:     [],
  h3:     [],
  h4:     [],
  h5:     [],
  h6:     [],
  header: [],
  hr:     [],
  i:      [],
  img:    ['src', 'alt', 'title', 'width', 'height'],
  ins:    ['datetime'],
  li:     [],
  mark:   [],
  nav:    [],
  ol:     [],
  p:      [],
  pre:    [],
  s:      [],
  section:[],
  small:  [],
  span:   [],
  sub:    [],
  sup:    [],
  strong: [],
  table:  ['width', 'border', 'align', 'valign'],
  tbody:  ['align', 'valign'],
  td:     ['width', 'rowspan', 'colspan', 'align', 'valign'],
  tfoot:  ['align', 'valign'],
  th:     ['width', 'rowspan', 'colspan', 'align', 'valign'],
  thead:  ['align', 'valign'],
  tr:     ['rowspan', 'align', 'valign'],
  tt:     [],
  u:      [],
  ul:     [],
  video:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width']
};
//check xss vunerability
function check(str){

};
