import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchRoomState } from "../types/reduxState";

const initialState: SearchRoomState = {
  location: "",
  latitude: 0,
  longitude: 0,
  checkInDate: null,
  checkOutDate: null,
  adultCount: 1,
  childrenCount: 0,
  infantsCount: 0,
};

const searchRoom = createSlice({
  name: "searchRoom",
  initialState,
  reducers: {
    setLocation(state: any, action: PayloadAction<string>) {
      state.location = action.payload;
      return state;
    },
    setStartDate(state: any, action: PayloadAction<string | null>) {
      state.checkInDate = action.payload;
      return state;
    },
    setEndDate(state: any, action: PayloadAction<string | null>) {
      state.checkOutDate = action.payload;
      return state;
    },
    setAdultCount(state: any, action: PayloadAction<number>) {
      state.adultCount = action.payload;
      return state;
    },
    setChildrenCount(state: any, action: PayloadAction<number>) {
      state.childrenCount = action.payload;
      return state;
    },
    setInfantsCount (state: any, action: PayloadAction<number>) {
      state.infantsCount = action.payload;
      return state;
    },
    setLatitude (state: any, action: PayloadAction<number>) {
      state.latitude = action.payload;
      return state;
    },
    setLongitude (state: any, action: PayloadAction<number>) {
      state.longitude = action.payload;
      return state;
    },
  },
});

export const searchRoomActions = { ...searchRoom.actions };

export default searchRoom;