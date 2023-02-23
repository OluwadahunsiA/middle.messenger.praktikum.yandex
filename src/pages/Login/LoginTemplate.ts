export default `
<div class="login">
  <h2 class="login__title">Sign In</h2>
  <form class="login__form">
  
    {{{login}}}
    {{{password}}}

    <button class="login__form-button" type="submit">
      <a href="./chats.hbs">Enter</a></button>

  </form>
  <p>New here? <a href="./registration.hbs">Sign up</a> </p>

</div>
`;
