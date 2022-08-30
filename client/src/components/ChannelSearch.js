import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";

import { SearchIcon } from "../assets/SearchIcon";
import { ResultsDropdown } from "./index";

const ChannelSearch = ({ setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  const getChannels = async (text) => {
    try {
      let checkAtLeastOneLetter = /[a-zA-Z]/.test(text);

      if (checkAtLeastOneLetter) {
        const channelsResponse = await client.queryChannels({
          type: "team",
          name: { $autocomplete: text },
          members: { $in: [client.userID] },
        });

        const usersResponse = await client.queryUsers({
          id: { $ne: client.userID },
          name: { $autocomplete: text },
        });

        const [channels, { users }] = await Promise.all([
          channelsResponse,
          usersResponse,
        ]);

        if (channels.length) setTeamChannels(channels);
        if (users.length) setDirectChannels(users);
      }
    } catch (error) {
      console.log(error);
      setQuery("");
      setLoading(false);
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    setLoading(true);
    getChannels(e.target.value);
  };

  const setChannel = (channel) => {
    setQuery("");
    setActiveChannel(channel);
  };

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="channel-search__container">
      <form className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="channel-search__input__text"
          value={query}
          onChange={onSearch}
        />
      </form>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
