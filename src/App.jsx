import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddEvent from './components/AddEvent';
import AllEvents from './components/AllEvents';
import EventDetailPage from './components/EventDetails';
import RegistrationPage from './components/RegisterEventPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addevent" element={<AddEvent />} />
                <Route path="/getallevents" element={<AllEvents />} />
                <Route path="/event-details/:eventId" element={<EventDetailPage />} />
                <Route path="/register/:eventId" element={<RegistrationPage />} />
            </Routes>
        </Router>
    );
};

export default App;
