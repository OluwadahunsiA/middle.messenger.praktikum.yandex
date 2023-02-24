export default `
  <div class="messages">

  {{#if selectedText }}

    <div class="messages__display">
      <div class="messages__display-heading">
        <div class="messages__display-heading-info">
          <img src="{{userPicture}}" alt="user picture" />
          <p> Randy</p>
        </div>

        <div class="messages__display-heading-dots">
          <a href="/user-profile/edit-profile">
            <img src="{{moreOptions}}" alt="three dots" />
          </a>
        </div>

      </div>

      <div class="messages__display-date">
        <p>Today</p>
      </div>

      <div class="messages__display-text">
        What do you plan to do after lunch?
        <span>6:00pm</span>
      </div>

    </div>
   
    {{{messageInput}}}

    {{else}}

    <div class = "messages__empty"> 
    <h3>Please select chat to start  </h3>
    
    </div>

    {{/if}}
 
  </div>

`;
