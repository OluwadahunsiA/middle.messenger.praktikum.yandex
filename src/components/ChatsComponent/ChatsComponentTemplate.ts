export default `

<div class="messages">
    {{#if activeChat}}

      <div class="messages-display">

        <div  class="messages-display-heading">
          <div class="messages-display-heading-info">
            <img {{#if activeChat.avatar}}src="https://ya-praktikum.tech/api/v2/resources{{activeChat.avatar}}" {{else}} src={{defaultPicture}} {{/if}} alt="user picture" />
            <p> {{activeChat.title}}</p>
          </div>

          <div class="messages-display-heading-dots">
            
              <img src="{{moreOptions}}" alt="three dots" />
              <input type="checkbox">

              <div class="messages-display-heading-dots-dropdown">
                <ul>
                  <li class="delete-chat">Delete chat</li>
                  <li class="delete-user">Delete Users</li>
                  <li class="add-user">Add users</li>

                </ul>
              
              </div>
           
          </div>
        
        </div>

        
        <div class="messages-display-content"> 

          <p class="messages-display-content-created"> Chat created </p>

            {{#each messages}}

                {{{ this }}}

            {{/each}}

        </div>
      
      </div>

        {{{sendMessage}}}


    {{/if}}

    {{#if chosenUser}}

      {{{selectChatWithUser}}}

    {{/if}}

    {{#if isEmptyChat}}

      {{{noSelectedChat}}}

    {{/if}}

 


</div>


`;
