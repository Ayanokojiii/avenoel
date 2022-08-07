function set_up_pagination(array, templateMessage){

  let restOfPages = array.length % 20
  let pageNumber = Math.ceil(array.length / 20)
  if(restOfPages == 0){
    let lastButPage = $('#search-module-pagination li').eq(-2)
    var lastButPageIndex = lastButPage.attr('button-page-number')
    var newButPageIndex = parseInt(lastButPage.attr('button-page-number')) + 1
    let newButPage = `
      <li button-page-number="${newButPageIndex}" class="page-item button-page-${newButPageIndex}">
        <a class="page-link">${newButPageIndex}</a>
      </li>`;
    $('#search-module-pagination li').last().before(newButPage)

    if($('[name="type"]').eq(0).val() == 'message-a2rm'){

      numberMatchMessage++
      var currentMessNb = numberMatchMessage
      function checkHere(){
        containerObserver = setInterval(function(){
          if(currentMessNb == numberMatchMessage){
            gPageNumber++
            gUrl = 'https://avenoel.org/forum/' + gPageNumber
            entry(gUrl)
            entry(gUrl)
            clearInterval(containerObserver)
          }
        },1000)
      }
      checkHere()
    }

    //set up new page

    let newPage = `<div page-number="${newButPageIndex}" class="page-group page-group-${newButPageIndex} pagination-overwrite"></div>`;
    $("#data-container").append(newPage);

    $('#search-module-pagination li a').click((e)=>{
      e.preventDefault()
    })

  }
  $("#data-container .page-group").last().append(templateMessage)
  hideSpinner()
  $('#search-module-pagination li').each((i,li)=>{
    if (i === 0) return;
    $(li).click(()=>{
      $('.page-group').addClass('display-none')
      $(`.page-group[page-number=${i}]`).removeClass('display-none');
    })
  })

}


function regexMaker(searchString){
  let searchType = $('[name=search-type]').val()
  let strForRegex;
  if(!typeof searchString == 'string'){
    return;
  }
  if(searchType == 'at-least-one'){
    let arrayOfWords = searchString.trim(',').split(/\s+/)
    arrayOfWords.forEach((word, i) => {
      if(i != (arrayOfWords.length - 1)){
        arrayOfWords[i] = arrayOfWords[i] + '|'
      }
    })
    strForRegex = arrayOfWords.join('')
  }
  else{
    strForRegex = searchString
  }
  return new RegExp(strForRegex, "ig");
}

function throwSearchOnClick(){
  ajax_request.active = false
  $('.hstack button[type]').click(()=>{
    if(a2sm_on.active == true){
      var delay_req;
      var page = 1;
      if($('[name="type"]').eq(0).val() == 'sujet-a2rm'){
        delay_req = 100
      }
      if($('[name="type"]').eq(0).val() == 'message-a2rm'){
        delay_req = 100
      }
      let searchString = $('[name=search]').val()
      if(!/^\s*$/ig.test(searchString)){
        search_pattern = regexMaker(searchString)
        ajax_request.active = true
        gPageNumber = 1;
        entry('https://avenoel.org/forum/' + gPageNumber)
        function sujetLoop(){
          let timeout2 = setInterval(()=>{
            gPageNumber++
            gUrl = 'https://avenoel.org/forum/' + gPageNumber
            entry(gUrl)
          },300)
        }
        if($('[name="type"]').eq(0).val() == 'sujet-a2rm'){
          sujetLoop()
        }
      }
    }
  })
}
