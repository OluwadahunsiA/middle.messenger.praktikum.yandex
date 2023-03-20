export default `
     <form class="messages__form">

        <div class="messages__form-input">
          <div class="messages__input" > 
            <input name="message" id="message" placeholder="message" type="text" value="{{value}}"/>
            <span class="error-message">{{error}}</span>
          </div>
        </div>

        <div class="messages__form-button">
          <button class="login-form-button" type="submit">send</button>
        </div>
      </form>
`;
