export default `
<div class="add-user-container {{#if openedPop}} opened{{/if}}">
     
            <form>

            <p>Add user to chat </p>

            {{{ searchInput }}}

            <div class="add-user-container-result"> 

            {{{SearchedUsers}}}

            </div>


            {{{button}}}

            </form>
   

</div>

`;
