export default `
<div class="message {{type}}" data-message-id="{{ id }}">
  <p class="message-text"> 
      {{ content }}
  </p>
  <p class="message-date"> {{time}} </p>
</div>
`;
