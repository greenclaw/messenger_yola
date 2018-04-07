var firebase = require("firebase");
  const config = {
    apiKey: "AIzaSyDAIPOtQEJGMs7W7BOuDWpVpPWK5Pm0juk",
    authDomain: "messanger-yola.firebaseapp.com",
    databaseURL: "https://messanger-yola.firebaseio.com",
    projectId: "messanger-yola",
    storageBucket: "messanger-yola.appspot.com",
    messagingSenderId: "306161806803"
  };
  firebase.initializeApp(config);
module.exports = function(){
    return firebase;
}
