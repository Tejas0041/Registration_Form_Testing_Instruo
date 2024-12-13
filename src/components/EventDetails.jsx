import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Divider, Button, Card, Row, Col, Image, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const EventDetailPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/event/${eventId}`)
            .then((res) => setEvent(res.data))
            .catch((err) => {
                message.error('Failed to fetch event details');
                console.error(err);
            });
    }, [eventId]);

    const handleRegister = () => {
        navigate(`/register/${eventId}`);
    };

    if (!event) {
        return <Text>Loading event details...</Text>;
    }

    const poster = event.images.find((img) => img.type === 'poster');
    const gallery = event.images.filter((img) => img.type === 'gallery');

    return (
        <div style={{ padding: '20px' }}>
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate('/getallevents')}>
                Go Back
            </Button>
            <Row justify="center" style={{ marginTop: '20px' }}>
                <Col xs={24} sm={22} md={16} lg={12}>
                    <Card hoverable>
                        {poster && <Image src={poster.url} alt="Event Poster" style={{ borderRadius: '10px' }} />}
                        <Title level={2}>{event.name}</Title>
                        <Text strong>Description:</Text> <Text>{event.description}</Text>
                        <Divider />
                        <Text strong>Rules:</Text> <Text>{event.rules}</Text>
                        <Divider />
                        <Text strong>Venue:</Text> <Text>{event.venue}</Text>
                        <Divider />
                        <Text strong>Start Time:</Text> <Text>{new Date(event.startTime).toLocaleString()}</Text>
                        <Divider />
                        <Text strong>End Time:</Text> <Text>{new Date(event.endTime).toLocaleString()}</Text>
                        <Divider />
                        <div>
                            {gallery.map((img, i) => (
                                <Image key={i} src={img.url} alt={`Gallery ${i + 1}`} />
                            ))}
                        </div>
                        <Button type="primary" block size="large" onClick={handleRegister}>
                            Register Now
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default EventDetailPage;
