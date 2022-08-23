import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";

import { SearchIcon } from "../assets/SearchIcon";

const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getChannels = (text) => {
    try {
      // TODO: fetch all channels
    } catch (error) {
      setQuery("");
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    setLoading(true);
    getChannels(e.target.value);
  };

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
    </div>
  );
};

export default ChannelSearch;
