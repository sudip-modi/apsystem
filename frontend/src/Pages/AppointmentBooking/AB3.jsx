import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AppointmentBooking.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Mesh, PlaneGeometry, BasicMaterial } from 'three';

const AppointmentBooking = () => {
  const [appointments, setAppointments] = useState([]);
  const cardMeshes = useRef([]); // Ref to hold card meshes

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

  const createAppointmentCardMeshes = (appointments) => {
    return appointments.map((appointment, index) => {
      const position = [index * 2, 0, 0]; // adjust position for each card
      const meshRef = useRef(); // Ref for each card's mesh

      cardMeshes.current.push(meshRef); // Add mesh ref to the array

      return (
        <Mesh key={appointment.id} position={position} ref={meshRef}>
          <PlaneGeometry args={[1, 1]} />
          <BasicMaterial color={0xcccccc} transparent opacity={0.75} />
          <Text
            font="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff"
            position={[0, 0.5, 0.1]}
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

  useFrame(() => {
    // Update card rotations based on time
    cardMeshes.current.forEach((meshRef, index) => {
      meshRef.current.rotation.y = Math.sin((Date.now() + index * 100) / 1000);
    });
  });

  return (
    <div className="appointment-booking">
      <h1>Appointment Booking</h1>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 10, 2]} intensity={0.8} />
        {appointments.length > 0 && createAppointmentCardMeshes(appointments)}
      </Canvas>
    </div>
  );
};

export default AppointmentBooking;
