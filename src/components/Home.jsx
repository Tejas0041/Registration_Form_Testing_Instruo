import React, { useState, useEffect } from 'react';
import { Button, Typography, Space, Spin } from 'antd';

const { Title } = Typography;

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isAdmin, setIsAdmin]= useState(null);

    useEffect(() => {
        fetch('https://instruo-backend.onrender.com/auth/status', {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setIsLoggedIn(data.loggedIn);
                if(data.loggedIn){
                    if(data.user.post==="Admin"){
                        setIsAdmin(true);
                    }else setIsAdmin(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching login status:', error);
                setIsLoggedIn(false);
            });
    }, []);

    if (isLoggedIn === null) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Title level={2} style={{color: 'white'}}>Home</Title>
            <Space direction="vertical" size="large">
                {!isLoggedIn ? (
                    <Button type="primary" href="https://instruo-backend.onrender.com/auth/google">
                        Log In
                    </Button>
                ) : (
                    <Button type="default" href="https://instruo-backend.onrender.com/auth/logout">
                        Log Out
                    </Button>
                )}
                { isAdmin && <Button type="dashed" href="/addevent">
                    Add Event
                </Button>}
                <Button type="link" href="/getallevents">
                    See All Events
                </Button>
            </Space>
        </div>
    );
};

export default Home;