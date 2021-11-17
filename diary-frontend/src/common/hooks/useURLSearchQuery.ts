import { useLocation } from "react-router-dom";
import { useQuery } from "./useQuery";

export const useURLSearchQuery = (pathname: string) => {
  const query = useQuery();
  const location = useLocation();

  return location.pathname === pathname ? query.get("q") : null;
};
