import { Button, Card, Form, Input } from 'antd';
import React from 'react';
import styles from './style.module.css';

interface IVal {
    roomName: string;
}
const JoinRoomForm = () => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 24 },
    };

    const onFormSubmit = (values: IVal) => {
        console.log(values);
    };

    const [form] = Form.useForm();
    return (
        <>
            <Card type='inner' bordered={false} className={styles.innerCard}>
                <Form {...layout} layout='vertical' form={form} onFinish={onFormSubmit} size='large'>
                    <Form.Item
                        name='roomID'
                        label='Room ID'
                        rules={[{ required: true, message: "Room ID can't be empty" }]}
                        className='py'
                    >
                        <Input placeholder='Enter room id...' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Join Room
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};

export default JoinRoomForm;
