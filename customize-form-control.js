function cloneStyle(original, target){
  let $original = $(original);
  let $target = $(target);

  $target
    .prop("style", $original.attr("style"))
    .addClass($original.attr("class"));
}

function hide_topics_list(){
    $(".original-topics").addClass('display-none')
}

function show_topics_list(){
    $(".original-topics").removeClass('display-none')
}

function hide_data_container(){
    $('#data-container').addClass('display-none')
    $('#search-module-pagination').addClass('display-none')
}

function show_data_container(){
    $('#data-container').removeClass('display-none')
    $('#search-module-pagination').removeClass('display-none')
}

function appendPagination(){
  $('.pagination-default').eq(0).after(`
    <div class="pagination-custom display-none">
      <div id="loading"></div>
      <div id="search-module-pagination">
        <ul class="pagination pagination-bar">
          <li class="page-item">
            <a class="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li button-page-number="1" class="page-item button-page-1">
              <a class="page-link">1</a>
          </li>
          <li class="page-item">
            <a class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </div>
      <div id="data-container" style="text-align: left !important" class="display-none">
        <div page-number="1" class="page-group page-group-1"></div>
      </div>
    </div>
    `)
}

function customize_form_control(){

  let messageA2RM =
  `<option value="message-a2rm">
    Message
  </option>`;
  let sujetA2RM =
  `<option value="sujet-a2rm">
    Sujet (A2RM)
  </option>`;
  let auteurA2RM =
  `<option value="auteur-a2rm">
    Auteur (A2RM)
  </option>`;
  let selectTypeOfSearch =
  `<div class="select-addendum display-none">
    <select name="search-type" style="max-width: 120px" class="form-control display-none">
      <option value="at-least-one">
        Au moins l'un des termes
      </option>
      <option value="full-string">
        Expression exacte
      </option>
    </select>
  </div>`
  let pageInterval =
    `<div class="select-addendum display-none">
      <input class="form-control" type="number" value="1" placeholder="despuis la page..." style="max-width: 50px" min="1">
    </div>`


  $('fieldset select.form-control').eq(0).append(messageA2RM)
  $('fieldset select.form-control').eq(0).append(sujetA2RM)
  $('fieldset select.form-control').eq(0).append(auteurA2RM)
  $('fieldset .hstack div').eq(2).before(selectTypeOfSearch)
  cloneStyle('fieldset div:nth-child(2) select.form-control','fieldset div:nth-child(3) select.form-control')
  $('fieldset .hstack div').eq(3).before(pageInterval)

  $(document).on('change','select:first.form-control',function(e){
    var fieldValues = /message-a2rm|sujet-a2rm|auteur-a2rm/ig
      if(e.currentTarget.value.match(fieldValues)){
        a2sm_on.active = true
      }
      else{
        a2sm_on.active = false
      }
  });
}


//activate / deactivate

function activate_select_fields(){
  $('fieldset button').attr('type','button')
  $('fieldset button').attr('type','button')
  $('.select-addendum').removeClass('display-none')
  showButtonWhiteHand()
}

function deactive_select_fields(){
  $('fieldset button').attr('type','submit')
  $('.select-addendum').addClass('display-none')
  hideButtonWhiteHand()
}
