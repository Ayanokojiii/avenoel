

function insertButtonWhiteHand(){
  let buttonWHand = `
  <div>
    <button type="button" class="btn btn-grey wHand display-none">
      <span class="glyphicon glyphicon-stop"></span>
    </button>
  </div>`;
  if($('.wHand').length == 0){
    $(buttonWHand).appendTo('.hstack')
  }
  $('.wHand').click(()=>{
    ajax_request.active = false
    hideSpinner()
    $('.pagination-custom').addClass('display-none')
    $(".original-topics").removeClass('display-none')
  })
}

function hideButtonWhiteHand(){
  if($('.wHand').hasClass('display-none') == false){
    $('.wHand').addClass('display-none')
  }
}

function showButtonWhiteHand(){
  if($('.wHand').hasClass('display-none') == true){
    $('.wHand').removeClass('display-none')
  }
}
