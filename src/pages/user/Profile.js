import React, { useContext } from "react"
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import Barcode from "../../assets/image/Barcode.png"
import Logo1 from "../../assets/image/Logo1.png"
import Product1 from "../../assets/image/Product1.png"
import Profil2 from "../../assets/image/Profil2.png"
import { UserContext } from "../../context/UserContext"
import { API } from "../../confiq/api"
import { useQuery } from "react-query"
import HistoryOrder from "./historytransaksi"

function Profile() {
  // const DataLogin = JSON.parse(localStorage.getItem("VALUE_LOGIN"))

  const [state] = useContext(UserContext)
  //console.log("Profile user : ", state)

  let { data: Profile, refetch } = useQuery("ProfileCache", async () => {
    const response = await API.get("/user/" + state.user.id)
    return response.data.data
  })
  //console.log("data PROFILE: ", Profile)

  return (
    <Container className="mb-5">
      <Row className="justify-content-center my-5 gap-5">
        <Card border="white" style={{ width: "40%" }}>
          <h1
            className="fw-bold"
            style={{ color: "#BD0707", fontSize: "24px", marginBottom: "20px" }}
          >
            My Profile
          </h1>
          <Row>
            <Card.Img
              alt=""
              style={{ width: "250px", height: "280px" }}
              src={Profile?.image}
            />
            <Col>
              <Card.Body>
                <Card.Title>Full Name</Card.Title>
                <Card.Text>{Profile?.fullname}</Card.Text>
                <Card.Title>Email</Card.Title>
                <Card.Text>{Profile?.email}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>

        <HistoryOrder />

        {/* <Card border="white" style={{ width: "50%" }}>
          <h1
            className="fw-bold"
            style={{ color: "#BD0707", fontSize: "24px", marginBottom: "20px" }}
          >
            My Transaction
          </h1>
          <Row>
            <Card
              border="white"
              style={{ backgroundColor: "#F7DADA", width: "100%" }}
            >
              <Stack className="ms-3" direction="horizontal" gap={1}>
                <Card.Img
                  alt=""
                  style={{ width: "80px", height: "90px" }}
                  src={Product1}
                />
                <Col>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Title
                          className="fw-bold"
                          style={{
                            fontSize: "14px",
                            color: "#BD0707",
                            marginTop: "15px",
                          }}
                        >
                          Ice Coffee Palm Sugar
                        </Card.Title>
                        <p style={{ fontSize: "10px", color: "#BD0707" }}>
                          <strong>Saturday, </strong>5 March 2020
                        </p>
                        <p style={{ fontSize: "10px", color: "#BD0707" }}>
                          <strong style={{ color: "#974A4A" }}>
                            Toping :{" "}
                          </strong>
                          Bill Berry Boba, Bubble Tea Gelatin
                        </p>
                        <p style={{ fontSize: "10px", color: "#974A4A" }}>
                          Price : Rp.33.000
                        </p>
                      </Col>
                      <img
                        alt=""
                        src={Logo1}
                        style={{
                          width: "20%",
                          height: "20%",
                        }}
                      />
                    </Row>
                  </Card.Body>
                </Col>
              </Stack>

              <Stack className="ms-3" direction="horizontal" gap={1}>
                <Card.Img
                  alt=""
                  style={{
                    width: "80px",
                    height: "90px",
                    marginBottom: "60px",
                  }}
                  src={Product1}
                />
                <Col>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Title
                          className="fw-bold"
                          style={{ fontSize: "14px", color: "#BD0707" }}
                        >
                          Ice Coffee Palm Sugar
                        </Card.Title>
                        <p style={{ fontSize: "10px", color: "#BD0707" }}>
                          <strong>Saturday,</strong> 5 March 2020
                        </p>
                        <p style={{ fontSize: "10px", color: "#BD0707" }}>
                          <strong style={{ color: "#974A4A" }}>
                            Toping :{" "}
                          </strong>
                          Bill Berry Boba, Manggo
                        </p>
                        <p style={{ fontSize: "10px", color: "#974A4A" }}>
                          Price : Rp.33.000
                        </p>
                      </Col>
                      <img
                        alt=""
                        src={Barcode}
                        style={{
                          width: "22%",
                          position: "absolute",
                          top: "100px",
                          left: "75%",
                        }}
                      />
                      <div>
                        <Button
                          style={{
                            border: "white",
                            backgroundColor: "#00D1FF",
                            position: "absolute",
                            top: "230px",
                            left: "77%",
                          }}
                          className="mt-4 w-10"
                          size="sm"
                          disabled
                        >
                          On The Ways
                        </Button>
                      </div>
                      <p
                        className="fw-bold pe-3 d-flex justify-content-end"
                        style={{
                          fontSize: "10px",
                          // paddingLeft: "805",
                          color: "#BD0707",
                        }}
                      >
                        Sub Total : 69.000
                      </p>
                    </Row>
                  </Card.Body>
                </Col>
              </Stack>
            </Card>
          </Row>
        </Card> */}
      </Row>
    </Container>
  )
}

export default Profile
