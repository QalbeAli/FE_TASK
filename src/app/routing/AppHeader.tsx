import React from "react";
import { Layout, Typography, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ThemeSwitcher } from "@/shared/ui";

const { Header } = Layout;
const { Title } = Typography;

export const AppHeader: React.FC = () => {
    return (
        <Header
            style={{
                padding: "0 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                borderBottom: "1px solid var(--ant-color-border)",
            }}
        >
            <Space>
                <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
                <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
                    User Management Panel
                </Title>
            </Space>
            <ThemeSwitcher />
        </Header>
    );
}; 