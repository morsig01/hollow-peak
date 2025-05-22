"use client";

import React from "react";

const Contact = () => {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsAlreadySubscribed(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setIsAlreadySubscribed(true);
        }
        throw new Error(data.error || "Failed to subscribe");
      }

      setIsSuccess(true);
      setEmail("");    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full bg-center bg-fixed"
      style={{
        backgroundImage: "url('/youtube-banner.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-3xl mx-auto p-12 bg-black/80 backdrop-blur-sm text-neutral-100 shadow-xl flex flex-col min-h-[80vh]">
        <h1 className="text-4xl font-bold mb-6 text-neutral-100">
          Get In Touch
        </h1>

        <div className="grid gap-12 flex-grow">
          <div className="space-y-6">
            <div className="p-8 bg-neutral-900/50 rounded-sm">
              <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
              <p className="text-xl text-neutral-300 mb-8">                Whether you&apos;re interested in booking us for an event, have a
                press inquiry, or just want to say hello, we&apos;d love to hear from
                you!
              </p>
              <a
                href="mailto:hollowpeakband@gmail.com"
                className="text-2xl text-blue-400 hover:text-blue-300 font-medium"
              >
                contact@hollowpeak.com
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Stay Updated</h2>
            <p className="text-neutral-300">
              Subscribe to our mailing list to get updates on new releases,
              upcoming shows, and exclusive content before anyone else!
            </p>

            {isSuccess ? (
              <div className="text-center p-6 bg-green-900/20 rounded-sm">
                <h3 className="text-2xl text-green-500 mb-4">
                  Thank You for Subscribing!
                </h3>
                <p className="text-neutral-300 mb-4">
                  Check your email for a welcome message!
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-blue-500 hover:text-blue-400"
                >
                  Subscribe another email
                </button>
              </div>
            ) : isAlreadySubscribed ? (              <div className="text-center p-6 bg-blue-900/20 rounded-sm">
                <h3 className="text-2xl text-blue-400 mb-4">
                  You&apos;re Already Subscribed!
                </h3>
                <p className="text-neutral-300 mb-4">
                  This email is already receiving our updates.
                </p>
                <button
                  onClick={() => {
                    setIsAlreadySubscribed(false);
                    setEmail("");
                  }}
                  className="text-blue-500 hover:text-blue-400"
                >
                  Try a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-neutral-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="your@email.com"
                    className="w-full p-4 rounded-sm bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white text-lg font-semibold py-4 rounded-sm hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:bg-blue-800 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Subscribing..." : "Subscribe to Updates"}
                </button>
              </form>
            )}
          </div>

          <div className="text-center text-neutral-400">
            <p>
              Follow us on social media for updates and behind-the-scenes
              content!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
