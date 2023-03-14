export default `

<div class="messages">
  <div class="messages__display"> 
    {{#if currentChat}}

        <div  class="messages__display-heading">
          <div class="messages__display-heading-info">
            <img src="{{#if currentChat.avatar}}{{baseUrl}}{{currrentChat.avatar}}{{else}}{{defaultAvatar}}{{/if}}" alt="user picture" />
            <p> {{currentChat.title}}</p>
          </div>

          <div class="messages__display-heading-dots">
            <a href="/user-profile/edit-profile">
              <img src="{{moreOptions}}" alt="three dots" />
            </a>
          </div>
        
        </div>

        
        <div> 

          <p> Chat created </p>

            {{#each messages}}

                {{{this}}}

            {{/each}}

        </div>

        {{{sendMessage}}}


    {{/if}}

    {{#if selectedUser}}

      {{{selectChatWithUser}}}

    {{/if}}

    {{#if isEmptyChat}}

      {{{noSelectedChat}}}

    {{/if}}

  </div>


</div>


`;
