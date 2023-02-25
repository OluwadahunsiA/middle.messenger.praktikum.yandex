export default `
<div class="input-field">
  <label for="{{label}}">{{label}}:</label>
  <input
    id="{{id}}"
    name="{{name}}"
    type="{{type}}"
    placeholder="{{placeholder}}"
    value="{{value}}"
  />
  <span class="error-message">{{error}}</span>
</div>
`;
