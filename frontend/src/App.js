import React  from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindSlot from "./Pages/FindSlot/FindSlot";
import Home from "./Pages/Home/Home";
import AppointmentBooking from "./Pages/AppointmentBooking/AppointmentBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/findslot" element={<FindSlot />} />
        <Route path="/appointment" element={<AppointmentBooking />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
