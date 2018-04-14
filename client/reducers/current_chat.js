import {firebase} from '../firebase';

var chats = firebase.database().ref('chats');


function current_chat(state = [], action){

  switch (action.type) {
    case "LOAD_CHAT":
      return {
        messages: action.messages,
        id: state.id
      }
    case "UPDATE_CHAT_ID":
      return {
        messages: {},
        id: action.id
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
