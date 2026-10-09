export default [
  { ignores:["node_modules/**","coverage/**","uploads/**"] },
  { files:["**/*.js"], languageOptions:{ ecmaVersion:"latest", sourceType:"module" }, rules:{
    "no-unused-vars":["warn",{"argsIgnorePattern":"^_"}],
    "no-console":"off",
    "semi":["error","always"]
  }}
];
