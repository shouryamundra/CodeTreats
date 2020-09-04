import { Divider, Input } from 'antd';
import React from 'react';
import RoomContext from '_context/room/room.context';

const { TextArea } = Input;

const Output = () => {
    const { loading, roomOutput } = React.useContext(RoomContext);

    if (loading) {
        return (
            <>
                <Divider orientation='left' plain>
                    Output
                </Divider>
                <TextArea rows={7} value='running...' className='font-md my-1 text-cyan' />
            </>
        );
    }

    let value = roomOutput?.stderr || roomOutput?.stdout || '';
    return (
        <>
            <Divider orientation='left' plain>
                Output
            </Divider>
            <TextArea rows={7} value={value} placeholder='Output' className='font-md my-1 text-cyan' />
        </>
    );
};

export default Output;
