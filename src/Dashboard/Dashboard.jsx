import React, { useEffect, useState } from "react";
import { HeartOutlined, UserOutlined, BarChartOutlined, PlusOutlined, EditOutlined, TeamOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Button, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/counterSlice";
import "./Dashboard.scss";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [items, setItems] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const location = useLocation();
  const currentURI =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const user = useSelector(selectUser);
  const role = user?.role;
  // const role = "ADMIN";

  useEffect(() => {
    // Định nghĩa các mục menu dựa trên vai trò của người dùng
    if (role === "ADMIN") {
      setItems([
        getItem("Doanh thu", "overview", <FaRegMoneyBillAlt />),
        getItem("Thông tin Sân", "FieldAdmin", <EditOutlined />),
        // getItem("Thông tin Sân", "update-field", <EditOutlined />),
        // getItem("Quản lý Nhân Viên", "staffs", <UserOutlined />),
        // getItem("Thống kê", "statistics", <BarChartOutlined />),
        getItem("Quản lý Tài khoản", "account-list", <TeamOutlined />),
      ]);
    } else if (role === "CLUB_STAFF") {

      setItems([
        // getItem("Quản lý Sân", "LocationDetail", <HeartOutlined />),
        // getItem("Quản lý Tài Khoản", "account-list", <TeamOutlined />),
        // getItem("Quản lý Mã Giảm Giá", "promotion", <TeamOutlined />),
        getItem("Quản lý Check In", "checkin", <TeamOutlined />),
      ]);
    } else if (role === "CLUB_OWNER") {
      setItems([
        getItem("Thông Tin Sân", "LocationDetail", <HeartOutlined />),
        getItem("Cập Nhật Sân", "ManagerField", <EditOutlined />),
        getItem("Quản lý Mã Giảm Giá", "promotion", <TeamOutlined />),
        getItem("Quản lý Nhân Viên", "account-staff", <TeamOutlined />),
        getItem("Doanh thu", "overview", <FaRegMoneyBillAlt />),
      ]);
    }
  }, [role]);

  useEffect(() => {
    const dataOpen = JSON.parse(localStorage.getItem("keys")) ?? [];
    setOpenKeys(dataOpen);
  }, []);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
    localStorage.setItem("keys", JSON.stringify(keyMenuItem));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentURI]}
          openKeys={openKeys}
          onOpenChange={handleSubMenuOpen}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key}>
                    <Link
                      to={`/dashboard/${subItem.key}`}
                      className="no-underline"
                    >
                      {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/dashboard/${item.key}`} className="no-underline">
                  {item.label}
                </Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <header></header>
          <Button type="primary" style={{ marginRight: "16px" }}>
            <Link to="/" className="no-underline" style={{ color: "white" }}>
              Trang chủ
            </Link>
          </Button>
        </Header>
        <Content
          style={{ margin: "0 16px", display: "flex", flexDirection: "column" }}
        >
          <Breadcrumb>
            {location.pathname.split("/").map((path, index, array) => (
              <Breadcrumb.Item key={index}>
                {index === 0 ? (
                  <Link to="/dashboard" className="no-underline">
                    Bảng điều khiển
                  </Link>
                ) : (
                  <Link
                    to={`/${array.slice(0, index + 1).join("/")}`}
                    className="no-underline"
                  >
                    {path}
                  </Link>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet style={{ flexGrow: 1 }} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#E3F2EE" }}>
          Booking88 ©{new Date().getFullYear()} Created by DEMI
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
