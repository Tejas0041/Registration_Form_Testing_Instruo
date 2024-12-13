import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Space, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/event')
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error('Error fetching events:', err));

        fetch('http://localhost:5000/auth/status', {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => setIsLoggedIn(data.loggedIn))
            .catch((err) => console.error('Error checking login status:', err));
    }, []);

    const handleRegister = (eventId) => {
        navigate(`/register/${eventId}`);
    };

    const handleViewMore = (eventId) => {
        navigate(`/event-details/${eventId}`);
    };
    return (
        <div style={{ padding: '20px' }}>
            <Title level={3} style={{color: 'white'}}>All Events</Title>
            <Button type="link" href="/">Go Back</Button>
            <Row gutter={[16, 16]}>
                {events.map((event, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={event._id}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt={event.name}
                                    src={event.images?.find((img) => img.type === 'poster')?.url}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                            }
                            title={`${index + 1}. ${event.name}`}
                            style={{ maxWidth: '300px', margin: '0 auto' }}
                        >
                            <Text strong>Description: </Text>
                            <Text>
                                {event.description.length > 60
                                    ? event.description.substring(0, 60) + '...'
                                    : event.description}
                            </Text>
                            <Button
                                type="primary" block styles={{marginTop: '10px'}}
                                onClick={() => handleViewMore(event._id)}
                                style={{ padding: '0', fontSize: '14px' }}
                            >
                                View More
                            </Button>
                            {isLoggedIn && (
                                <Button type="primary" block style={{ marginTop: '10px' }} onClick={() => handleRegister(event._id)}>
                                    Register
                                </Button>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AllEvents;
