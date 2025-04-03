
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-cinema-blue">Frequently Asked Questions</h1>
          
          <Card className="p-6 mb-8">
            <p className="mb-4">
              Find answers to the most common questions about CineTix services, bookings, and policies.
            </p>
          </Card>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium">How do I book movie tickets online?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                <p>Booking movie tickets on CineTix is easy:</p>
                <ol className="list-decimal pl-5 space-y-2 mt-2">
                  <li>Browse available movies on our homepage</li>
                  <li>Select your preferred movie and showtime</li>
                  <li>Choose your seats from the seating chart</li>
                  <li>Complete payment using your preferred payment method</li>
                  <li>Receive your e-tickets via email</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium">Can I cancel or change my booking?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Yes, you can cancel or modify your booking up to 2 hours before the showtime. Please note that a cancellation fee may apply. To cancel or change your booking, log into your account, go to your bookings, and select the booking you wish to modify.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium">How do I retrieve my tickets?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                After completing your booking, e-tickets will be sent to your registered email address. You can either print these tickets or show the QR code on your mobile device at the theater entrance. Additionally, you can access all your tickets from your account dashboard.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium">Is there a fee for online booking?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Yes, a small convenience fee is added to online bookings to cover transaction costs. The exact fee amount will be displayed during the checkout process before you complete your payment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium">Do you offer discounts or loyalty programs?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Yes! CineTix offers a loyalty program that rewards frequent moviegoers. For every 10 tickets purchased, you earn one free ticket. We also offer special discounts for students, seniors, and military personnel. Check our promotions section for current offers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium">How can I contact customer support?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Our customer support team is available 24/7. You can reach us through:
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Email: soubhagyadhal12345@gmail.com</li>
                  <li>Phone: 9437284825</li>
                  <li>Address: VIT-AP University, Amaravati, Andhra Pradesh, India</li>
                  <li>Live chat on our website (bottom right corner)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
