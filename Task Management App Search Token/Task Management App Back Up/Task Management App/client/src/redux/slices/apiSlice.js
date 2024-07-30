import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { logout } from "../slices/authSlice";

//const API_URI = "http://localhost:8080/api";
const API_URI = import.meta.env.VITE_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: API_URI + "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
  
  const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (result?.error?.status === 401) {
      if (result.error.data.message === "Token expired. Please log in again.") {
        api.dispatch(logout());
        window.location.href = "/login";
      }
    }
  
    return result;
  };
  
  export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Tasks"],
    endpoints: (builder) => ({}),
  });