import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.createUser = this.createUser.bind(this)
    this.postMessage = this.postMessage.bind(this)
    this.socket = new WebSocket('ws://localhost:4000')
  }



  componentDidMount() {
    this.socket.onopen = (event) => {
    console.log("Connected to the websocket server");
    }

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data)

      this.setState({
        messages:this.state.messages.concat({
          username: message.username,
          content: message.content,
          id: message.id
        })
      })
    }
  }


  postMessage(array){
    this.socket.send(
      JSON.stringify({username: array[0], content: array[1]})
    );
  }

  createUser(newName){
    "app receive name change enter"
    this.setState({
      currentUser: {name: newName}
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
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