import React, { useEffect, useState } from "react";
import { ProfileOutlined, HeartOutlined, UserOutlined, BarChartOutlined, PlusOutlined, EditOutlined, TeamOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/counterSlice";
import './Dashboard.scss';

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
  const currentURI = location.pathname.split("/")[location.pathname.split("/").length - 1];
  const user = useSelector(selectUser);
  const role = user?.role;

  useEffect(() => {
    // Định nghĩa các mục menu dựa trên vai trò của người dùng
    if (role === "ADMIN") {
      setItems([
        getItem("Hồ sơ", "UserProfile", <ProfileOutlined />),
        getItem("Cập Nhật Sân", "update-field", <EditOutlined />),
        getItem("Quản lý Nhân Viên", "staffs", <UserOutlined />),
        getItem("Thống kê", "statistics", <BarChartOutlined />),
        getItem("Tạo Sân Mới", "create-new-field", <PlusOutlined />),
        getItem("Quản lý Tài khoản", "account-list", <TeamOutlined />), // Thêm mục này
      ]);
    } else if (role === "CLUB_STAFF") {
      setItems([
        getItem("Quản lý Sân", "manage-fields", <HeartOutlined />),
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
                    <Link to={`/dashboard/${subItem.key}`} className="no-underline">
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
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <header></header>
        </Header>
        <Content
          style={{ margin: "0 16px", display: "flex", flexDirection: "column" }}
        >
          <Breadcrumb>
            {location.pathname.split("/").map((path, index, array) => (
              <Breadcrumb.Item key={index}>
                {index === 0 ? (
                  <Link to="/dashboard" className="no-underline">Bảng điều khiển</Link>
                ) : (
                  <Link to={`/${array.slice(0, index + 1).join("/")}`} className="no-underline">
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
