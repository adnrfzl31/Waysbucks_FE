import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap"
import Logo from "../../assets/image/Logo2.png"
import Barcode from "../../assets/image/Barcode.png"
import Products from "../../assets/image/Product1.png"
// import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

const style = {
  cardContainer: {},

  card: {},

  img: {},

  cardBody: {
    width: "70%",
  },

  col: {},

  cardTitle: {},

  titleToping: {},

  textToping: {},

  textColor: {},

  date: {},

  price: {},

  imgLogo: {
    // position: "absolute",
    // top: "8%",
    // left: "85%",
    // justifyContent: "center"
  },

  imgBarcode: {
    // position: "absolute",
    // top: "40%",
    // left: "83%",
  },
}

function Transaction() {
  return (
    <Container className="my-5">
      <Card
        style={{
          width: "100%",
          height: "500px",
          position: "relative",
          backgroundColor: "#F6DADA",
          border: "white",
        }}
      >
        <Row className="m-3">
          <Col xs={10} style={{ width: "80%" }} className="m-2">
            <Card.Body>
              <Card.Body
                className="m-3"
                style={{
                  width: "100%",
                  height: "200px",
                  position: "relative",
                  backgroundColor: "#F6DADA",
                  border: "white",
                }}
              >
                <Row>
                  <Card.Img
                    src={Products}
                    style={{ width: "20%", height: "auto" }}
                  />
                  <Card.Body className="p-1" style={{ width: "70%" }}>
                    <Col className="m-1" style={{ width: "90%" }}>
                      <Card.Title
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                          color: "#BD0707",
                        }}
                      >
                        Ice Coffe Palm Sugar
                      </Card.Title>
                      <Card.Text
                        className="mb-4"
                        style={{
                          fontSize: "13px",
                          fontWeight: "400",
                          color: "#BD0707",
                        }}
                      >
                        Saturday, 5 March 2020
                      </Card.Text>
                      <Card.Text
                        className="m-0"
                        style={{
                          fontSize: "15px",
                          color: "#974A4A",
                          display: "flex",
                        }}
                      >
                        <p style={{ color: "#974A4A", fontWeight: "bold" }}>
                          Toping :{" "}
                        </p>
                        <p style={{ color: "#BD0707" }} className="ms-1">
                          Bill Berry Boba, Bubble Tea Gelatin
                        </p>
                      </Card.Text>
                      <Card.Text style={{ color: "#974A4A" }}>
                        Price : Rp.36.000
                      </Card.Text>
                    </Col>
                  </Card.Body>
                </Row>
              </Card.Body>

              <Card.Body
                className="m-3"
                style={{
                  width: "100%",
                  height: "200px",
                  position: "relative",
                  backgroundColor: "#F6DADA",
                  border: "white",
                }}
              >
                <Row>
                  <Card.Img
                    src={Products}
                    style={{ width: "20%", height: "auto" }}
                  />
                  <Card.Body className="p-1" style={{ width: "70%" }}>
                    <Col className="m-1" style={{ width: "90%" }}>
                      <Card.Title
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                          color: "#BD0707",
                        }}
                      >
                        Ice Coffe Palm Sugar
                      </Card.Title>
                      <Card.Text
                        className="mb-4"
                        style={{
                          fontSize: "13px",
                          fontWeight: "400",
                          color: "#BD0707",
                        }}
                      >
                        Saturday, 5 March 2020
                      </Card.Text>
                      <Card.Text
                        className="m-0"
                        style={{
                          fontSize: "15px",
                          color: "#974A4A",
                          display: "flex",
                        }}
                      >
                        <p style={{ color: "#974A4A", fontWeight: "bold" }}>
                          Toping :{" "}
                        </p>
                        <p style={{ color: "#BD0707" }} className="ms-1">
                          Bill Berry Boba, Bubble Tea Gelatin
                        </p>
                      </Card.Text>
                      <Card.Text style={{ color: "#974A4A" }}>
                        Price : Rp.36.000
                      </Card.Text>
                    </Col>
                  </Card.Body>
                </Row>
              </Card.Body>
            </Card.Body>
          </Col>
          <Col style={{ width: "20%" }}>
            <Card.Body className="mt-3">
              <Stack className="gap-3 m-1">
                <Card.Img
                  className="ms-4"
                  src={Logo}
                  style={{ width: "100px", height: "auto" }}
                />
                <Card.Img
                  className="mt-3"
                  src={Barcode}
                  style={{ width: "125px", height: "auto" }}
                />
                <Button
                  style={{ border: "white", backgroundColor: "#FF9900" }}
                  className="mt-4 w-100 p-2"
                  disabled
                >
                  Waiting Approve
                </Button>
                <Card.Text
                  style={{ color: "#974A4A", fontWeight: "bold" }}
                  className="mb-4"
                >
                  Sub Total : 69.000
                </Card.Text>
              </Stack>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default Transaction
