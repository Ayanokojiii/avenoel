// ==UserScript==
// @name         Avenoel Module Search
// @namespace    http://avenoel.org
// @version      0.1
// @description  try to take over the world!
// @author       SEHV
// @match        https://avenoel.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=avenoel.org
// @grant    GM_addStyle
// @grant    GM.getValue
// @grant      GM_getResourceText
// @grant      GM_addStyle
// @resource IMPORTED_PAGINATION_CSS https://github.com/superRaytin/paginationjs/blob/master/dist/pagination.css
// @resource IMPORTED_SPINNER_CSS file:///Users/user/Desktop/avenoel/spinner.css
// @resource https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css
// @resource IMPORTED_CUSTOM_CSS file:///Users/user/Desktop/avenoel/additionnal-style.css

// @require http://code.jquery.com/jquery-3.4.1.min.js
// @require https://raw.githubusercontent.com/superRaytin/paginationjs/master/dist/pagination.min.js
// @require file:///Users/user/Desktop/avenoel/interface-to-normal.js
// @require file:///Users/user/Desktop/avenoel/spinner.js
// @require file:///Users/user/Desktop/avenoel/test.js
// @require file:///Users/user/Desktop/avenoel/customize-form-control.js
// @require file:///Users/user/Desktop/avenoel/button-white-hand.js

// @require file:///Users/user/Desktop/avenoel/index.js
// @require file:///Users/user/Desktop/avenoel/a2s_module_on.js
// @require https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js
// ==/UserScript==


const pagination_css = GM_getResourceText("IMPORTED_PAGINATION_CSS");
const spinner_css = GM_getResourceText("IMPORTED_SPINNER_CSS");
const custom_css = GM_getResourceText("IMPORTED_CUSTOM_CSS");
GM_addStyle(pagination_css);
GM_addStyle(spinner_css);
GM_addStyle(custom_css);

//Data collections
var arrayInTopicMessagesIds = []
var arrayInTopicMessages = []
var arrayForumTopics = []

var arrayInTopicPages = []
var search_pattern = /je/;
//ajax
var ajax_request = [];
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
  customize_form_control()
  throwSearchOnClick()
  appendPagination()
  insertButtonWhiteHand()
  $('#data-container').removeClass('display-none')
}

function entry(url){
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
  hide_topics_list()
  $('#search-module-pagination').css('display','block')
  if($('[name="type"]').eq(0).val() == 'message-a2rm'){
    retrieve_forum_topics(data)

  }
  if($('[name="type"]').eq(0).val() == 'sujet-a2rm'){
      fill_up_complete_topics_array(data)
  }
}


function template_maker(data, search_pattern){
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
