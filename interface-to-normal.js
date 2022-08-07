function returnInterfaceToNormal(){
  emptyArrays()
  emptyPages()
  hideSpinner()
  hideButtonWhiteHand()
  show_topics_list()
  $('.pull-right, .pull-left').removeClass('display-none')
  $('#data-container').addClass('display-none')
}

function emptyArrays(){
  arrayInTopicMessagesIds = []
  arrayInTopicMessages = []
  arrayForumTopics = []
  arrayInTopicPages = [];
}

function emptyPages(){
  $('[page-number]:not([page-number]:first)').remove()
  $('[page-number]:first *').remove()
}
