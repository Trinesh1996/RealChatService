import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

function showDialog() {
  this.isDialogOpen = !this.isDialogOpen;
}

function sendMessage() {
  const { newMessage, currentUser, currentRoom } = this;

  if (newMessage.trim() === '') return;

  currentUser.sendMessage({
    text: newMessage,
    roomId: `${currentRoom.id}`,
  });

  this.newMessage = '';

  console.log(currentUser)
}

function connectToRoom(id, messageLimit = 100) {
  this.messages = [];
  const { currentUser } = this;

  return currentUser
    .subscribeToRoom({
      roomId: `${id}`,
      messageLimit,
      hooks: {
        onMessage: message => {
          this.messages = [...this.messages, message];
        },
      },
    })
    .then(currentRoom => {
      this.currentRoom = currentRoom;
    });
}

function addSupportStaffToRoom() {
  const { currentRoom, currentUser } = this;

  return currentUser.addUserToRoom({
    userId: 'support',
    roomId: currentRoom.id,
  });
}

function createRoom() {
  const { currentUser } = this;

  return currentUser
    .createRoom({
      name: currentUser.name,
      private: true,
    })
    .then(room => this.connectToRoom(room.id, 0))
    .then(() => this.addSupportStaffToRoom());
}

function launchChat() {
  this.isDialogOpen = false;
  this.isLoading = true;

  const { userId } = this;

  if (userId === null || userId.trim() === '') {
    alert('Invalid userId');
  } else {
    axios
      .post('http://localhost:3015/users', { userId })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'http://localhost:3015/authenticate',
        });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:fb6325d9-624d-467f-8992-3274ce6d7ec2',
          userId,
          tokenProvider,
        });

        return chatManager.connect().then(currentUser => {
          this.currentUser = currentUser;
          this.isLoading = false;
          return this.createRoom();
        });
      })
      .catch(console.error);
  }
}

function handleInput(name, value) {
  console.log(name, value);
  this[name] = value;
}

export {
  sendMessage,
  connectToRoom,
  addSupportStaffToRoom,
  createRoom,
  handleInput,
  showDialog,
  launchChat,
};