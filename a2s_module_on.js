a2sm_on = {
  aInternal: false,
  aListener: function(val) {},
  set active(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get active() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
}

a2sm_on.registerListener(function(active) {
  if(active == true){
    activate_select_fields()
  }
  else{
    deactive_select_fields()
  }
});

ajax_request = {
  aInternal: false,
  aListener: function(val) {},
  set active(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get active() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
}

ajax_request.registerListener(function(active) {
  if(active == true){
    console.log('activate == true')
    showSpinner()
    showButtonWhiteHand()
    hide_data_container()
    $('#data-container').removeClass('display-none')
    $('.pagination-custom').removeClass('display-none')
    $(".original-topics").addClass('display-none')

  }
  else if(active == false){
    console.log('activate == akse')
    $('.pagination-custom').addClass('display-none')
    $(".original-topics").removeClass('display-none')
    $('.pagination-custom').addClass('display-none')
    $(".original-topics").removeClass('display-none')
    $('.pagination-custom').addClass('display-none')
    $(".original-topics").removeClass('display-none')

    $('#data-container').addClass('display-none')
    $('.pagination-custom').addClass('display-none')
    $(".original-topics").removeClass('display-none')
  }
});
