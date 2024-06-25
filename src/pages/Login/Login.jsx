import { useState } from "react";
import "../../App.css";
import logo from "../../assets/logologin.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GGLogin from "../../api/GGlogin";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/counterSlice";
import { Form, Input, Button, Typography } from "antd";
import anh11 from '../../assets/imglogin.webp';

const clientId = "YOUR_GOOGLE_CLIENT_ID";

const { Title, Text } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const res = await api.post("/login", { email, password });
      dispatch(login(res.data));
      localStorage.setItem("token", res.data.token)
      toast.success("Đăng nhập thành công! Đang chuyển đến trang chính...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.");
    }
  };

  return (
    <div className="loginPage flex">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="container flex">
        <div className="videoDiv">
          <img src={anh11} alt="Customer Image" />
          <div className="footerDiv flex">
            <span className="text">Chưa có tài khoản?</span>
            <Link to={"/register"}>
              <Button type="primary">Đăng ký</Button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <Title level={3}>Chào mừng trở lại!</Title>
          </div>
          <Form
            name="login"
            className="form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email của bạn!" }]}
            >
              <Input
                prefix={<FaUserShield />}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu của bạn!" }]}
            >
              <Input.Password
                prefix={<BsFillShieldLockFill />}
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="btn flex">
                <span>Đăng nhập</span>
                <AiOutlineSwapRight className="icon" />
              </Button>
            </Form.Item>
            <Form.Item>
              <Text>
                Quên mật khẩu? <Link to="/PasswordRecovery">Nhấn vào đây</Link>
              </Text>
            </Form.Item>
          </Form>
          <div className="line"></div>
          <div className="field button-field">
            <GoogleOAuthProvider clientId={clientId}>
              <GGLogin />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
