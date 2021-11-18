import deserializeUser from "./deserializeUser";
import requireUser from "./requireUser";
import validate from "./validateResource";

export const MiddleWareManager = {
  deserializeUser,
  requireUser,
  validate
}