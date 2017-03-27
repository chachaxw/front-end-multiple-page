module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  "globals" : {
		"Vue" : true,
    "axios": true
	},
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'no-console': 0,
    'no-unused-vars': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
