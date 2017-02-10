import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.chatMessage.type === "newMessage") {
      return (
        <div>
          <span className="message-username">{this.props.chatMessage.username}</span>
          <span className="message-content">{this.props.chatMessage.content}</span>
        </div>
      );
    } else {
      return (
        <div className="message system">
          {this.props.chatMessage.content}
        </div>
      );
    }
  }
}

export default Message;

