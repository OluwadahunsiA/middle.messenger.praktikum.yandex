export default `

<div class="messages">
    {{#if currentChat}}

      <div class="messages__display">

        <div  class="messages__display-heading">
          <div class="messages__display-heading-info">
            <img src="{{#if currentChat.avatar}}{{baseUrl}}{{currrentChat.avatar}}{{else}}{{defaultPicture}}{{/if}}" alt="user picture" />
            <p> {{currentChat.title}}</p>
          </div>

          <div class="messages__display-heading-dots">
            
              <img src="{{moreOptions}}" alt="three dots" />
              <input type="checkbox">

              <div class="messages__display-heading-dots-dropdown">
                <ul>
                  <li class="delete-chat">Delete chat</li>
                  <li class="delete-user">Delete Users</li>
                  <li class="add-user">Add users</li>

                </ul>
              
              </div>
           
          </div>
        
        </div>

        
        <div> 

          <p> Chat created </p>

            {{#each messages}}

                {{{ this }}}

            {{/each}}

        </div>
      
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


`;
