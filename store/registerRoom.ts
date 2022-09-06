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
  bathroomCount: number;
  bathroomType: "private" | "public" | null;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  conveniences: string[];
  photos: string[];
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
  bathroomCount: 1,
  bathroomType: null,
  country: "",
  city: "",
  district: "",
  streetAddress: "",
  detailAddress: "",
  postcode: "",
  latitude: 0,
  longitude: 0,
  amenities: [],
  conveniences: [],
  photos: [],
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    setMaximumGuestCount(state: any, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },
    setLargeBuildingType(state: any, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    setBuildingType(state: any, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    setRoomType(state: any, action: PayloadAction<"entire" | "private" | "public">) {
      state.roomType = action.payload;
      return state;
    },
    setIsSetUpForGuest(state: any, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
    setBedCount(state: any, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },
    setBedroomCount(state: any, action: PayloadAction<number>) {
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
      state: any, 
      action: PayloadAction<{ bedroomId: number; type: BedType; count: number; }>
    ) {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex((bed: any) => bed.type === type);

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
    setPublicBedTypeCount(
      state: any,
      action: PayloadAction<{ type: BedType; count: number; }>
    ) {
      const { type, count } = action.payload;

      const index = state.publicBedList.findIndex((bed: any) => bed.type === type);

      if (index === -1) {
        state.publicBedList = [...state.publicBedList, { type, count}];
        return state;
      }

      if (count === 0) {
        state.publicBedList.splice(index, 1);
      } else {
        state.publicBedList[index].count = count;
      }
      return state;
    },
    setBathroomCount(state: any, action: PayloadAction<number>) {
      state.bathroomCount = action.payload;
    },
    setBathroomType(state: any, action: PayloadAction<"private" | "public">) {
      state.bathroomType = action.payload;
    },
    setCountry(state: any, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    setCity(state: any, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setDistrict(state: any, action: PayloadAction<string>) {
      state.district = action.payload;
    },
    setStreetAddress(state: any, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
    },
    setDetailAddress(state: any, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
    },
    setPostcode(state: any, action: PayloadAction<string>) {
      state.postcode = action.payload;
    },
    setLatitude(state: any, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    setLongitude(state: any, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
    setAmenities(state: any, action: PayloadAction<string[]>) {
      state.amenities = action.payload;
    },
    setConveniences(state: any, action: PayloadAction<string[]>) {
      state.conveniences = action.payload;
    },
    setPhotos(state: any, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    }
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;