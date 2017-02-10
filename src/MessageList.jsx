import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    return (
      <div>
        {this.props.messages.map(chatMessage =>
          <div className="message" key={chatMessage.id}>
            <Message chatMessage={chatMessage} />
          </div>
        )}
      </div>
    );
  }
}


export default MessageList;