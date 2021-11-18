import { requestManager } from "./client";
import { SignInput } from "./schemas/loginSchema";
import { SignUpInput } from "./schemas/signUpSchema";
import { ISession } from "../models/ISession";
import IUser from "../models/User";

export const authAPI = {
  signIn: async(values: SignInput) => {
    const response = await requestManager.post('/signin', values, true);

    if(response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  signUp: async(values: SignUpInput) => await requestManager.post('/signup', values),
  logOut: () => localStorage.removeItem("user"),
  getCurrentUser: (): IUser => JSON.parse(localStorage.getItem("user") || '{}'),

  getUserToken: () => {
    const userData: IUser = authAPI.getCurrentUser();

    return (userData && userData.accessToken) ? userData.accessToken : null;
  }
};