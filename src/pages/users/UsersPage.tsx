import React, { useEffect, useState } from "react";
import { Typography, Card, Button, Space, Row, Col, Input, Select, Spin, Alert } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useUserStore } from "@/entities/user";
import { UserFormModal } from "@/features/user-form";
import { DeleteUserModal } from "@/features/user-delete";
import { ActionCell } from "@/shared/ui";
import { formatDate } from "@/shared/lib";
import { USER_ROLES, USER_STATUSES, USER_ROLE_LABELS, USER_STATUS_LABELS, USER_STATUS_COLORS } from "@/shared/config";
import { mockUsers } from "@/entities/user/services/mock-data";
import type { User } from "@/entities/user";

const { Title } = Typography;
const { Search } = Input;

export const UsersPage: React.FC = () => {
  const {
    users,
    loading,
    error,
    filters,
    pagination,
    setUsers,
    setFilters,
    clearFilters,
    setPagination,
    setSelectedUser,
  } = useUserStore();

  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [gridApi, setGridApi] = useState<any>(null);

  // Load mock data on component mount
  useEffect(() => {
    if (users.length === 0) {
      setUsers(mockUsers);
    }
  }, [users.length, setUsers]);

  const handleGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsFormModalVisible(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setSelectedUser(user);
    setIsFormModalVisible(true);
  };

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  const handleFormSubmit = (values: any) => {
    if (editingUser) {
      // Update existing user
      const updatedUser = { ...editingUser, ...values };
      setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user));
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUsers([newUser, ...users]);
    }
    setIsFormModalVisible(false);
    setEditingUser(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingUser) {
      setUsers(users.filter(user => user.id !== deletingUser.id));
      setIsDeleteModalVisible(false);
      setDeletingUser(null);
    }
  };

  const handleEmailFilter = (value: string) => {
    setFilters({ email: value });
  };

  const handleRoleFilter = (value: string) => {
    setFilters({ role: value });
  };

  const handleStatusFilter = (value: string) => {
    setFilters({ status: value });
  };

  const handleRefresh = () => {
    setUsers(mockUsers);
    clearFilters();
  };

  // Custom cell renderers
  const StatusCellRenderer = (params: ICellRendererParams) => {
    const status = params.value;
    const color = USER_STATUS_COLORS[status as keyof typeof USER_STATUS_COLORS];
    return (
      <span
        style={{
          padding: "4px 8px",
          borderRadius: "4px",
          backgroundColor: color === "green" ? "#f6ffed" : color === "red" ? "#fff2f0" : "#fff7e6",
          color: color === "green" ? "#52c41a" : color === "red" ? "#ff4d4f" : "#fa8c16",
          border: `1px solid ${color === "green" ? "#b7eb8f" : color === "red" ? "#ffccc7" : "#ffd591"}`,
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        {USER_STATUS_LABELS[status as keyof typeof USER_STATUS_LABELS]}
      </span>
    );
  };

  const RoleCellRenderer = (params: ICellRendererParams) => {
    const role = params.value;
    return (
      <span style={{ fontWeight: "500" }}>
        {USER_ROLE_LABELS[role as keyof typeof USER_ROLE_LABELS]}
      </span>
    );
  };

  const DateCellRenderer = (params: ICellRendererParams) => {
    return (
      <span title={params.value}>
        {formatDate(params.value)}
      </span>
    );
  };

  const ActionsCellRenderer = (params: ICellRendererParams) => {
    const user = params.data;
    return (
      <div style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8px",
        width: "100%",
      }}>
        <ActionCell
          onEdit={() => handleEditUser(user)}
          onDelete={() => handleDeleteUser(user)}
        />
      </div>
    );
  };

  // Column definitions
  const columnDefs: ColDef[] = [
    {
      headerName: "ID",
      field: "id",
      width: 80,
      minWidth: 60,
      maxWidth: 100,
      sortable: true,
      filter: true,
      flex: 0.5,
    },
    {
      headerName: "Name",
      field: "name",
      width: 180,
      minWidth: 120,
      maxWidth: 250,
      sortable: true,
      filter: true,
      flex: 1.2,
    },
    {
      headerName: "Email",
      field: "email",
      width: 280,
      minWidth: 200,
      maxWidth: 400,
      sortable: true,
      filter: true,
      flex: 1.8,
    },
    {
      headerName: "Role",
      field: "role",
      width: 140,
      minWidth: 100,
      maxWidth: 180,
      sortable: true,
      filter: true,
      cellRenderer: RoleCellRenderer,
      flex: 0.8,
    },
    {
      headerName: "Status",
      field: "status",
      width: 140,
      minWidth: 100,
      maxWidth: 180,
      sortable: true,
      filter: true,
      cellRenderer: StatusCellRenderer,
      flex: 0.8,
    },
    {
      headerName: "Created",
      field: "createdAt",
      width: 180,
      minWidth: 150,
      maxWidth: 220,
      sortable: true,
      filter: true,
      cellRenderer: DateCellRenderer,
      flex: 1.0,
    },
    {
      headerName: "Actions",
      field: "actions",
      width: 140,
      minWidth: 120,
      maxWidth: 160,
      sortable: false,
      filter: false,
      cellRenderer: ActionsCellRenderer,
      headerClass: "actions-header",
      cellClass: "actions-cell",
      flex: 0.8,
    },
  ];

  // Filter users based on current filters
  const filteredUsers = users.filter(user => {
    const emailMatch = !filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase());
    const roleMatch = !filters.role || user.role === filters.role;
    const statusMatch = !filters.status || user.status === filters.status;
    return emailMatch && roleMatch && statusMatch;
  });

  return (
    <div>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={2} style={{ margin: 0 }}>User Management</Title>
          </Col>
          <Col>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                loading={loading}
              >
                Refresh
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddUser}
              >
                Add User
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Filters */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Search
              placeholder="Filter by email"
              value={filters.email}
              onChange={(e) => handleEmailFilter(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="Filter by role"
              value={filters.role || undefined}
              onChange={handleRoleFilter}
              allowClear
              style={{ width: "100%" }}
            >
              {USER_ROLES.map(role => (
                <Select.Option key={role} value={role}>
                  {USER_ROLE_LABELS[role]}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="Filter by status"
              value={filters.status || undefined}
              onChange={handleStatusFilter}
              allowClear
              style={{ width: "100%" }}
            >
              {USER_STATUSES.map(status => (
                <Select.Option key={status} value={status}>
                  {USER_STATUS_LABELS[status]}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <Button onClick={clearFilters}>
              Clear Filters
            </Button>
          </Col>
        </Row>

        {/* Error Display */}
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {/* AG Grid */}
        <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
          <style>
            {`
              .ag-theme-alpine .ag-header-cell.actions-header {
                text-align: center !important;
                font-weight: 600;
              }
              
              .ag-theme-alpine .ag-cell.actions-cell {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 8px 0 !important;
              }
              
              .ag-theme-alpine .ag-header-cell {
                background-color: #fafafa !important;
                border-bottom: 2px solid #e8e8e8 !important;
                font-weight: 600 !important;
              }
              
              .ag-theme-alpine .ag-row {
                border-bottom: 1px solid #f0f0f0 !important;
              }
              
              .ag-theme-alpine .ag-row:hover {
                background-color: #f5f5f5 !important;
              }
              
              .ag-theme-alpine .ag-cell {
                border-right: 1px solid #f0f0f0 !important;
                padding: 8px 12px !important;
              }
              
              .ag-theme-alpine .ag-cell:last-child {
                border-right: none !important;
              }
            `}
          </style>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={filteredUsers}
            onGridReady={handleGridReady}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
              suppressSizeToFit: false,
            }}
            animateRows={true}
            rowSelection="single"
            suppressRowClickSelection={true}
            loadingOverlayComponent={() => <Spin size="large" />}
            loadingOverlayComponentParams={{
              loadingMessage: "Loading users...",
            }}
            onFirstDataRendered={(params) => {
              params.api.sizeColumnsToFit();
            }}
            onGridSizeChanged={(params) => {
              params.api.sizeColumnsToFit();
            }}
          />
        </div>

        {/* Modals */}
        <UserFormModal
          visible={isFormModalVisible}
          onCancel={() => {
            setIsFormModalVisible(false);
            setEditingUser(null);
          }}
          onSubmit={handleFormSubmit}
          user={editingUser || undefined}
          title={editingUser ? "Edit User" : "Add User"}
        />

        <DeleteUserModal
          visible={isDeleteModalVisible}
          onCancel={() => {
            setIsDeleteModalVisible(false);
            setDeletingUser(null);
          }}
          onConfirm={handleDeleteConfirm}
          user={deletingUser || undefined}
        />
      </Card>
    </div>
  );
}; 