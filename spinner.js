function hideSpinner(){
    $("#loading").addClass('display-none')
}

function showSpinner(){
  if($("#loading").hasClass('display-none')==true){
    $("#loading").removeClass('display-none')
  }
}
