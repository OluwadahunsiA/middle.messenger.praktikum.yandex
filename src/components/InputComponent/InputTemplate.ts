export default `
<div class="input__field">
  <label for="{{label}}">{{label}}:</label>
  <input
    id="{{id}}"
    name="{{name}}"
    type="{{type}}"
    placeholder="{{placeholder}}"
    value="{{value}}"
  />
  <span class="errorMessage">{{error}}</span>
</div>
`;
