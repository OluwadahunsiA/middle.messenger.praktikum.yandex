
export default `
<div class="content">
  <div class="chats">

    <a class="chats__user" href="/user-profile">Profile ></a>

    <div class="chats__input">
      <input name="search" placeholder="search" />
    </div>

    <div class="chats__content">
      
      {{{chatList}}}

    </div>

  </div>

  <div class="messages">
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
    <div class="messages__input">
      <input name="message" id="message" placeholder="message" />
    </div>
  </div>

</div>

`;
