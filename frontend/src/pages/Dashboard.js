import React from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-lg">
        <h1>Welcome to Document Management System</h1>
        <p>Upload, manage, and search documents with ease.</p>
      </Card>
    </Container>
  );
};

export default Dashboard;
