
import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Define styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  qrSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 10,
  },
  qrPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#f3f4f6",
    margin: "0 auto",
    textAlign: "center",
    lineHeight: 120,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  column: {
    flexDirection: "column",
    marginRight: 20,
  },
  label: {
    fontSize: 10,
    marginBottom: 2,
    color: "#6b7280",
  },
  value: {
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#6b7280",
  },
});

interface TicketData {
  id: string;
  movieTitle: string;
  date: string;
  time: string;
  cinema: string;
  seats: string[];
  totalAmount: number;
}

const TicketDocument = ({ ticket }: { ticket: TicketData }) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Movie Ticket</Text>
        <Text>BookMyShow</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>{ticket.movieTitle}</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{new Date(ticket.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{ticket.time}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Cinema</Text>
            <Text style={styles.value}>{ticket.cinema}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Seats</Text>
            <Text style={styles.value}>{ticket.seats.join(", ")}</Text>
          </View>
        </View>
      </View>

      <View style={styles.qrSection}>
        <View style={styles.qrPlaceholder}>
          <Text>QR Code</Text>
        </View>
        <Text style={{ textAlign: "center", marginTop: 10 }}>Booking ID: {ticket.id}</Text>
      </View>

      <View style={styles.footer}>
        <Text>Please show this ticket at the entrance.</Text>
        <Text>Thank you for choosing BookMyShow!</Text>
      </View>
    </Page>
  </Document>
);

interface TicketPDFButtonProps {
  ticket: TicketData;
  variant?: "outline" | "destructive" | "default" | "ghost" | "link" | "secondary" | null | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  className?: string;
}

const TicketPDFButton = ({ ticket, variant = "outline", size = "sm", className }: TicketPDFButtonProps) => {
  return (
    <PDFDownloadLink
      document={<TicketDocument ticket={ticket} />}
      fileName={`ticket-${ticket.id}.pdf`}
      style={{ textDecoration: "none" }}
    >
      {({ loading }) => (
        <Button variant={variant} size={size} className={className} disabled={loading}>
          <Download className="h-4 w-4 mr-2" />
          {loading ? "Generating..." : "Download Ticket"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default TicketPDFButton;
