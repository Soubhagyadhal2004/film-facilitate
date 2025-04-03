
import React from "react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Refund: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-cinema-blue">Refund Policy</h1>
          
          <Card className="p-6 mb-8">
            <p className="text-sm text-gray-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mb-4">
              This Refund Policy outlines the procedures and conditions for refunds on movie ticket purchases made through CineTix.
              Our goal is to ensure a fair and transparent refund process for all our customers.
            </p>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Standard Refund Policy</h2>
              <div className="text-gray-600 space-y-3">
                <p>CineTix offers refunds under the following conditions:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full refund for cancellations made at least 24 hours before the scheduled showtime</li>
                  <li>50% refund for cancellations made between 24 hours and 4 hours before the scheduled showtime</li>
                  <li>No refund for cancellations made less than 4 hours before the scheduled showtime</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Cancellation by Theater or CineTix</h2>
              <p className="text-gray-600">
                In the event that a show is cancelled by the theater or CineTix due to technical issues, unforeseen circumstances, or any other reason outside your control, you are eligible for a full refund or the option to reschedule your booking for another showtime.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Technical Failures</h2>
              <p className="text-gray-600">
                If you experience technical issues during the booking process that result in an erroneous or duplicate charge, please contact our customer support immediately with your transaction details. After verification, we will process a full refund for the affected transaction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Refund Processing Time</h2>
              <div className="text-gray-600 space-y-3">
                <p>Refund processing times depend on your payment method:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Credit/Debit Cards: 5-7 business days</li>
                  <li>Net Banking: 3-5 business days</li>
                  <li>Digital Wallets: 1-3 business days</li>
                  <li>CineTix Wallet: Immediate</li>
                </ul>
                <p>Please note that while CineTix processes refunds promptly, the actual time for the refund to appear in your account depends on your financial institution.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. How to Request a Refund</h2>
              <div className="text-gray-600 space-y-3">
                <p>To request a refund, follow these steps:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Log in to your CineTix account</li>
                  <li>Go to "My Bookings" in your dashboard</li>
                  <li>Select the booking you wish to cancel</li>
                  <li>Click on "Cancel Booking" and follow the instructions</li>
                  <li>Choose your preferred refund method</li>
                </ol>
                <p>Alternatively, you can contact our customer support team for assistance with your refund request.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Non-Refundable Items</h2>
              <p className="text-gray-600">
                Please note that convenience fees, service charges, and other administrative fees are non-refundable except in cases of cancellation by the theater or CineTix.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Special Circumstances</h2>
              <p className="text-gray-600">
                In cases of emergencies or special circumstances beyond your control, please contact our customer support team with relevant documentation. Such requests will be reviewed on a case-by-case basis, and we will try our best to accommodate reasonable requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to Refund Policy</h2>
              <p className="text-gray-600">
                CineTix reserves the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. It is your responsibility to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about our Refund Policy, please contact our customer support team at:
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

export default Refund;
