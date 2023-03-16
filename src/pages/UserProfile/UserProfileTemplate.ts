export default `
<div class="profile-container">
  {{{exitButton}}}
  <div class="profile-container__content">
    <div class="profile-container__content-box">

      {{{userPicture}}}

        
      <b class="profile-container__content-box-name">{{name}}</b>

        <form>
        {{{email}}}
        {{{login}}}
        {{{firstName}}}
        {{{secondName}}}
        {{{phone}}}
        {{{button}}}
        </form>

        <div class="profile-container__content-box-actions">
          {{{linkToPassword}}}
          {{{logout}}}
        </div>

    </div>
 
  </div>
</div>
`;
