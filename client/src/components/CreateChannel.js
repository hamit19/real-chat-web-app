import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "../components/index";
import { CloseCreateChannel } from "../assets/CloseCreateChannel";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handelChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name:</p>
      <input
        type="text"
        value={channelName}
        placeholder="channel-name (on spaces!)"
        onChange={handelChange}
      />

      <p>Add Members</p>
    </div>
  );
};
const CreateChannel = ({ setIsCreating, createType }) => {
  const { client, setActiveChannel } = useChatContext();

  const [channelName, setChannelName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-channel__container_wrapper">
      <div className="create-channel__container">
        <div className="create-channel__header">
          <p>
            {createType === "team"
              ? "Create a New Channel"
              : "Send a Direct Message"}
          </p>
          <CloseCreateChannel setIsCreating={setIsCreating} />
        </div>
        {createType === "team" && (
          <ChannelNameInput
            channelName={channelName}
            setChannelName={setChannelName}
          />
        )}
        <UserList setSelectedUsers={setSelectedUsers} />
        <div className="create-channel__button-wrapper" onClick={createChannel}>
          <p>
            {createType === "team"
              ? "Create Channel"
              : "Create Messaging Group"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
