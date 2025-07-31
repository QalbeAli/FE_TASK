import React from "react";
import { Modal, Typography, Button, Space, Alert } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import type { User } from "@/entities/user";

const { Text, Paragraph } = Typography;

interface DeleteUserModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    user?: User;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
    visible,
    onCancel,
    onConfirm,
    user,
}) => {
    if (!user) return null;

    return (
        <Modal
            title={
                <Space>
                    <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
                    <span>Delete User</span>
                </Space>
            }
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={400}
            destroyOnClose
        >
            <div style={{ marginBottom: 24 }}>
                <Alert
                    message="Warning"
                    description="This action cannot be undone. The user will be permanently deleted from the system."
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                />

                <Paragraph>
                    Are you sure you want to delete the user{" "}
                    <Text strong>{user.name}</Text> ({user.email})?
                </Paragraph>

                <Paragraph type="secondary" style={{ fontSize: "12px" }}>
                    User ID: {user.id}
                </Paragraph>
            </div>

            <div style={{ textAlign: "right" }}>
                <Space>
                    <Button onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={onConfirm}
                    >
                        Delete User
                    </Button>
                </Space>
            </div>
        </Modal>
    );
}; 