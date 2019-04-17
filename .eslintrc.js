module.exports = {
    "extends": "airbnb-base",
     rules: {
       "no-bitwise": "off",
       "no-mixed-operators": 0,
       "linebreak-style": ["error", "windows"]
     },
     "env": {
       "es6": true,
       "mocha": true,
       "node": true,
       "browser": true,
     },
     "globals": {
       "moment": true
     }
};