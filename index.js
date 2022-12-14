

//Data collections
var arrayInTopicMessagesIds = []
var arrayInTopicMessages = []
var arrayForumTopics = []

var arrayInTopicPages = []
var search_pattern = /je/;
//ajax
var ajax_request;
var searchForumPage;
var searchForumTopic;

//topic search
var glob = {}
arrayForumTopicsComplete = []
var arrayTopicHref = []
var page = 1;

var gUrl = '';
var gPageNumber;

//
var containerObserver;
var numberMatchMessage = 0;

function init(){
  $(document).ready(()=>{
    $('.topics').addClass('original-topics')
  })
  customize_form_control()
  appendPagination()
  insertButtonWhiteHand()
  throwSearchOnClick()
  $('#data-container').removeClass("display-none")
}

function entry(url){
  hideSpinner()
  $("#search-module-pagination").removeClass('display-none')
  $('.pagination-custom').removeClass('display-none')

  if(!$('.pull-right, .pull-left').hasClass('display-none')){
    $('.pull-right, .pull-left').addClass('display-none')
  }
  let ajax = $.ajax({
  	url: url,
  	dataType: "html",
  	success: function(data){
      main_procedure(data)
    }
	})
}

function main_procedure(data) {
  if(ajax_request.active == false){
    hideSpinner()
    $('.pagination-custom').addClass('display-none')
    $(".original-topics").removeClass('display-none')
    return;
  }
  hide_topics_list()
  $('#search-module-pagination').removeClass('display-none')
  if($('[name="type"]').eq(0).val() == 'message-a2rm'){
    retrieve_forum_topics(data)

  }
  if($('[name="type"]').eq(0).val() == 'sujet-a2rm'){
      fill_up_complete_topics_array(data)
  }
}


function template_maker(data, search_pattern){
  if(ajax_request.active == false){
    hideSpinner()
    $('.pagination-custom').addClass('display-none')
    $(".original-topics").removeClass('display-none')
    return;
  }
    var $data = $(data);
      try{
        console.log('alright')
        $data.find('.message-content').each(function() {

        var $this = $(this);
        var text = $this.text();
        var message = $this.parent('.message-wrapper').eq(0)
        var messageDate = message.find('.message-date').html()
        var messageId = message.find('.message-permalink').html()
        message.find('iframe').remove()
        var messageContent = message.find('.message-content').html()
        var messageUsername = message.find('.message-username').html()
        //var topicLink  = $data.find('link[rel~=canonical]').eq(0).href
        //console.log(topicLink)

        if (text.match(search_pattern) && arrayInTopicMessagesIds.includes(messageId) == false) {

          arrayInTopicMessagesIds.push(messageId)
          arrayInTopicMessages.push({message : message, messageId : messageId})
          messageContent = messageContent.replaceAll(search_pattern, '<span style="background-color:orange; color: #000">' + '$&' + '</span>')
          message.find('.message-content').html()
          var templateMessage = `
            <div class='topic-messages pagination-overwrite' style="background-color:#444">
              <div class="row topic-message odd flex"></div>
              <div class="message-wrapper padding-15">
                <div class="message-header">
                  <div class="message-username">
                    ${messageUsername}
                  </div>
                  <div class="message-date">
                    ${messageDate}
                  </div>
                </div>
                <div class="message-content">
                  ${messageContent}
                </div>
              </div>
              <div class="m-1" style="height: 10px"></div>
            </div>
            <div class="m-1" style="height: 20px"></div>
          `;
          //templateMessage = templateMessage.replaceAll(search_pattern, '<span style="background-color:orange; color: #000">' + '$&' + '</span>')
          set_up_pagination(arrayInTopicMessages, templateMessage)

        }
      })
      }
      catch(e){
        console.log(e.message)
      }

}

function fill_up_complete_topics_array(data){
  if(ajax_request.active == false){
    hideSpinner()
    $('.pagination-custom').addClass('display-none')
    $(".original-topics").removeClass('display-none')
    return;
  }
  $(data).find('tbody tr').each(function(index, topic_row) {
    $($(topic_row)).css('text-align','left !important')
    if($(topic_row).text().match(search_pattern)){
      arrayForumTopicsComplete.push(topic_row)
      set_up_pagination(arrayForumTopicsComplete, topic_row)
      let href = $(topic_row).find('[href]').eq(0).attr('href')
      arrayTopicHref.push(href)
    }
  });

}


function retrieve_forum_topics(data) {

  var $data = $(data);
  $data.find('.topics-title a').each(function(i,el) {
    var ajax_req = $.ajax({
      url: $(this).attr('href'),
      dataType: "html",
      success: function(forums_topic) {
        arrayForumTopics.push(forums_topic)
        retrieve_in_topic_pages(forums_topic, arrayInTopicMessages)
      }
    })
  });

  gPageNumber = gPageNumber + 1
  gUrl = 'https://avenoel.org/forum/' + gPageNumber
  entry(gUrl);

}




async function retrieve_in_topic_pages(topic, arrayInTopicMessages){
  $topic = $(topic);
    $topic.find('.pagination-topic:first > li > a').not(':first').not(':last').each(function() {
    	arrayInTopicPages.push($(this).attr('href'));
    });
    template_maker(topic, search_pattern)
}
//
$(document).ready(()=>{
  init()
})
