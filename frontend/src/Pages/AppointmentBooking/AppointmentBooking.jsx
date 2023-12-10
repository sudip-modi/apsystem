import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./new.css"


const AppointmentBooking = () => {
    const [appointments, setAppointments] = useState([]);

    // Function to fetch appointment data from the backend
    const fetchAppointments = async () => {
      try {
        // Make a request to your Flask backend to fetch the appointments data
        const response = await axios.get('http://127.0.0.1:5000/appointments');
        setAppointments(response.data); // Assuming the response data is an array of appointment objects
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
    // Fetch appointments when the component mounts
    useEffect(() => {
      fetchAppointments();
    }, []); // Empty dependency array ensures the effect runs only once
  
  
    return (
      <div className="appointment-booking">
        <h1>Appointment Booking</h1>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Consultant</th>
              <th>Specialty</th>
              <th>Slot</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.consultant}</td>
                <td>{appointment.specialty}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default AppointmentBooking;