
import React from "react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-cinema-blue">Terms of Service</h1>
          
          <Card className="p-6 mb-8">
            <p className="text-sm text-gray-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mb-4">
              Welcome to CineTix. Please read these Terms of Service carefully before using our website or services.
              By accessing or using CineTix, you agree to be bound by these Terms.
            </p>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing or using CineTix services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with these Terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. User Accounts</h2>
              <p className="text-gray-600">
                To use certain features of our service, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Booking and Payments</h2>
              <p className="text-gray-600">
                When booking tickets through CineTix, you agree to provide accurate and complete information. All transactions are final once confirmed, subject to our Refund Policy. Payment processing is handled by secure third-party payment processors, and we do not store your complete credit card information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Ticket Usage</h2>
              <p className="text-gray-600">
                Tickets purchased through CineTix are valid only for the specified movie, date, time, and venue. Tickets cannot be transferred, exchanged, or resold without our express permission. CineTix reserves the right to refuse entry if ticket violations are suspected.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Privacy</h2>
              <p className="text-gray-600">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information when you use our services. By using CineTix, you consent to the data practices described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Prohibited Activities</h2>
              <p className="text-gray-600">
                You agree not to engage in any of the following activities: (a) violating any applicable laws or regulations, (b) attempting to interfere with the proper functioning of our services, (c) attempting to access data not intended for you, (d) using our services for any fraudulent or illegal purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Intellectual Property</h2>
              <p className="text-gray-600">
                All content on CineTix, including but not limited to text, graphics, logos, icons, images, audio clips, and software, is the property of CineTix or its content suppliers and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
              <p className="text-gray-600">
                CineTix shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, our services or any content provided by or through our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
              <p className="text-gray-600">
                CineTix reserves the right to modify these Terms at any time. We will notify users of any significant changes through our website or by email. Your continued use of CineTix after such changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions or concerns regarding these Terms, please contact us at:
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

export default Terms;
