import React from "react";
import { ChannelList } from "stream-chat-react";
import Cookies from "universal-cookie";

import {
  ChannelSearch,
  TeamChannelList,
  TeamChannelPreview,
} from "../components/index";

import hospitalIcon from "../assets/hospital.png";
import logoutIcon from "../assets/logout.png";

const cookies = new Cookies();

const SideBar = () => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={hospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2" onClick={handelOnClick}>
      <div className="icon1__inner">
        <img src={logoutIcon} alt="Logout" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text"> Hamid Hassani </p>
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

const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          channelRenderFilterFn={() => {}}
          filters={{}}
          List={(listProps) => <TeamChannelList {...listProps} type="team" />}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="team" />
          )}
        />
        <ChannelList
          channelRenderFilterFn={() => {}}
          filters={{}}
          List={(listProps) => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
