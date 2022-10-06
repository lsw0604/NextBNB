import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import SearchRoomBarLocation from "./SearchRoomBarLocation";
import SearchRoomBarCheckInDate from "./SearchRoomCheckInDate";
import SearchRoomBarCheckOutDate from "./SearchRoomCheckOutDate";
import SearchRoomGuest from "./SearchRoomGuest";

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  .search-room-bar-inputs {
    display: flex;
    align-items: center;
    width: 100%;
    .search-room-bar-divider {
      width: 1px;
      height: 44px;
      background-color: ${palette.gray_dd};
    }
  }
`;

const SearchRoomBar: React.FC = () => {
  return (
    <Container>
      <div className="search-room-bar-inputs">
        <SearchRoomBarLocation />
        <div className="search-room-bar-divider" />
        <SearchRoomBarCheckInDate />
        <div className="search-room-bar-divider" />
        <SearchRoomBarCheckOutDate />
        <div className="search-room-bar-divider" />
        <SearchRoomGuest />
      </div>
    </Container>
  );
};

export default SearchRoomBar;