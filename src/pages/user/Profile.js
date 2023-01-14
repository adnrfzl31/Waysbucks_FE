import React, { useContext, useState } from "react"
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import Barcode from "../../assets/image/Barcode.png"
import Logo1 from "../../assets/image/Logo1.png"
import Product1 from "../../assets/image/Product1.png"
import Profil2 from "../../assets/image/Profil2.png"
import { UserContext } from "../../context/UserContext"
import { API } from "../../confiq/api"
import { useQuery } from "react-query"
import HistoryOrder from "../../component/profile/historytransaksi"
import ModalProfile from "../../component/modal/UpdateProfile"

function Profile() {
  const [state] = useContext(UserContext)

  let { data: Profile, refetch } = useQuery("ProfileCache", async () => {
    const response = await API.get("/user")
    return response.data.data
  })
  const [profileShow, setProfileShow] = useState(false)
  const handleCloseProfile = () => setProfileShow(false)
  const handleShowProfile = () => setProfileShow(true)

  return (
    <Container className="mb-5">
      <div className=" d-flex justify-content-center my-5">
        <Row style={{ width: "95%" }}>
          <Card border="white" style={{ width: "50%" }}>
            <h1
              className="fw-bold"
              style={{
                color: "#BD0707",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              My Profile
            </h1>
            <Row>
              <Col>
                <Card.Img
                  alt=""
                  className="w-100"
                  style={{ height: "300px" }}
                  src={Profile?.image}
                />
                <Button
                  onClick={handleShowProfile}
                  variant="danger"
                  className="w-100 mt-5"
                >
                  Edit Profile
                </Button>
              </Col>
              <Col>
                <Card.Body className="ps-0">
                  <Card.Title>Full Name</Card.Title>
                  <Card.Text>{Profile?.fullname}</Card.Text>
                  <Card.Title>Email</Card.Title>
                  <Card.Text>{Profile?.email}</Card.Text>
                  <Card.Title>Phone</Card.Title>
                  <Card.Text>
                    {Profile?.phone === "" ? "-" : Profile?.phone}
                  </Card.Text>
                  <Card.Title>Address</Card.Title>
                  <Card.Text>
                    {Profile?.address === "" ? "-" : Profile?.address}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          {state.user.role === "admin" ? <></> : <HistoryOrder />}

          <ModalProfile
            show={profileShow}
            onHide={handleCloseProfile}
            setProfileShow={setProfileShow}
          />
        </Row>
      </div>
    </Container>
  )
}

export default Profile
