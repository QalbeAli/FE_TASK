import React, { useEffect } from "react";
import { useThemeStore } from "@/shared/config";

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const { theme } = useThemeStore();

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute("data-theme", theme);
        document.body.setAttribute("data-theme", theme);

        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute(
                "content",
                theme === "dark" ? "#141414" : "#ffffff"
            );
        }
    }, [theme]);

    return <>{children}</>;
}; 