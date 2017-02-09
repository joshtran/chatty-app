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

  keyHandler(event){
    if (event.key === "Enter") {
      this.props.postMessage([this.props.currentUser.name, event.target.value]);
      event.target.value = "";
    }
  }

  newUser(event){
    if (event.key === "Enter") {
      console.log("name change enter");
      this.props.createUser(event.target.value);
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