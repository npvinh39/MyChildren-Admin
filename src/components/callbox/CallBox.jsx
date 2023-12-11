import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

export const CallBox = () => {
    const [showCallBox, setShowCallBox] = useState(false);

    const show = () => {
        setShowCallBox(!showCallBox);
    };

    return (
        <>
            <FloatButton
                icon={<PhoneOutlined />}
                size='large'
                type="primary"
                shape='circle'
                style={{
                }}
                onClick={show}
            />
            {
                showCallBox &&
                <div className='w-96 fixed bottom-28 right-4 bg-[#633db1] border border-[#633db1] rounded-lg shadow-lg z-[999] overflow-hidden'>
                    <iframe className='bg-[#633db1] border-none' src="https://callbox.pages.dev/" width="100%" height="560" title="Call box"></iframe>
                </div>
            }
        </>
    )
}

export default CallBox;