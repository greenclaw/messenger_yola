
export function loadChat(messages){
  return{
    type: "LOAD_CHAT",
    messages
  }
}

export function updateChatId(id){
  return{
    type: "UPDATE_CHAT_ID",
    id
  }
}

export function updateChatList(chats){
  return{
    type: "UPDATE_CHAT_LIST",
    chats
  }
}


export function authorizeUser(uid, name){
  return{
    type: "AUTHORIZE_USER",
    uid,
    name
  }
}


export function updateChat(messages, id){
  return{
    type: "UPDATE_CHAT",
    messages,
    id
  }
}
