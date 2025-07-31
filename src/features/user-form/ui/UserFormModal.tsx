import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, Space } from "antd";
import type { User, UserRole, UserStatus } from "@/entities/user";
import { USER_ROLES, USER_STATUSES, USER_ROLE_LABELS, USER_STATUS_LABELS } from "@/shared/config";

interface UserFormModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    user?: User;
    title: string;
}

interface FormValues {
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
    visible,
    onCancel,
    onSubmit,
    user,
    title,
}) => {
    const [form] = Form.useForm();

    // Reset form when modal opens/closes or user changes
    useEffect(() => {
        if (visible) {
            if (user) {
                form.setFieldsValue({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, user, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
            form.resetFields();
        } catch (error) {
            console.error("Form validation failed:", error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={title}
            open={visible}
            onCancel={handleCancel}
            footer={null}
            width={500}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    role: "user",
                    status: "active",
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        { required: true, message: "Please enter the user's name" },
                        { min: 2, message: "Name must be at least 2 characters" },
                    ]}
                >
                    <Input placeholder="Enter user name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Please enter the user's email" },
                        { type: "email", message: "Please enter a valid email address" },
                    ]}
                >
                    <Input placeholder="Enter email address" />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: "Please select a role" }]}
                >
                    <Select placeholder="Select role">
                        {USER_ROLES.map((role) => (
                            <Select.Option key={role} value={role}>
                                {USER_ROLE_LABELS[role]}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: "Please select a status" }]}
                >
                    <Select placeholder="Select status">
                        {USER_STATUSES.map((status) => (
                            <Select.Option key={status} value={status}>
                                {USER_STATUS_LABELS[status]}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                    <Space>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {user ? "Update" : "Create"}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
}; 