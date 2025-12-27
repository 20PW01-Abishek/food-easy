import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";

const Branch = ({ title, mapSrc, bgColor }) => {
  return (
    <div
      className={`relative ${bgColor} text-white p-6 rounded-lg shadow-xl w-80 h-96 flex flex-col items-center`}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <iframe
        src={mapSrc}
        width="100%"
        height="80%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

const Service = ({ title, description, bgColor, btnColor }) => {
  return (
    <div
      className={`relative ${bgColor} text-white p-8 rounded-lg shadow-xl w-80 flex flex-col items-center text-center`}
    >
      <div className="flex flex-col items-center flex-grow">
        <div className="icon bg-white text-gray-800 p-5 rounded-full mb-4">
          <FontAwesomeIcon icon={faHamburger} className="text-3xl" />
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <hr className="border-t border-white w-3/4 my-4" />
        <p className="text-lg">{description}</p>
      </div>
      <a
        href="#"
        className={`mt-3 ${btnColor} py-2 px-4 rounded-full font-semibold hover:bg-blue-700`}
      >
        Read More
      </a>
    </div>
  );
};

const Services = () => {
  return (
    <div className="font-sans container mx-auto mb-10">
      <h2 className="my-10 text-3xl text-center text-blue-900 font-semibold">
        Our Branches
      </h2>
      <div className="flex justify-center mt-8 space-x-6">
        <Branch
          title="Chennai"
          mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1857162154984!2d76.99993861480299!3d11.024688692153317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8582f1435fa59%3A0x137d95bfd8909293!2sPSG%20College%20Of%20Technology!5e0!3m2!1sen!2sin!4v1654662099216!5m2!1sen!2sin"
          bgColor="bg-blue-500"
        />
        <Branch
          title="Coimbatore"
          mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62658.61205187147!2d76.97263665468098!3d11.026375414006537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8582ef9523359%3A0xa1ebf8112c5c931a!2sPsg%20Institute%20Of%20Technology%20And%20Applied%20Research!5e0!3m2!1sen!2sin!4v1654685618509!5m2!1sen!2sin"
          bgColor="bg-gray-800"
        />
        <Branch
          title="Trichy"
          mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.073572841961!2d77.03357509285176!3d11.033106886119842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858526b5c0591%3A0x6c452206816788d4!2sPSG%20College%20of%20Arts%20%26%20Science!5e0!3m2!1sen!2sin!4v1654701746167!5m2!1sen!2sin"
          bgColor="bg-blue-500"
        />
      </div>
      <h2 className="text-3xl mt-10 text-center text-blue-900 font-semibold">
        Our Services
      </h2>
      <div className="flex justify-center mt-10 space-x-6">
        <Service
          title="Door Delivery"
          description="Fastest Delivery in the city"
          bgColor="bg-gray-800"
          btnColor="bg-blue-500 text-white hover:bg-blue-700"
        />
        <Service
          title="Party Orders"
          description="Hosting a party? Don't hesitate!"
          bgColor="bg-blue-500"
          btnColor="bg-white text-gray-800 hover:bg-blue-900 hover:text-white"
        />
        <Service
          title="Catering"
          description="Preparing food in bulk is our jam"
          bgColor="bg-gray-800"
          btnColor="bg-blue-500 text-white hover:bg-blue-700"
        />
      </div>
    </div>
  );
};

export default Services;
