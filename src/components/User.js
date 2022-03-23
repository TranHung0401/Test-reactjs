import { Button, Col, Image, notification, Row, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';


export default function User() {
    const queryString = require('query-string');
    const parsed = queryString.parse(window.location.search);
    const { Title, Text } = Typography;
    const device_code = localStorage.getItem('device_code1');
    const infoUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleClick = () => {
        fetch('http://a.vipn.net/api/auth/logout', {
            method: 'GET',
            headers: {
                'device-code': device_code,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    notification.success({
                        message: data.msg,
                    });

                    return navigate('/login');
                } else {
                    notification.error({
                        message: data.msg,
                    });
                }
            })
    }

    return (
        <Row justify="center">
            <Col span={16} push={4}>
                <Title level={2}>Xin chào, {infoUser.email}</Title>
                <Space direction="vertical">
                    <Text>Số điện thoại: {infoUser.phone_number}</Text>
                </Space>
                <br />
                <Space size={[2, 16]} wrap style={{ marginTop: '20px' }}>
                    <Button onClick={handleClick}>Đăng xuất</Button>
                    <Button>Chỉnh sửa</Button>
                </Space>
            </Col>
            <Col span={4} pull={16}>
                <Image
                    width={200}
                    src={infoUser.avatar || `https://via.placeholder.com/200`}
                />
            </Col>
        </Row >
    )
}
