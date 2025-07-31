import type { ThemeConfig } from "antd";

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1890ff",
    borderRadius: 6,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    // Light theme specific colors
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBgLayout: "#f5f5f5",
    colorBgSpotlight: "#ffffff",
    colorBorder: "#d9d9d9",
    colorBorderSecondary: "#f0f0f0",
    colorText: "#262626",
    colorTextSecondary: "#8c8c8c",
    colorTextTertiary: "#bfbfbf",
    colorTextQuaternary: "#d9d9d9",
  },
  components: {
    Button: {
      borderRadius: 6,
    },
    Modal: {
      borderRadius: 8,
    },
    Table: {
      borderRadius: 6,
    },
    Card: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 6,
    },
    Select: {
      borderRadius: 6,
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1890ff",
    borderRadius: 6,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    // Dark theme specific colors
    colorBgContainer: "#1f1f1f",
    colorBgElevated: "#262626",
    colorBgLayout: "#141414",
    colorBgSpotlight: "#262626",
    colorBorder: "#434343",
    colorBorderSecondary: "#303030",
    colorText: "#ffffff",
    colorTextSecondary: "#a6a6a6",
    colorTextTertiary: "#737373",
    colorTextQuaternary: "#595959",
  },
  components: {
    Button: {
      borderRadius: 6,
    },
    Modal: {
      borderRadius: 8,
    },
    Table: {
      borderRadius: 6,
    },
    Card: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 6,
    },
    Select: {
      borderRadius: 6,
    },
  },
};
