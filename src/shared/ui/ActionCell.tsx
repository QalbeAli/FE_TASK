import React from "react";
import { Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ActionCellProps {
    onEdit: () => void;
    onDelete: () => void;
}

export const ActionCell: React.FC<ActionCellProps> = ({ onEdit, onDelete }) => {
    return (
        <div style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "8px 0",
        }}>
            <Tooltip title="Edit user">
                <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                    size="small"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        padding: 0,
                        borderRadius: "6px",
                        border: "1px solid #d9d9d9",
                        backgroundColor: "#ffffff",
                        color: "#1890ff",
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f0f8ff";
                        e.currentTarget.style.borderColor = "#1890ff";
                        e.currentTarget.style.color = "#1890ff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                        e.currentTarget.style.borderColor = "#d9d9d9";
                        e.currentTarget.style.color = "#1890ff";
                    }}
                />
            </Tooltip>

            <Tooltip title="Delete user">
                <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    size="small"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        padding: 0,
                        borderRadius: "6px",
                        border: "1px solid #d9d9d9",
                        backgroundColor: "#ffffff",
                        color: "#ff4d4f",
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff2f0";
                        e.currentTarget.style.borderColor = "#ff4d4f";
                        e.currentTarget.style.color = "#ff4d4f";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                        e.currentTarget.style.borderColor = "#d9d9d9";
                        e.currentTarget.style.color = "#ff4d4f";
                    }}
                />
            </Tooltip>
        </div>
    );
}; 