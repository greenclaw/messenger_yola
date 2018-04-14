import React from 'react';
import Chat from './Chat';
import classNames from 'classnames';
import ChatList from './ChatList';


class Messenger extends React.Component{

  constructor() {
    super();

    this.state = {
      displayMenu: true,
      displayChats: true,
      currentSelectedKey: ''
    };
  }

  contactListItemClick(e) {
    const id = $(e.target).closest('.chatbox_user__wrapper').data('id');
    const type = $(e.target).closest('.chatbox_user__wrapper').data('type');

    this.setState({
      displayMenu: false,
      currentSelectedKey: type + "_" + id
    });
  }

  switchMenuType() {
    this.setState({displayChats: !this.state.displayChats});
  }

  render(){
    var menuClassName = classNames({
      'chatbox__user-list': true,
      'col-0': true,
      'col-sm-4': true,
      'px-0': true,
      'd-sm-block': true,
      'd-none': !this.state.displayMenu
    });

    var chatWindowClassName = classNames({
      'col-12': true,
      'col-sm-8': true,
      'px-0': true,
      'd-sm-block': true,
      'd-none': this.state.displayMenu
    });

    var menuChatsSwitcherClassName = classNames({
      'switch': true,
      'active': this.state.displayChats
    });

    var menuContactsSwitcherClassName = classNames({
      'switch': true,
      'active': !this.state.displayChats
    });

    console.log(this.props.chats);

    return(
      <div className='container px-0 d-flex align-items-center main-container'>
        <div className='chatbox row mx-0'>
          <div className={menuClassName}>
            <ChatList
                chats={this.props.chats}
                title="Contacts"
                visible={!this.state.displayChats}
                updateChatId={this.props.updateChatId}
                currentSelectedKey={this.state.currentSelectedKey}
                contactListItemClick={this.contactListItemClick.bind(this)}/>
            <ChatList
                chats={this.props.chats}
                title="Chats"
                visible={this.state.displayChats}
                updateChatId={this.props.updateChatId}
                currentSelectedKey={this.state.currentSelectedKey}
                contactListItemClick={this.contactListItemClick.bind(this)}/>

            <div className="menu-type-switcher">
              <div className={menuChatsSwitcherClassName} onClick={this.switchMenuType.bind(this)}>
                Chats
              </div>
              <div className={menuContactsSwitcherClassName} onClick={this.switchMenuType.bind(this)}>
                Contacts
              </div>
            </div>
          </div>

          <div className={chatWindowClassName}>
            <Chat { ...this.props } />
          </div>
        </div>
      </div>
    )
  }
};

export default Messenger;


// switchMobileToMenu={this.switchMobileToMenu.bind(this)}
