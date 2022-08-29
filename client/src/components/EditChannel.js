import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { CloseCreateChannel } from "../assets/CloseCreateChannel";
import UserList from "./UserList";

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

const EditChannel = ({ isEditing, setIsEditing }) => {
  const { channel } = useChatContext();

  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (e) => {
    e.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if (nameChanged) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName("");
    setIsEditing(false);
    setSelectedUsers([]);
  };

  return (
    <div className="create-channel__container_wrapper">
      <div className="edit-channel__container">
        <div className="edit-channel__header">
          <p>Edit Channel</p>
          <CloseCreateChannel setIsEditing={setIsEditing} />
        </div>
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
        <UserList setSelectedUsers={setSelectedUsers} />
        <div className="create-channel__button-wrapper" onClick={updateChannel}>
          <p>Save Changes</p>
        </div>
      </div>
    </div>
  );
};

export default EditChannel;
