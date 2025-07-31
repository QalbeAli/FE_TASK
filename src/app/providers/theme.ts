import { useThemeStore } from "@/shared/config";
import { lightTheme, darkTheme } from "@/shared/config";

export const useTheme = () => {
  const { theme } = useThemeStore();
  return theme === "light" ? lightTheme : darkTheme;
}; 