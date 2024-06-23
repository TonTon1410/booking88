import { useEffect, useState } from "react";
//import userApi from "../api/UserProfileApi";
import {
  ProfileOutlined,
  HeartOutlined,
  UserOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { login, logout, selectUser } from "../../src/redux/features/counterSlice";
import { useSelector } from "react-redux";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key, icon, children, label,
  };
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
  //const role = "ADMIN"; // Thay đổi role thành 'admin' để thử nghiệm
  //const role = userApi.getUserInfo()
  const user = useSelector(selectUser);
  const role = user?.role;
  useEffect(() => {
    // Định nghĩa các mục menu dựa trên vai trò của người dùng
    if (role === "ADMIN") {
      setItems([
        getItem("Danh mục", "category", <AppstoreAddOutlined />),
        getItem("Hồ sơ", "UserProfile", <ProfileOutlined />),
        getItem("Quản lý Sân", "all-fields", <HeartOutlined />),
        getItem("Quản lý Nhân Viên", "staffs", <UserOutlined />,),
        getItem("Thống kê Sân", "statistics", <BarChartOutlined />, [
          getItem("Sân 1", "stats-field-1"),
          getItem("Sân 2", "stats-field-2"),
          getItem("Sân 3", "stats-field-3"),
          getItem("Tất cả Sân", "all-fields"),
        ]),
      ]);
    } else if (role === "staff") {
      setItems([
        getItem("Danh mục", "category", <AppstoreAddOutlined />),
        getItem("Hồ sơ", "UserProfile", <ProfileOutlined />),
        getItem("Club", "clubs", <HeartOutlined />, [
          getItem("Khung giờ", "time-slot"),
          getItem("Khuyến mãi", "promotion"),
        ]),
        getItem("Đặt sân", "booking", <CheckCircleOutlined />, [
          getItem("Sân ID 1", "court-1"),
          getItem("Sân ID 2", "court-2"),
        ]),
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
                    <Link to={`/dashboard/${subItem.key}`}>
                      {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/dashboard/${item.key}`}>{item.label}</Link>
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
                  <Link to="/dashboard">Bảng điều khiển</Link>
                ) : (
                  <Link to={`/${array.slice(0, index + 1).join("/")}`}>
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
