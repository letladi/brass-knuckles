module.exports = {
  "plugins": ["jest"],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": ["error", 2],
        "semi": [
            "error",
            "never"
        ]
    }
};
