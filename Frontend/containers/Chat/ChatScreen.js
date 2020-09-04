import React from "react";
import { Text, View, TextInput, ScrollView, Button, Image } from "react-native";
import io from "socket.io-client";
import { createMesssageThunk } from "../../store/message";
import { connect } from "react-redux";
import { fetchSingleEvent } from "../../store/singleEvent";
import { getUserInfo } from "../../store/user";
import { getMesssagesThunk } from "../../store/messages";
import Style from "./ChatScreenStyle";
import { serverLink } from "../../store/serverLink";
const socket = io(serverLink, {
  transports: ["websocket"],
});

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: {},
      chatMessages: [],
    };
    socket.on("connect", function () {
      console.log("a Socket connection has been made");
    });
  }
  async componentDidMount() {
    await this.props.getUser(this.props.user.id);
    await this.props.fetchSingleEvent(this.props.event.id);
    await this.props.getMessages(this.props.event.id);
    this.setState({ chatMessages: this.props.messages });

    // 1. join room
    socket.emit("join-room", {
      message: `${this.props.user.firstName} has joined ${this.props.event.name}`,
      eventId: this.props.event.id,
      sender: {
        id: this.props.user.id,
        firstName: this.props.user.firstName,
        imgUrl: this.props.user.imgUrl,
      },
    });

    // 4. listens for new joiner
    socket.on("room-joined", (messageObj) => {
      this.setState({
        chatMessages: [...this.state.chatMessages, messageObj],
      });
    });

    // 8. show other messages
    socket.on("send-message", (messageObj) => {
      this.setState({ chatMessages: [...this.state.chatMessages, messageObj] });
    });
  }

  submitChatMessage = () => {
    // 5. send message
    socket.emit(
      "chat-message",
      {
        message: this.state.chatMessage.message,
        eventId: this.props.event.id,
        sender: {
          id: this.props.user.id,
          firstName: this.props.user.firstName,
          imgUrl: this.props.user.imgUrl,
        },
      },
      this.props.event.id
    );
    this.props.createMessage({
      message: this.state.chatMessage.message,
      eventId: this.props.event.id,
      senderId: this.props.user.id,
    });
    this.setState({ chatMessage: {} });
  };

  render() {
    console.log("STATE", this.state);
    const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
      <View key={index}>
        <Text style={Style.chatMessage}>{chatMessage.message}</Text>
        <Text>{chatMessage.sender.firstName}</Text>
        <Image
          source={{
            uri: chatMessage.sender.imgUrl,
          }}
          style={Style.userImage}
        />
      </View>
    ));

    return (
      <ScrollView>
        <View>
          <Text style={Style.welcomeChat}>
            Welcome to the Groupchat for {this.props.event.name}!
          </Text>
        </View>
        {chatMessages}
        <TextInput
          style={Style.textInput}
          autoCorrect={false}
          value={this.state.chatMessage.message}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={(chatMessage) => {
            this.setState({ chatMessage: { message: chatMessage } });
          }}
        />
        <View style={Style.sendMessageButton}>
          <Button title="SEND" onPress={this.submitChatMessage}></Button>
        </View>
      </ScrollView>
    );
  }
}

const mapToState = (state) => ({
  message: state.message,
  user: state.user,
  event: state.singleEvent,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  createMessage: (message) => dispatch(createMesssageThunk(message)),
  fetchSingleEvent: (id) => dispatch(fetchSingleEvent(id)),
  getUser: (id) => {
    return dispatch(getUserInfo(id));
  },
  getMessages: (eventId) => dispatch(getMesssagesThunk(eventId)),
});

export default connect(mapToState, mapDispatchToProps)(ChatScreen);
