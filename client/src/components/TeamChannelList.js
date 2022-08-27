import React from "react";

import { AddChannel } from "../assets/AddChannel";

const TeamChannelList = ({
  children,
  loading,
  type,
  error = false,
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
  setCreateType,
}) => {
  if (error) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === "team" ? "Channels" : "Messages"} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === "team" ? "Channels" : " Direct messages"}
        </p>

        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
          setCreateType={setCreateType}
          type={type === "team" ? "team" : "messaging"}
        />
      </div>
    </div>
  );
};

export default TeamChannelList;
