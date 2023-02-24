export default `
<div class="change-avatar">

  <div class="change-avatar__container">
    <h2 class="change-avatar__text">Upload a new picture</h2>

    <p>Select a file from your device</p>
    <form>

      <input type="file" name="avatar" />

      {{{button}}}

    </form>

     <br></br>  
    <a href="/edit-profile">Go back</a>
  </div>

</div>
`;
