"use client";

import React from "react";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    inquiryType: "",
    urgency: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setIsSuccess(true);
      setFormData({ name: "", email: "", inquiryType: "", urgency: "" });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
      <div className="max-w-2xl h-[80vh] mx-auto p-8 bg-black/80 backdrop-blur-sm text-neutral-100 shadow-xl flex flex-col">
        <h1 className="text-3xl font-bold mb-12 text-neutral-100">Contact Us</h1>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center flex-grow">
            <h2 className="text-2xl text-green-500 mb-4">Message Sent Successfully!</h2>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-blue-500 hover:text-blue-400"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-grow">
            <div>
              <label htmlFor="name" className="block mb-2 text-neutral-200">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-4 rounded-sm bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                className="w-full p-4 rounded-sm bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                className="w-full p-4 rounded-sm bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                className="w-full p-4 rounded-sm bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
              disabled={isLoading}
              className="w-full bg-blue-600 text-white text-lg font-semibold py-8 rounded-sm hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Request Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
