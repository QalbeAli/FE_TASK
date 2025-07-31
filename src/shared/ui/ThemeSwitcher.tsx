import React from "react";
import { Button, Dropdown, Space } from "antd";
import { SunOutlined, MoonOutlined, BulbOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useThemeStore } from "@/shared/config";
import type { ThemeMode } from "@/shared/config";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  const themeItems: MenuProps["items"] = [
    {
      key: "light",
      icon: <SunOutlined />,
      label: "Light Theme",
      onClick: () => setTheme("light"),
    },
    {
      key: "dark",
      icon: <MoonOutlined />,
      label: "Dark Theme",
      onClick: () => setTheme("dark"),
    },
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <SunOutlined />;
      case "dark":
        return <MoonOutlined />;
      default:
        return <BulbOutlined />;
    }
  };

  return (
    <Space>
      <Button
        icon={getThemeIcon()}
        onClick={toggleTheme}
        type="text"
        size="small"
        title={`Current theme: ${theme}. Click to toggle.`}
      />
      <Dropdown
        menu={{ items: themeItems }}
        placement="bottomRight"
        trigger={["click"]}
      >
        <Button
          type="text"
          size="small"
          title="Select theme"
        >
          Theme
        </Button>
      </Dropdown>
    </Space>
  );
}; 