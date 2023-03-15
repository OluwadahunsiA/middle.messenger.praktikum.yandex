export default `

<div class="">

  {{#if isUsers}}

      {{#if isNotFoundUser}}

          <p> User does not exist </p>

        {{else}}

          {{#each selectedUsers}}

              <div class="chats-list__single" id="chat_list_click-selected"  data-user-id="{{id}}">
                <img
                  class="chats-list__single-image"
                  src="{{#if  avatar }}{{@root.baseUrl}}{{avatar}}{{else}}{{@root.avatar}}{{/if}}"
                  alt="user picture">

                  <div class="chats-list__single-sender">
                    <div class="chats-list__single-sender-name">{{first_name}} {{second_name}}</div>
                    <p class="chats-list__single-sender-login">@{{login}}</p>
                  </div>

                  <div class="">
                    <input class="remove-select" type="checkbox" checked>
                  </div>
              </div>        

          {{/each}}

              {{#if selectedUsers.length}}

                <div> Add users to the above list </div>

              {{/if}}
          
          {{#each users}}

            <div class="chats-list">

              <div class="chats-list__single" id="chat_list_click" data-user-id="{{id}}">
                <img
                  class="chats-list__single-image"
                  src="{{#if  avatar }}{{ @root.baseUrl}}{{avatar}}{{else}}{{@root.avatar}}{{/if}}"
                  alt="user picture"
                >

                  <div class="chats-list__single-sender">
                    <div class="chats-list__single-sender-name">{{first_name}} {{second_name}}</div>
                    <p class="chats-list__single-sender-login">@{{login}}</p>
                  </div>

                  <div class="">
                    <input class="add-select" type="checkbox">
                  </div>

              </div>

            </div>


          {{/each}}

      {{/if}}

  {{/if}}

</div>
`;
