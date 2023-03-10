export default `
<div>
{{#each messages}}
    <a href="/chats/id">

      <div class="container">
        <div class="chats-list">
          <div class="chats-list__single">
            <img
              class="chats-list__single-image"
              src="{{ avatar }}"
              alt="user picture"
            >

            <div class="chats-list__single-sender">
              <div class="chats-list__single-sender-name">{{name}}</div>
              <div class="chats-list__single-sender-text">{{message}}</div>
            </div>

            <div class="chats-list__single-info">
              <div class="chats-list__single-info-time">{{time}}</div>
              {{#if quantity}}
                <div class="chats-list__single-info-quantity">{{quantity}}</div>
              {{/if}}

            </div>

          </div>
        </div>
      </div>
    </a>
{{/each}}
</div>

`;
