import axios from ".";

type getLocationInfoAPIResponse = {
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
}

export const getLocationInfoAPI = async ({ latitude, longitude }: {
  latitude: number;
  longitude: number;
}) => 
  axios.get<getLocationInfoAPIResponse> (
    `/api/maps/location?latitude=${latitude}&longitude=${longitude}`
  );

export const searchPlacesAPI = (keyword: string) =>
  axios.get<{ description: string; placeId: string }[]>(
    `/api/maps/places?keyword=${keyword}`
  );

export const  getPlaceAPI = (placeId: string) =>
  axios.get<{ location: string; latitude: number; longitude: number; }>(
    `/api/maps/places/${placeId}`
  );