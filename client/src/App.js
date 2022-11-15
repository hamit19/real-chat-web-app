import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import "./App.css";
import "stream-chat-react/dist/css/index.css";

import {
  ChannelContainer,
  ChannelListContainer,
  Auth,
} from "./components/index";
import axios from "axios";
import MessageBox from "./components/MessageBox";

const cookies = new Cookies();

const apiKey = "74wzc7bkeqzq";

const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [usersLocation, setUsersLocation] = useState("");

  const getUsersLocation = async () => {
    const {
      data: { country },
    } = await axios.get(
      "https://api.geoapify.com/v1/ipinfo?apiKey=a09aa088cf0f4cfb9a975d0eaa16394c"
    );
    setUsersLocation(country.name);
  };

  useEffect(() => {
    getUsersLocation();
  }, []);

  if (usersLocation === "Iran") return <MessageBox />;

  if (!authToken) return <Auth client={client} />;

  return (
    <div className="app__wrapper">
      <Chat client={client}>
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
          setCreateType={setCreateType}
        />

        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
          setCreateType={setCreateType}
        />
      </Chat>
    </div>
  );
};

export default App;
