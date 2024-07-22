import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { AiOutlineSwapRight } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";
import logo from '../../assets/logologin.png';
import '../../App.css';

const RegisterOwner = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, phone, password, confirmPassword, name } = values;

    if (password !== confirmPassword) {
      message.error('Mật khẩu không khớp');
      return;
    }

    try {
      const response = await axios.post('http://157.230.43.225:8080/api/admin/register', {
        email,
        phone,
        password,
        name,
      });

      if (response.status === 200) {
        message.success('Đăng ký thành công! Đang chuyển đến trang đăng nhập...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        message.error('Đăng ký thất bại. Vui lòng thử lại.');
      }

    } catch (error) {
      message.error('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <h3>Hãy cho chúng tôi biết bạn là ai!</h3>
          </div>

          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            className='form grid'
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input
                placeholder="Tên"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
            >
              <Input
                prefix={<MdMarkEmailRead />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                {
                  pattern: /^0\d{9}$/,
                  message: 'Số điện thoại phải đúng 10 chữ số và bắt đầu bằng số 0!',
                },
              ]}
            >
              <Input
                prefix={<FaPhoneAlt />}
                placeholder="Số Điện Thoại"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                prefix={<BsFillShieldLockFill />}
                placeholder="Mật Khẩu"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<BsFillShieldLockFill />}
                placeholder="Xác Nhận Mật Khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className='btn flex'>
                <span>Đăng ký</span>
                <AiOutlineSwapRight />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterOwner;
