import React from "react";

// This page displays the contact information
const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-[#FF4D8B] mb-8 text-center">
        Contact Us
      </h1>

      <div className="bg-pink-50 border-2 border-[#fdda4d] p-8 rounded-xl shadow space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#FF4D8B] mb-2">
            Our Address
          </h2>
          <p className="text-gray-700 font-medium">
            Aya Crochet Studio
            <br />
            Bliss Street, Beirut, Lebanon
            <br />
            Building 12, 2nd Floor
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#FF4D8B] mb-2">Phone</h2>
          <p className="text-gray-700 font-medium">+961 71 234 567</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#FF4D8B] mb-2">Email</h2>
          <p className="text-gray-700 font-medium">support@ayacrochet.com</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#FF4D8B] mb-2">
            Opening Hours
          </h2>
          <p className="text-gray-700 font-medium">
            Monday – Friday: 9:00 AM – 6:00 PM
            <br />
            Saturday: 10:00 AM – 4:00 PM
            <br />
            Sunday: Closed
          </p>
        </div>

        <div className="bg-white p-6 border border-[#FF4D8B] rounded-lg text-center">
          <p className="text-lg text-[#FF4D8B] font-semibold">
            For order inquiries, product customization, or bulk requests — we’re
            happy to help!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Expect a response within 24–48 business hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
