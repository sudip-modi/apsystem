import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentBooking.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Mesh, PlaneGeometry, BoxGeometry, BasicMaterial } from 'three';

const AppointmentBooking = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const createAppointmentCards = (appointments) => {
    return appointments.map((appointment, index) => {
      const position = [index * 2, 0, 0]; // adjust position for each card

      return (
        <Mesh key={appointment.id} position={position}>
          <BoxGeometry args={[1, 1, 1]} />
          <BasicMaterial color={0xcccccc} />
          <Text
            font="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff"
            position={[0.5, 0.5, 0.1]}
            rotation={-Math.PI / 2}
            textAlign="center"
            lineHeight={1}
          >
            <span className="appointment-card-heading">{appointment.consultant}</span>
            <br />
            <span className="appointment-card-details">{appointment.specialty}</span>
            <br />
            <span className="appointment-card-details">{appointment.slot}</span>
            <br />
            <span className="appointment-card-details">{appointment.status}</span>
          </Text>
        </Mesh>
      );
    });
  };

  return (
    <div className="appointment-booking">
      <h1>Appointment Booking</h1>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 10, 2]} intensity={0.8} />
        {appointments.length > 0 && createAppointmentCards(appointments)}
      </Canvas>
    </div>
  );
};

export default AppointmentBooking;
