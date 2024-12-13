// import React, { useState } from 'react';
// import { Form, Input, Button, Upload, DatePicker, Typography, Select, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const { Title } = Typography;
// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const AddEvent = () => {
//     const [form] = Form.useForm();
//     const [eventType, setEventType] = useState('Combined'); // Default event type
//     const navigate = useNavigate();

//     const onFinish = async (values) => {
//         console.log('Submitted:', values);

//         const formData = new FormData();
//         formData.append('name', values.name);
//         formData.append('description', values.description);
//         formData.append('startTime', values.timeRange[0].format('YYYY-MM-DD HH:mm:ss'));
//         formData.append('endTime', values.timeRange[1].format('YYYY-MM-DD HH:mm:ss'));
//         formData.append('venue', values.venue);
//         formData.append('type', values.type);

//         if (values.maxSize && values.minSize) {
//             formData.append('maxSize', values.maxSize);
//             formData.append('minSize', values.minSize);
//         }

//         // Poster Image (required)
//         if (values.poster && values.poster.length) {
//             formData.append('poster', values.poster[0].originFileObj);
//         }

//         // Gallery Images (optional)
//         if (values.gallery) {
//             values.gallery.forEach((file) => {
//                 formData.append('gallery', file.originFileObj);
//             });
//         }

//         try {
//             // POST request to create event
//             const response = await axios.post('http://localhost:5000/api/event/create', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             message.success('Event created successfully!');
//             const { _id } = response.data; // Assuming MongoDB ID is returned as `_id`
//             console.log('API Response:', response.data);

//             // Navigate to EventDetails page
//             navigate(`/event-details/${_id}`);
//         } catch (error) {
//             message.error('Error occurred while creating event.');
//             console.error('Error:', error);
//         }
//     };

//     const handleTypeChange = (value) => {
//         setEventType(value);
//         if (value === 'Single') {
//             form.setFieldsValue({ maxSize: null, minSize: null });
//         }
//     };

//     return (
//         <div style={{ maxWidth: '700px', margin: '50px auto', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
//             <Title level={3} style={{ textAlign: 'center' }}>Create New Event</Title>
//             <Button type="link" href="/" style={{ marginBottom: '20px' }}>Go Back</Button>
//             <Form layout="vertical" onFinish={onFinish} form={form} initialValues={{ type: 'Combined' }}>
//                 {/* Event Name */}
//                 <Form.Item
//                     label="Event Name"
//                     name="name"
//                     rules={[{ required: true, message: 'Please input the event name!' }]}
//                 >
//                     <Input placeholder="Enter event name" />
//                 </Form.Item>

//                 {/* Event Description */}
//                 <Form.Item
//                     label="Event Description"
//                     name="description"
//                     rules={[{ required: true, message: 'Please input the event description!' }]}
//                 >
//                     <Input placeholder="Enter event description" />
//                 </Form.Item>

//                 {/* Event Date and Time */}
//                 <Form.Item
//                     label="Start and End Time"
//                     name="timeRange"
//                     rules={[{ required: true, message: 'Please select event timings!' }]}
//                 >
//                     <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//                 </Form.Item>

//                 {/* Event Venue */}
//                 <Form.Item
//                     label="Event Venue"
//                     name="venue"
//                     rules={[{ required: true, message: 'Please input the venue!' }]}
//                 >
//                     <Input placeholder="Enter event venue" />
//                 </Form.Item>

//                 {/* Event Rules (optional) */}
//                 <Form.Item
//                     label="Event Rules"
//                     name="rules"
//                 >
//                     <Input placeholder="Enter event rules (optional)" />
//                 </Form.Item>

//                 {/* Rules Document URL (optional) */}
//                 <Form.Item
//                     label="Rules Document URL"
//                     name="rulesDoc"
//                 >
//                     <Input placeholder="Enter rules document URL (optional)" />
//                 </Form.Item>

//                 {/* Event Type */}
//                 <Form.Item
//                     label="Event Type"
//                     name="type"
//                     rules={[{ required: true, message: 'Please select the event type!' }]}
//                 >
//                     <Select placeholder="Select event type" onChange={handleTypeChange}>
//                         <Option value="Single">Single</Option>
//                         <Option value="Team">Team</Option>
//                         <Option value="Combined">Combined</Option>
//                     </Select>
//                 </Form.Item>

//                 {/* Event Size (required if not Single) */}
//                 {eventType !== 'Single' && (
//                     <Form.Item label="Team Size">
//                         <Form.Item
//                             label="Maximum Size"
//                             name="maxSize"
//                             rules={[{ required: true, message: 'Maximum size is required!' }]}
//                             style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '8px' }}
//                         >
//                             <Input placeholder="Max size" type="number" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Minimum Size"
//                             name="minSize"
//                             rules={[{ required: true, message: 'Minimum size is required!' }]}
//                             style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
//                         >
//                             <Input placeholder="Min size" type="number" />
//                         </Form.Item>
//                     </Form.Item>
//                 )}

//                 {/* Upload Poster Image (required) */}
//                 <Form.Item
//                     label="Poster Image"
//                     name="poster"
//                     valuePropName="fileList"
//                     getValueFromEvent={({ fileList }) => fileList}
//                     rules={[{ required: true, message: 'Poster image is required!' }]}
//                     extra="Upload the event poster"
//                 >
//                     <Upload
//                         name="poster"
//                         listType="picture"
//                         beforeUpload={() => false}
//                     >
//                         <Button icon={<UploadOutlined />}>Upload Poster</Button>
//                     </Upload>
//                 </Form.Item>

//                 {/* Upload Gallery Images (optional) */}
//                 <Form.Item
//                     label="Gallery Images"
//                     name="gallery"
//                     valuePropName="fileList"
//                     getValueFromEvent={({ fileList }) => fileList}
//                     extra="Upload event gallery images"
//                 >
//                     <Upload
//                         name="gallery"
//                         listType="picture"
//                         multiple
//                         beforeUpload={() => false}
//                     >
//                         <Button icon={<UploadOutlined />}>Upload Gallery Images</Button>
//                     </Upload>
//                 </Form.Item>

//                 {/* Submit Button */}
//                 <Form.Item>
//                     <Button type="primary" htmlType="submit" block>
//                         Add Event
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     );
// };

// export default AddEvent;

import React, { useState } from 'react';
import { Form, Input, Button, Upload, DatePicker, Typography, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AddEvent = () => {
    const [form] = Form.useForm();
    const [eventType, setEventType] = useState('Combined'); // Default event type
    const navigate = useNavigate();

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinish = async (values) => {
        console.log('Submitted:', values);

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('startTime', values.timeRange[0].format('YYYY-MM-DD HH:mm:ss'));
        formData.append('endTime', values.timeRange[1].format('YYYY-MM-DD HH:mm:ss'));
        formData.append('venue', values.venue);
        formData.append('type', values.type);

        if(values.rules){
            formData.append('rules', values.rules);
        }

        if(values.rulesDoc){
            formData.append('rulesDoc', values.rulesDoc);
        }

        if (values.maxSize && values.minSize) {
            formData.append('maxSize', values.maxSize);
            formData.append('minSize', values.minSize);
        }

        // Poster Image (required)
        if (values.poster && values.poster.length) {
            formData.append('poster', values.poster[0].originFileObj);
        } else {
            message.error('Please upload a poster image!');
            return;
        }

        // Gallery Images (optional)
        if (values.gallery) {
            values.gallery.forEach((file) => {
                formData.append('gallery', file.originFileObj);
            });
        }

        try {
            // POST request to create event
            const response = await axios.post('http://localhost:5000/api/event/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            message.success('Event created successfully!');
            const { _id } = response.data; // Assuming MongoDB ID is returned as `_id`
            console.log('API Response:', response.data);

            // Navigate to EventDetails page
            navigate(`/event-details/${_id}`);
        } catch (error) {
            message.error('Error occurred while creating event.');
            console.error('Error:', error.response?.data || error.message);
        }
    };

    const handleTypeChange = (value) => {
        setEventType(value);
        if (value === 'Single') {
            form.setFieldsValue({ maxSize: null, minSize: null });
        }
    };

    return (
        <div style={{ maxWidth: '700px', margin: '50px auto', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
            <Title level={3} style={{ textAlign: 'center' }}>Create New Event</Title>
            <Button type="link" href="/" style={{ marginBottom: '20px' }}>Go Back</Button>
            <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
                initialValues={{ type: 'Combined' }}
            >
                {/* Event Name */}
                <Form.Item
                    label="Event Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the event name!' }]}
                >
                    <Input placeholder="Enter event name" />
                </Form.Item>

                {/* Event Description */}
                <Form.Item
                    label="Event Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the event description!' }]}
                >
                    <Input placeholder="Enter event description" />
                </Form.Item>

                {/* Event Date and Time */}
                <Form.Item
                    label="Start and End Time"
                    name="timeRange"
                    rules={[{ required: true, message: 'Please select event timings!' }]}
                >
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>

                {/* Event Venue */}
                <Form.Item
                    label="Event Venue"
                    name="venue"
                    rules={[{ required: true, message: 'Please input the venue!' }]}
                >
                    <Input placeholder="Enter event venue" />
                </Form.Item>

                {/* Event Rules (optional) */}
                <Form.Item
                    label="Event Rules"
                    name="rules"
                >
                    <Input placeholder="Enter event rules (optional)" />
                </Form.Item>

                <Form.Item
                    label="Rules Doc"
                    name="rulesDoc"
                >
                    <Input placeholder="Provide link for Rules doc (optional)" />
                </Form.Item>

                {/* Event Type */}
                <Form.Item
                    label="Event Type"
                    name="type"
                    rules={[{ required: true, message: 'Please select the event type!' }]}
                >
                    <Select placeholder="Select event type" onChange={handleTypeChange}>
                        <Option value="Single">Single</Option>
                        <Option value="Team">Team</Option>
                        <Option value="Combined">Combined</Option>
                    </Select>
                </Form.Item>

                {/* Event Size */}
                {eventType !== 'Single' && (
                    <Form.Item label="Team Size">
                        <Form.Item
                            label="Maximum Size"
                            name="maxSize"
                            rules={[{ required: true, message: 'Maximum size is required!' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '8px' }}
                        >
                            <Input placeholder="Max size" type="number" />
                        </Form.Item>
                        <Form.Item
                            label="Minimum Size"
                            name="minSize"
                            rules={[{ required: true, message: 'Minimum size is required!' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input placeholder="Min size" type="number" />
                        </Form.Item>
                    </Form.Item>
                )}

                {/* Upload Poster Image */}
                <Form.Item
                    label="Poster Image"
                    name="poster"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Poster image is required!' }]}
                >
                    <Upload
                        name="poster"
                        listType="picture"
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Upload Poster</Button>
                    </Upload>
                </Form.Item>

                {/* Upload Gallery Images */}
                <Form.Item
                    label="Gallery Images"
                    name="gallery"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        name="gallery"
                        listType="picture"
                        multiple
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Upload Gallery Images</Button>
                    </Upload>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add Event
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddEvent;
