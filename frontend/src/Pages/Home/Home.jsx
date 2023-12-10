import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to="appointment">
        Appointment Booking
      </Link>
      <br />
      <Link to="findslot">
        Find your slot
      </Link>
    </>
  );
};

export default Home;
