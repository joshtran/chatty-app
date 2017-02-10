import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.keyHandler = this.keyHandler.bind(this)
    this.newUser = this.newUser.bind(this)
  }

  incrementCounter(){
    this.state.messageCounter += 1
  }

  //Post new message from user
  keyHandler(event){
    if (event.key === "Enter") {
      this.props.postMessage({
        username: this.props.currentUser.name,
        content: event.target.value,
        type: "newMessage"
      });
      event.target.value = "";
    }
  }

  //Change user name and post notification
  newUser(event){
    if (event.key === "Enter") {
      this.props.createUser(event.target.value);
      this.props.postMessage({
        oldname: this.props.currentUser.name,
        newname: event.target.value,
        content: this.props.currentUser.name+" changed their name to "+event.target.value,
        type: "newName"
      });

    }
  }

  render() {
    return (
      <div>
        <footer className="chatbar">

          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onKeyUp={this.newUser} />

          <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.keyHandler}
          />

        </footer>
      </div>
    );
  }
}



export default ChatBar;