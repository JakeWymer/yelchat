import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

class Chat extends Component {
  constructor() {
    super();
    
    this.state = {
      messages: [],
      userInput: ''
    };

    this.armChat = this.armChat.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.socket = io('http://localhost:5001');
  }

  async componentDidMount() {
    const res = await axios.get(`/api/messages/${this.props.businessId}`);
    this.setState({messages: res.data});
    this.armChat();

    this.socket.on('message', (data) => {
      console.log('MESSAGE: ' + data);
      let chatList = this.state.messages;
      chatList.push(data);
      this.setState({messages: chatList });
    });
  }

  async componentDidUpdate(prevProps) {
    if(this.props.businessId !== prevProps.businessId) {
      const res = await axios.get(`/api/messages/${this.props.businessId}`);
      this.setState({messages: res.data});
      this.armChat();
    }
  }

  armChat() {
    this.socket.emit('join', this.props.businessId);
  }

  handleChange(e) {
    this.setState({userInput: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.socket.emit("postMessage", {message: this.state.userInput, room: this.props.businessId});
    let newList = [...this.state.messages, this.state.userInput];

    this.setState({userInput: '', messages: newList});
  }

  render() {
    let list = this.state.messages.map((message, i) => {
      if(typeof message !== 'string'){
        return <p key={i}className="message">{message.message}</p>
      }
      return <p key={i} className="message mine">{message}</p>
    });

    return(
      <div className="chat-wrap">
        <div className="messages">
          {list}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.userInput}
            placeholder="Your message here..."/>
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Chat;