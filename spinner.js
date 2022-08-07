function hideSpinner(){
  if($("#loading").hasClass('display-none')==false){
    $("#loading").addClass('display-none')
  }
}

function showSpinner(){
  if($("#loading").hasClass('display-none')==true){
    $("#loading").removeClass('display-none')
  }
}
