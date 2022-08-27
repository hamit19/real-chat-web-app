import React from "react";
import { ChannelList } from "stream-chat-react";
import Cookies from "universal-cookie";

import {
  ChannelSearch,
  TeamChannelList,
  TeamChannelPreview,
} from "../components/index";

import { FiLogOut } from "react-icons/fi";
import { FaReact } from "react-icons/fa";

const cookies = new Cookies();

const SideBar = () => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <FaReact size={"30px"} />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2" onClick={handelOnClick}>
      <div className="icon1__inner">
        <FiLogOut />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text"> React Developers </p>
  </div>
);

const handelOnClick = () => {
  cookies.remove("token");
  cookies.remove("userId");
  cookies.remove("username");
  cookies.remove("fullName");
  cookies.remove("avatarURL");
  cookies.remove("hashedPassword");
  cookies.remove("phoneNumber");
  window.location.reload();
};

const ChannelListContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
  setCreateType,
}) => {
  return (
    <div className="channel-list__main-wrapper">
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />

        <ChannelList
          channelRenderFilterFn={() => {}}
          filters={{}}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              createType={createType}
              setCreateType={setCreateType}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="team" />
          )}
        />
        <ChannelList
          channelRenderFilterFn={() => {}}
          filters={{}}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              createType={createType}
              setCreateType={setCreateType}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </div>
  );
};

export default ChannelListContainer;
