import { BedType } from "../types/room";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number; }[];
};

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
  maximumGuestCount: 1,
  bedroomCount: 0,
  bedCount: 1,
  bedList: [],
  publicBedList: [],
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    setRoomType(state, action: PayloadAction<"entire" | "private" | "public">) {
      state.roomType = action.payload;
      return state;
    },
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
    setBedCount(state, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },
    setBedroomCount(state, action: PayloadAction<number>) {
      const bedroomCount = action.payload;
      let { bedList } = state;

      state.bedroomCount = bedroomCount;

      if (bedroomCount < bedList.length) {
        // 기존 침대 개수가 더 많으면 초과 부분 잘라내기
        bedList = state.bedList.slice(0, bedroomCount);
      } else {
        // 변경할 침대 개수가 더 많으면 나머지 침실 채우기
        for (let i = bedList.length + 1; i < bedroomCount + 1; i += 1) {
          bedList.push({ id: i, beds: []});
        }
      }
      state.bedList = bedList;
      return state;
    },
    setBedTypeCount(
      state, 
      action: PayloadAction<{ bedroomId: number; type: BedType; count: number; }>
    ) {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex((bed) => bed.type === type);

      if (index === -1) {
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }

      if (count === 0) {
        state.bedList[bedroomId - 1].beds.splice(index, 1);
      } else {
        state.bedList[bedroomId - 1].beds[index].count = count;
      }
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;