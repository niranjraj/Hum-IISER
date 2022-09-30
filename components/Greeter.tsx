import React from "react";
import Image from "next/image";
import Link from "next/link";
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
        <div className="greeter-btn-wrapper">
          <Link href="/account">
            <a className="greeter-order-btn">Order Now</a>
          </Link>
        </div>
      </div>
      <div className="greeter-img-wrapper">
        <Image
          src="/static/delivery.svg"
          alt="Delivery"
          height="600"
          width="1000"
        />
      </div>
    </div>
  );
};

export default Greeter;
