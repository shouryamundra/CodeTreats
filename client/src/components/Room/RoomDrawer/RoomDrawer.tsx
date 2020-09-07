import { SendOutlined } from '@ant-design/icons';
import { Badge, Button, Drawer } from 'antd';
import socket from 'config/socket/socket';
import React from 'react';
import RoomContext from '_context/room/room.context';
import ActiveUsers from './ActiveUsers';
import ChatInput from './ChatInput';
import Messages from './Messages';


interface IMessages {
    text: string;
    sender: string;
    notification?: boolean;
}

const RoomDrawer = () => {
    const { roomMessages, updateMessages } = React.useContext(RoomContext);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        // receive msg from server
        console.log("rendering chat comp")
        socket.on('update:message', (message: IMessages) => {
            updateMessages(message);
        });

        return () => {
            socket.removeAllListeners();
          };
        //eslint-disable-next-line
    }, []);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <Badge count={roomMessages.length} className='my-2' overflowCount={10}>
                <Button type='primary' shape='round' onClick={showDrawer} icon={<SendOutlined />}>
                    Show Chatbox
                </Button>
            </Badge>

            <Drawer placement='right' closable={false} onClose={onClose} visible={visible} width={300}>
                <ActiveUsers />
                <Messages />
                <ChatInput />
            </Drawer>
        </>
    );
};

export default RoomDrawer;
