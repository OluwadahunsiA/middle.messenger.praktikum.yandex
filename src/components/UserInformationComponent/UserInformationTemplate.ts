export default `
<div class="profile-container">
  {{{exitButton}}}
  <div class="profile-container__content">
    <div class="profile-container__content-box">

      {{#each avatar}}
        <a class= "profile-container__content-box-link" href="{{picture}}">
        <img class="profile-container__content-box-image" src="{{avatar}}" alt="user picture" />
        </a>
      {{/each}} 

      {{#if name}}
        <b class="profile-container__content-box-name">{{name}}</b>
      {{/if}}

      <form>

         {{#if name}}

          {{#each profile}}

            <input
              class="profile-container__content-box-uneditable"
              id="{{field}}"
              type="{{field}} "
              name="{{field}}"
              placeholder="{{fieldValue}}"
              disabled
            />

          {{/each}}

        {{else if change}}

          {{#each changePassword}}

            {{> "input-field/input-field" }}

          {{/each}}

        {{else}}
        
           {{{email}}}
           {{{login}}}
           {{{firstName}}}
           {{{secondName}}}
           {{{displayName}}}
           {{{phone}}}

        {{/if}}

        <div>

          {{{ content }}}

        </div>
      </form>

    </div>
  </div>
</div>
`;
