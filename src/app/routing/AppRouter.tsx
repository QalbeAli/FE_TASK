import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import { AppHeader } from "./AppHeader";
import { Breadcrumb } from "./Breadcrumb";
import { UsersPage } from "@/pages/users";
import { ROUTES } from "./routes";

const { Content } = Layout;

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Layout style={{ minHeight: "100vh" }}>
                <AppHeader />
                <Content style={{ padding: "0 24px" }}>
                    <Breadcrumb />
                    <Routes>
                        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.USERS} replace />} />
                        <Route path={ROUTES.USERS} element={<UsersPage />} />
                        <Route path={ROUTES.USER_DETAILS} element={<UsersPage />} />
                        <Route path="*" element={<Navigate to={ROUTES.USERS} replace />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
}; 