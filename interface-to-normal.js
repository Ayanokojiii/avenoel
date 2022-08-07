function returnInterfaceToNormal(){
  emptyPages()
  hideSpinner()
  hideButtonWhiteHand()
  hide_data_container()
  show_topics_list()
  $('.pull-right, .pull-left').removeClass('display-none')
  show_topics_list()
}

function emptyArrays(){
  arrayInTopicMessagesIds = []
  arrayInTopicMessages = []
  arrayForumTopics = []
  arrayInTopicPages = [];
}

function emptyPages(){
  $('#search-module-pagination').remove()
}
