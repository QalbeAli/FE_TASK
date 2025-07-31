import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToUsers = () => navigate(ROUTES.USERS);
  const goToUserDetails = (id: string) =>
    navigate(ROUTES.USER_DETAILS.replace(":id", id));
  const goToHome = () => navigate(ROUTES.HOME);

  return {
    navigate,
    location,
    goToUsers,
    goToUserDetails,
    goToHome,
  };
};
