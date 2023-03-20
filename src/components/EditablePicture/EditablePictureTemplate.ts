export default `
  <form class="profile-container__content-box-container" name="avatar" method="POST" enctype="multipart/form-data" novalidate>
    <label> 
      <img class="profile-container__content-box-container-image" src="{{avatar}}" alt="user picture" />
      <input type="file" name="avatar" required>
    </label>

    {{{button}}}

  </form>

`;
