module.exports = {
  "extends": ["airbnb", "plugin:jest/recommended"],
  "parser": "babel-eslint",
  "rules": {
    // class modules are there to add propTypes as static class properties
    "react/prefer-stateless-function": "off",
    // Fix linting Link components with to prop
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ],
    }],
  }
};
