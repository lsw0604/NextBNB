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