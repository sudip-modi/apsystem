import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./AppointmentBooking.css";
import * as THREE from "three";

const AppointmentBooking = () => {
  const [appointments, setAppointments] = useState([]);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);

  const createAppointmentCards = (appointments) => {
    appointments.forEach((appointment) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xcccccc });
      const card = new THREE.Mesh(geometry, material);

      // Add appointment details to the card
      const cardContent = document.createElement("div");
      cardContent.classList.add("appointment-card-content");
      cardContent.innerHTML = `
            <p class="appointment-card-heading">${appointment.consultant}</p>
            <p class="appointment-card-details">${appointment.specialty}</p>
            <p class="appointment-card-details">${appointment.slot}</p>
            <p class="appointment-card-details">${appointment.status}</p>
          `;
      card.add(cardContent);

      scene.add(card);
    });
  };

  useEffect(() => {
    const initThree = async () => {
      const newScene = new THREE.Scene();
      setScene(newScene);

      const newCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      newCamera.position.z = 5;
      setCamera(newCamera);

      const newRenderer = new THREE.WebGLRenderer({ antialias: true });

      newRenderer.setSize(window.innerWidth, window.innerHeight);

      setRenderer(newRenderer);

      console.log(renderer);

      document.getElementById("container").appendChild(newRenderer.domElement);

      // Add ambient light and a point light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      const pointLight = new THREE.PointLight(0xffffff, 0.8);
      pointLight.position.set(5, 10, 2);
      newScene.add(ambientLight, pointLight);

      try {
        const response = await axios.get("http://127.0.0.1:5000/appointments");
        setAppointments(response.data);
        createAppointmentCards(appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    initThree();
  }, []);

    useEffect(() => {
      const animate = () => {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
      };

      animate();
    }, [scene, camera, renderer]);

  return (
    <div id="container" className="appointment-booking">
      <h1>Appointment Booking</h1>
    </div>
  );
};

export default AppointmentBooking;
