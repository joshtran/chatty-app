import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      numUsers: 0
    };
    this.createUser = this.createUser.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.socket = new WebSocket('ws://localhost:4000');
  }

  //Receive messages from the server and display
  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("Connected to the websocket server");
    };
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "newMessage") {
        this.setState({
          messages:this.state.messages.concat({
            username: message.username,
            content: message.content,
            id: message.id,
            type: message.type
          })
        });
      }
      if (message.type === "newName") {
        this.setState({
          messages:this.state.messages.concat({
            newname: message.newname,
            oldname: message.oldname,
            content: message.content,
            id: message.id,
            type: message.type
          })
        });
      }
      if (message.type === "numUsers") {
        this.setState({
          numUsers: message.usercount
        });
      }
    };
  }

  //Receive mssages from ChatBar and send them to the server
  postMessage(object){
    if (object.type === "newMessage") {
      this.socket.send(
        JSON.stringify({username: object.username, content: object.content, type: object.type})
      );
    }
    if (object.type === "newName") {
      this.socket.send(
        JSON.stringify({newname: object.newname, oldname: object.oldname, content: object.content, type: object.type})
      );
    }
  }

  //Change user name
  createUser(newName){
    this.setState({
      currentUser: {name: newName}
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="user-count">{this.state.numUsers} users online</span>
        </nav>
        <main className="messages">
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser} postMessage={this.postMessage} createUser={this.createUser} />
        </main>
      </div>
    );
  }

}


export default App;