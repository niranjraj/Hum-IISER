import React from "react";
import Image from "next/image";
import Link from "next/link";
import DeliveryIcon from "./DeliveryIcon";
import WhatsappIcon from "./WhatsappIcon";
import EmailIcon from "./EmailIcon";
import GmapIcon from "./GmapIcon";
const Greeter = () => {
  return (
    <div className="greeter-container">
      <div className="greeter-main-content">
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
          <DeliveryIcon />
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-icon-wrapper">
          <WhatsappIcon />
        </div>
        <div className="contact-icon-wrapper">
          <EmailIcon />
        </div>
        <div className="contact-icon-wrapper">
          <GmapIcon />
        </div>
      </div>
    </div>
  );
};

export default Greeter;
