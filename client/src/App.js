import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer } from "./components/index";

const apiKey = "qnb5fscb2dnp";
const client = StreamChat.getInstance(apiKey);

const App = () => {
  return (
    <div className="app-wrapper">
      <Chat client={client}>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
