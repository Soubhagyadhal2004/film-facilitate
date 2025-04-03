
import React from "react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-cinema-blue">Privacy Policy</h1>
          
          <Card className="p-6 mb-8">
            <p className="text-sm text-gray-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mb-4">
              At CineTix, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and 
              safeguard your information when you visit our website or use our services.
            </p>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
              <div className="text-gray-600 space-y-3">
                <p>We may collect several types of information from and about users of our website, including:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Personal information (such as name, email address, phone number) that you voluntarily provide when creating an account or booking tickets</li>
                  <li>Payment information when you make purchases (note: full payment details are processed by our secure payment processors and are not stored on our servers)</li>
                  <li>Information about your browsing actions and patterns on our website</li>
                  <li>Device information including IP address, browser type, and operating system</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
              <div className="text-gray-600">
                <p>We use information that we collect about you or that you provide to us:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>To process and fulfill your ticket bookings</li>
                  <li>To provide you with information, products, or services that you request from us</li>
                  <li>To notify you about changes to our website or services</li>
                  <li>To communicate with you about promotions, upcoming events, and other news</li>
                  <li>To improve our website and services</li>
                  <li>To protect, investigate, and deter against fraudulent, unauthorized, or illegal activity</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
              <p className="text-gray-600">
                We may share your personal information with:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600">
                <li>Cinema partners to fulfill your ticket bookings</li>
                <li>Service providers who perform functions on our behalf (e.g., payment processing)</li>
                <li>Business partners with your consent for marketing purposes</li>
                <li>Law enforcement or other governmental officials, in response to a subpoena, court order, or similar legal process</li>
              </ul>
              <p className="text-gray-600 mt-3">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information from accidental loss and unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Cookie Policy</h2>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to track the activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <div className="text-gray-600">
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>The right to access and obtain a copy of your personal information</li>
                  <li>The right to rectify any inaccurate personal information</li>
                  <li>The right to request the deletion of your personal information</li>
                  <li>The right to restrict or object to the processing of your personal information</li>
                  <li>The right to data portability</li>
                </ul>
                <p className="mt-3">To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Changes to Our Privacy Policy</h2>
              <p className="text-gray-600">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
              <p className="text-gray-600">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <address className="not-italic text-gray-600 mt-2">
                <p>VIT-AP University</p>
                <p>Amaravati, Andhra Pradesh, India</p>
                <p>Email: soubhagyadhal12345@gmail.com</p>
                <p>Phone: 9437284825</p>
              </address>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
