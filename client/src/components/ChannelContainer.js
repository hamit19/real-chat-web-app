import React from "react";
import { Channel, useChatContext, MessageList } from "stream-chat-react";

import { InnerChannel, CreateChannel, EditChannel } from "../components/index";

const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
  setCreateType,
}) => {
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel setIsCreating={setIsCreating} createType={createType} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>
    );
  }

  const emptyState = () => {
    return (
      <div className="channel-empty__container">
        <p className="channel-empty__first">
          {" "}
          This is the beginning of your chat history.{" "}
        </p>
        <p className="channel-empty__second">
          {" "}
          Send messages, attachments, links, emojis, and more
        </p>
      </div>
    );
  };

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={emptyState}
        messages={(messagesProps, i) => (
          <MessageList key={i} {...messagesProps} />
        )}
      >
        <InnerChannel setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
