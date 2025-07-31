import React from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTES } from "./routes";

export const Breadcrumb: React.FC = () => {
    const location = useLocation();

    const getBreadcrumbItems = () => {
        const items = [
            {
                title: (
                    <Link to={ROUTES.HOME}>
                        <HomeOutlined />
                        <span style={{ marginLeft: 8 }}>Home</span>
                    </Link>
                ),
            },
        ];

        if (location.pathname.startsWith("/users")) {
            items.push({
                title: (
                    <span>
                        <UserOutlined />
                        <span style={{ marginLeft: 8 }}>Users</span>
                    </span>
                ),
            });
        }

        return items;
    };

    return (
        <AntBreadcrumb
            style={{ margin: "16px 0" }}
            items={getBreadcrumbItems()}
        />
    );
}; 