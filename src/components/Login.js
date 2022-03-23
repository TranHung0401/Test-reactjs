import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const device_code = localStorage.getItem('device_code');

    const [mess, setMess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('device_code')) {
            fetch('http://a.vipn.net/api/device/init', {
                method: 'POST',
                body: { device_type: 2 }
            })
                .then(res => res.json())
                .then(data => {
                    //localStorage.setItem('id', data.data.id)
                    localStorage.setItem('device_code', data.data.device_code)
                })
        }

        setTimeout(() => {
            localStorage.clear()
        }, 300000);
    }, [])

    const onFinish = (values) => {
        fetch('http://a.vipn.net/api/auth/login', {
            method: 'POST',
            headers: {
                'device-code': device_code,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "email": values.email,
                    "password": values.password
                }),
        })
            .then(res => res.json())
            .then(user => {
                setMess(user.msg)
                if (user.success) {
                    localStorage.setItem('user', JSON.stringify(user.data.user))
                    return navigate('/user');

                }
            })
            .catch(err => console.log(err))

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (

        <Row>
            <Col span={12} offset={6}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 3,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Row>
                        <Col span={12} offset={6}>
                            <p
                                style={{ color: 'red', fontSize: '15px' }}
                            >{mess}</p>
                        </Col>
                    </Row>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>

    )
}
