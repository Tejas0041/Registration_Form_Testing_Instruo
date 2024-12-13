import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const RegistrationPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [eventDetails, setEventDetails] = useState(null);
    const [members, setMembers] = useState([{ memberName: '', memberEmail: '', memberPhone: '' }]);

    useEffect(() => {
        if (eventId) {
            fetch(`http://localhost:5000/api/event/${eventId}`)
                .then((response) => response.json())
                .then((data) => setEventDetails(data))
                .catch((error) => console.error('Error fetching event details:', error));
        }
    }, [eventId]);

    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...members];
        updatedMembers[index][field] = value;
        setMembers(updatedMembers);
    };

    const addMember = () => {
        setMembers([...members, { memberName: '', memberEmail: '', memberPhone: '' }]);
    };

    const removeMember = (index) => {
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
    };

    const onFinish = (values) => {
        const payload = {
            ...values,
            event: eventDetails.name,
            members,
        };

        console.log('Payload:', payload);

        fetch('http://localhost:5000/api/registrations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to register');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Registration successful:', data);
                navigate('/getallevents');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Registration failed. Please try again.');
            });
    };


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#555555',
                padding: '20px',
            }}
        >
            <div
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    background: 'linear-gradient(135deg, #f0f0f0, #e6e6e6)',
                    color: '#333',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                }}
            >
                <h1 style={{ color: '#222', textAlign: 'center', marginBottom: '20px' }}>
                    Event Registration
                </h1>
                {eventDetails && (
                    <h4 style={{ color: '#555', textAlign: 'center', marginBottom: '20px' }}>
                        Event: {eventDetails.name}
                    </h4>
                )}
                <Button
                    type="link"
                    onClick={() => navigate(-1)}
                    style={{
                        marginBottom: '20px',
                        color: '#007acc',
                    }}
                >
                    &larr; Back
                </Button>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label={<span style={{ color: '#222' }}>Name</span>}
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input
                            placeholder="Enter your name"
                            style={{
                                backgroundColor: '#f9f9f9',
                                color: '#333',
                                borderColor: '#ccc',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<span style={{ color: '#222' }}>Email</span>}
                        name="email"
                        rules={[{ type: 'email', required: true, message: 'Please input a valid email!' }]}
                    >
                        <Input
                            placeholder="Enter your email"
                            style={{
                                backgroundColor: '#f9f9f9',
                                color: '#333',
                                borderColor: '#ccc',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<span style={{ color: '#222' }}>Phone</span>}
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input
                            placeholder="Enter your phone number"
                            style={{
                                backgroundColor: '#f9f9f9',
                                color: '#333',
                                borderColor: '#ccc',
                            }}
                        />
                    </Form.Item>
                    <Form.Item label={<span style={{ color: '#222' }}>Team Name</span>} name="teamName">
                        <Input
                            placeholder="Enter your team name (optional)"
                            style={{
                                backgroundColor: '#f9f9f9',
                                color: '#333',
                                borderColor: '#ccc',
                            }}
                        />
                    </Form.Item>

                    <h2 style={{ color: '#222', marginBottom: '10px' }}>Team Members</h2>
                    {members.map((member, index) => (
                        <div
                            key={index}
                            style={{
                                border: '1px solid #ddd',
                                padding: '15px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                backgroundColor: '#f8f8f8',
                            }}
                        >
                            <Form.Item
                                label={<span style={{ color: '#222' }}>{`Member ${index + 1} Name`}</span>}
                                rules={[{ required: true, message: 'Please input the member name!' }]}
                            >
                                <Input
                                    placeholder="Enter member name"
                                    value={member.memberName}
                                    onChange={(e) => handleMemberChange(index, 'memberName', e.target.value)}
                                    style={{
                                        backgroundColor: '#f9f9f9',
                                        color: '#333',
                                        borderColor: '#ccc',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={<span style={{ color: '#222' }}>{`Member ${index + 1} Email`}</span>}
                                rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                            >
                                <Input
                                    placeholder="Enter member email"
                                    value={member.memberEmail}
                                    onChange={(e) => handleMemberChange(index, 'memberEmail', e.target.value)}
                                    style={{
                                        backgroundColor: '#f9f9f9',
                                        color: '#333',
                                        borderColor: '#ccc',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={<span style={{ color: '#222' }}>{`Member ${index + 1} Phone`}</span>}
                                rules={[{ required: true, message: 'Please input a valid phone number!' }]}
                            >
                                <Input
                                    placeholder="Enter member phone"
                                    value={member.memberPhone}
                                    onChange={(e) => handleMemberChange(index, 'memberPhone', e.target.value)}
                                    style={{
                                        backgroundColor: '#f9f9f9',
                                        color: '#333',
                                        borderColor: '#ccc',
                                    }}
                                />
                            </Form.Item>
                            <Button
                                type="default"
                                onClick={() => removeMember(index)}
                                disabled={members.length === 1}
                                style={{
                                    backgroundColor: '#f0f0f0',
                                    color: '#d93025',
                                    border: '1px solid #d93025',
                                    marginTop: '10px',
                                }}
                            >
                                Remove Member
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="dashed"
                        onClick={addMember}
                        style={{
                            backgroundColor: '#fafafa',
                            color: '#007acc',
                            border: '1px dashed #007acc',
                            marginBottom: '20px',
                        }}
                    >
                        Add Member
                    </Button>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: '#1890ff',
                                borderColor: '#1890ff',
                                color: '#fff',
                                width: '100%',
                                fontWeight: 'bold',
                            }}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default RegistrationPage;