import React from 'react';
import './Regulations.scss';
import { Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

const Regulations = () => {
    return (
        <div className="regulations-page">
            <Title level={2} className="regulations-title">Quy Định Đặt Sân - Booking88</Title>
            
            <Paragraph>
                Chào mừng bạn đến với <Text strong>Booking88</Text>! Vui lòng đọc kỹ các quy định dưới đây để đảm bảo trải nghiệm đặt sân tốt nhất.
            </Paragraph>
            
            <Title level={3}>Quy Định Chung</Title>
            <Paragraph>
                <Text strong>1. Đối Tượng Đặt Sân:</Text><br />
                - Chỉ người dùng đã đăng ký mới có thể đặt sân.<br />
                - Cung cấp thông tin chính xác khi đặt sân.
            </Paragraph>
            <Paragraph>
                <Text strong>2. Thời Gian Đặt Sân:</Text><br />
                - Đặt sân trước tối đa 14 ngày.<br />
                - Đặt sân trong ngày được phép tối thiểu 2 giờ trước giờ chơi.
            </Paragraph>
            <Paragraph>
                <Text strong>3. Giới Hạn Đặt Sân:</Text><br />
                - Mỗi người dùng có thể đặt tối đa 2 suất mỗi ngày.
            </Paragraph>

            <Title level={3}>Chính Sách Hủy Đặt Sân</Title>
            <Paragraph>
                <Text strong>1. Thời Gian Hủy Đặt:</Text><br />
                - Hủy đặt trước 24 giờ không bị phạt.<br />
                - Hủy trong vòng 24 giờ bị phạt 50% số tiền đặt.
            </Paragraph>
            <Paragraph>
                <Text strong>2. Chính Sách Vắng Mặt:</Text><br />
                - Vắng mặt mà không hủy trước bị trừ toàn bộ số tiền đặt.<br />
                - Vắng mặt nhiều lần có thể bị tạm ngưng tài khoản.
            </Paragraph>

            <Title level={3}>Thanh Toán và Hoàn Tiền</Title>
            <Paragraph>
                <Text strong>1. Phương Thức Thanh Toán:</Text><br />
                - Chấp nhận thanh toán bằng thẻ tín dụng, thẻ ghi nợ và ví điện tử.<br />
                - Thanh toán tại thời điểm đặt sân.
            </Paragraph>
            <Paragraph>
                <Text strong>2. Chính Sách Hoàn Tiền:</Text><br />
                - Hoàn tiền cho hủy đặt hợp lệ trong vòng 5-7 ngày làm việc.<br />
                - Tiền hoàn được chuyển về phương thức thanh toán ban đầu.
            </Paragraph>

            <Title level={3}>Sử Dụng Sân</Title>
            <Paragraph>
                <Text strong>1. Thời Gian Có Mặt:</Text><br />
                - Có mặt ít nhất 15 phút trước giờ đặt.<br />
                - Check-in trước khi bắt đầu giờ đặt.
            </Paragraph>
            <Paragraph>
                <Text strong>2. Quy Tắc Ứng Xử:</Text><br />
                - Mặc trang phục thể thao và giày không tạo vết.<br />
                - Tuân thủ các quy tắc và hướng dẫn của sân.<br />
                - Báo cáo mọi hư hại ngay lập tức.
            </Paragraph>
            <Paragraph>
                <Text strong>3. Vệ Sinh:</Text><br />
                - Đảm bảo sân sạch sẽ sau khi sử dụng.<br />
                - Vứt rác đúng nơi quy định.
            </Paragraph>

            <Title level={3}>Liên Hệ và Hỗ Trợ</Title>
            <Paragraph>
                <Text strong>1. Hỗ Trợ Khách Hàng:</Text><br />
                - Để được hỗ trợ hoặc yêu cầu, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại bên dưới.<br />
                - Hỗ trợ khách hàng hoạt động từ 9 giờ sáng đến 9 giờ tối, từ thứ Hai đến thứ Bảy.
            </Paragraph>
            <Paragraph>
                <Text strong>Email:</Text> swp@gmail.com<br />
                <Text strong>Số Điện Thoại:</Text> 0999933333
            </Paragraph>

            <Paragraph>
                <Text strong>Booking88</Text> - Nền tảng đặt sân tiện lợi. Chúc bạn có trải nghiệm tuyệt vời!
            </Paragraph>

            <Paragraph>
                <Text type="secondary">Lưu ý: Booking88 có quyền thay đổi các quy định này bất cứ lúc nào. Người dùng sẽ được thông báo qua email và trang web của chúng tôi.</Text>
            </Paragraph>
        </div>
    );
};

export default Regulations;
