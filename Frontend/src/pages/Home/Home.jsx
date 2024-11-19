import React from "react";
import Hero from "../../components/Hero";
import Feedback from "../../components/Feedback";
import BloodTypes from "../../components/BloodTypes";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <BloodTypes />
      <Feedback />
      {/* <Footer/> */}
    </div>
  );
}
