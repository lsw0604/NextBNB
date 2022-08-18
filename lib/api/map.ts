import axios from ".";

export const getLocationInfoAPI = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => 
  axios.get(`/api/maps/location?latitude=${latitude}&longitude=${longitude}`);