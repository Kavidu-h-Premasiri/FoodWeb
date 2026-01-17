import React, { useState } from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import "../css/Contact.css";
import NavigationBar from "../components/NavigationBar.jsx";

function Contact() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div>
      <NavigationBar />

      <Container className="contact-page mt-4">

        {/* TOP SECTION */}
        <Row className="mb-4">

          {/* LEFT - ABOUT */}
          <Col md={6}>
            <Card className="p-3 shadow-sm">
              <h3>About Me</h3>
              <p>
                Hi, I'm Kavindu. Fresh, delicious food made with quality ingredients.
                Order your favorite meals anytime.
              </p>

              <h5>Workshop Details</h5>
              <p><strong>Name:</strong> KaviFood</p>
              <p><strong>Address:</strong> No 27, Wariyapola, Puththalam Road</p>

              {/* CLICK TO COPY PHONE */}
              <p>
                <strong>Contact:</strong>{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    copyToClipboard("+94729852612", "phone")
                  }
                >
                  +94 72 985 2612
                </span>
                {copied === "phone" && (
                  <small className="text-success ms-2">Copied!</small>
                )}
              </p>

              {/* CLICK TO COPY EMAIL */}
              <p>
                <strong>Email:</strong>{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    copyToClipboard("kavidupremasiri272@gmail.com", "email")
                  }
                >
                  kavidupremasiri272@gmail.com
                </span>
                {copied === "email" && (
                  <small className="text-success ms-2">Copied!</small>
                )}
              </p>
            </Card>
          </Col>

        </Row>

        {/* BOTTOM SECTION */}
        <Row>
          <Col>
            <Card className="p-3 shadow-sm">
              <h3 className="mb-3">Workshop Information</h3>

              <Accordion defaultActiveKey="0">

                <Accordion.Item eventKey="0">
                  <Accordion.Header>Opening Days</Accordion.Header>
                  <Accordion.Body>
                    Monday to Saturday
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Closing Days</Accordion.Header>
                  <Accordion.Body>
                    Sunday & Public Holidays
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Opening Time</Accordion.Header>
                  <Accordion.Body>
                    8:30 AM - 6:00 PM
                  </Accordion.Body>
                </Accordion.Item>

              </Accordion>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default Contact;
