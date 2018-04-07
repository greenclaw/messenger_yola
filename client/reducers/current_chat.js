function current_chat(state = [], action){
  switch (action.type) {
    case "LOAD_CHAT":
      return {
        messages: action.messages
      }    

    case "UPDATE_CHAT":
      return {
        messages: action.messages
      }
    default:
      return state;
  }

}


export default current_chat;
