var firebase = require('../firebase.js')();
var chats = firebase.database().ref('chats');



function current_chat(state = [], action){

  switch (action.type) {
    case "LOAD_CHAT":
      return {
        messages: action.messages
      }
  
    case "UPDATE_CHAT":
      console.log(action);

      return {
        messages: action.messages,
        id: action.id
      }
      break;

    default:
      return state;
  }

}


export default current_chat;
