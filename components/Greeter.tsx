import React from "react";
import Image from "next/image";
const Greeter = () => {
  return (
    <div className="greeter-container">
      <div className="greeter-text">
        <h1 className="greeter-header">
          Trivandrum is Now Just a <span>Hum</span> Away
        </h1>
        <p className="greeter-tagline">
          Building communities... and communities within communities.
        </p>
      </div>
      <div className="greeter-img-wrapper">
        <Image
          src="/static/delivery.svg"
          alt="Delivery"
          height="800"
          width="1000"
        />
      </div>
    </div>
  );
};

export default Greeter;
