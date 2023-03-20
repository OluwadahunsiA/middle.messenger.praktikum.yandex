export default `

    <div class="container">

      
        {{#if isUsers}}

          {{{cancelSearch}}}

          {{#if isNotFoundUser}}

            <p> User does not exist </p>
          
              {{else}}

                {{#each users}}
                  <div class="chats-list">

                      <div class="chats-list__single" data-user-id="{{id}}">
                        <img
                          class="chats-list__single-image"
                          src="{{#if  avatar }}{{@root.baseUrl}}{{avatar}}{{else}}{{@root.avatar}}{{/if}}"
                          alt="user picture"
                          >

                          <div class="chats-list__single-sender">
                            <div class="chats-list__single-sender-name">{{first_name}} {{second_name}}</div>
                              <p class="chats-list__single-sender-login">@{{login}}</p>
                          </div>

                      </div>
                  </div>
                {{/each}}

          {{/if}}

        {{/if}}

        {{#if isChats}}

          {{#each chats}}
            <div class="chats-list">

              <div class="chats-list__single" id="chat_list_click" data-chat-id="{{id}}">
                <img
                  class="chats-list__single-image"
                  src="{{#if  avatar }}{{ @root.baseUrl}}{{avatar}}{{else}}{{@root.avatar}}{{/if}}"
                  alt="user picture"
                >

                <div class="chats-list__single-sender">
                  <div class="chats-list__single-sender-name" id="chat_list-title">{{title}}</div>
                  <div class="chats-list__single-sender-text">{{last_message.content}}</div>
                </div>


                <div class="chats-list__single-info">
                  <div class="chats-list__single-info-time">{{last_message.time}}</div>
                    {{#if unread_count}}
                      <div class="chats-list__single-info-quantity">{{unread_count}}</div>
                    {{/if}}

                  </div>

              </div>
            </div>

          {{/each}}

        {{/if}}
      
   

    </div>
`;
