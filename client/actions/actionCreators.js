
export function loadChat(messages){
  return{
    type: "LOAD_CHAT",
    messages
  }
}

export function updateChatList(chats){
  return{
    type: "UPDATE_CHAT_LIST",
    chats
  }
}



export function updateChat(messages, id){
  return{
    type: "UPDATE_CHAT",
    messages,
    id
  }
}
