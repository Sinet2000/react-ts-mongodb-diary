import instance from "./requestManager";
import { SignInput } from "./schemas/loginSchema";
import { SignUpInput } from "./schemas/signUpSchema";
import { IUser, ISession, IUserLocalData } from "../common/types";

export const authAPI = {
  signIn: async(values: SignInput) => {
    const response = await instance.post('/signin', values, {withCredentials: true});

    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response;
  },

  signUp: async (values: SignUpInput) => await instance.post('/signup', values),
  logOut: async () => {
    await instance.delete('/logout');
    localStorage.removeItem("user")
  },
  getCurrentUser: (): IUserLocalData | null => {
    var userData = JSON.parse(localStorage.getItem("user") || '{}');

    return Object.keys(userData).length === 0 ? null : userData;
  },
  getUserToken: (): string | null => {
    const user = authAPI.getCurrentUser();

    if (user && user.accessToken) {
      return user.accessToken;
    } else {
      return null;
    }
  },
};