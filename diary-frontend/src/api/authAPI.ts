import { requestManager } from "./requestManager";
import { SignInput } from "./schemas/loginSchema";
import { SignUpInput } from "./schemas/signUpSchema";
import { IUser, ISession, IUserLocalData } from "../common/types";

export const authAPI = {
  signIn: async(values: SignInput) => {
    const response = await requestManager.post('/signin', values, true);

    if(response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  signUp: async (values: SignUpInput) => await requestManager.post('/signup', values),
  logOut: () => localStorage.removeItem("user"),
  getCurrentUser: (): IUserLocalData => JSON.parse(localStorage.getItem("user") || '{}'),
  getUserToken: (): string | null => {
    const user = authAPI.getCurrentUser();

    if (user && user.accessToken) {
      return user.accessToken;
    } else {
      return null;
    }
  },
};