import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
    <div>
      {this.props.messages.map(chatMessage =>
        <div className="message" key={chatMessage.id}>
          <span key={chatMessage.username} className="message-username">{chatMessage.username}</span>
          <span key={chatMessage.content} className="message-content">{chatMessage.content}</span>
        </div>
      )}
    </div>

    );
  }
}

export default MessageList;