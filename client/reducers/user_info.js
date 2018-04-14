function user_info(state = [], action){
  switch (action.type) {
    case "AUTHORIZE_USER":
      return {
        name: action.name,
        uid: action.uid
      }
    default:
      return state;
  }

}


export default user_info;
