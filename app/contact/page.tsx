"use client";

import React from "react";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    inquiryType: "",
    urgency: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add your form submission logic here
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div 
      className="w-full bg-center bg-fixed" 
      style={{ 
        backgroundImage: "url('/youtube-banner.jpg')",
        backgroundSize: 'cover',
      }} 
    >
      <div className="max-w-2xl max-h-screen mx-auto p-8 bg-black/80 backdrop-blur-sm text-neutral-100 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-neutral-100">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-neutral-200">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-neutral-200">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="inquiryType" className="block mb-2 text-neutral-200">
              Type of Inquiry
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              required
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.inquiryType}
              onChange={handleChange}
            >
              <option value="">Select inquiry type</option>
              <option value="booking">Book for Event</option>
              <option value="collaboration">Musical Collaboration</option>
              <option value="press">Press/Media Inquiry</option>
              <option value="fanmail">Fan Mail</option>
            </select>
          </div>

          <div>
            <label htmlFor="urgency" className="block mb-2 text-neutral-200">
              Urgency Level
            </label>
            <select
              id="urgency"
              name="urgency"
              required
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.urgency}
              onChange={handleChange}
            >
              <option value="">Select urgency level</option>
              <option value="low">Not Urgent</option>
              <option value="medium">Within Next Month</option>
              <option value="high">As Soon As Possible</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-semibold py-4 rounded hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
          >
            Request Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
