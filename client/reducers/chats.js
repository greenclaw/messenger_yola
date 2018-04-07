function chats(state = [], action){
  switch (action.type) {
    case "UPDATE_CHAT_LIST":
      return action.chats
    default:
      return state;
  }

}
export default chats;
