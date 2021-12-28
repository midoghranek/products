import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { LoginFormInputs, User } from "@types";

type LoginServiceResponse = {
  success: boolean;
  message: string;
  user: User;
};

export const loginService = createApi({
  reducerPath: "user/service",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/user" }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginServiceResponse, Partial<LoginFormInputs>>({
      query({ username, password }) {
        return {
          url: "/login",
          method: "POST",
          body: {
            username,
            password,
          },
        };
      },
    }),
  }),
});

// export service hooks
export const { useLoginMutation } = loginService;
