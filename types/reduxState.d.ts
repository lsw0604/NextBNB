import { UserType } from "./user";

export type UserState = UserType & {
  isLogged: boolean;
};

export type CommonState = {
  validateMode: boolean;
};

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
  description: string;
  title: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
};

export type SearchRoomState = {
  location: string;
  latitude: number;
  longitude: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
};