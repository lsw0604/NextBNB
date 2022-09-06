import axios from ".";

export const uploadFileAPI = (file: FormData) =>
  axios.post("/api/files/upload", file);