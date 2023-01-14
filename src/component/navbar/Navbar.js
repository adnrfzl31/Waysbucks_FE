import "bootstrap/dist/css/bootstrap.min.css"
import "../../assets/css/navbar/navbar.css"
import React, { useContext, useEffect, useState } from "react"
import {
  Button,
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
  Stack,
  Badge,
  Offcanvas,
  Image,
} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"
import AddProduct from "../../assets/image/AddProduct.png"
import AddToping from "../../assets/image/AddToping.png"
import Basket from "../../assets/image/Basket.png"
import Profil from "../../assets/image/Profil1.png"
import IconLogo from "../../assets/image/Logo1.png"
import Logout from "../../assets/image/Logout.png"
import User from "../../assets/image/User.png"
import Login from "../auth/Login.js"
import Register from "../auth/Register.js"
import NavbarLogin from "./NavbarLogin"

function DropdownUser({ Profile, logout }) {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom-end"
      overlay={
        <Popover id="popover-basic">
          <Popover.Body>
            <Nav.Link href="/Profile" className="popover.body popover.body">
              <img alt="" src={User} className="icon-img" />
              Profile
            </Nav.Link>
          </Popover.Body>
          <hr />
          <Popover.Body>
            <Nav.Link onClick={logout} className="popover.body popover.body">
              <img alt="" src={Logout} className="icon-img" /> Logout
            </Nav.Link>
          </Popover.Body>
        </Popover>
      }
      style={{
        width: "70px",
        heigth: "70px",
      }}
    >
      <img
        alt=""
        src={Profile?.image}
        className="d-inline-block align-top btn p-0 m-auto"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #bd0707",
        }}
      />
    </OverlayTrigger>
  )
}

function DropdownAdmin({ Profile, logout }) {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom-end"
      overlay={
        <Popover id="popover-basic">
          <Popover.Body>
            <Nav.Link href="/Profile" className="popover.body mt-2">
              <img alt="" src={User} className="icon-img" />
              Profile
            </Nav.Link>
            <Nav.Link href="/AddProduct" className="popover.body mt-4">
              <img alt="" src={AddProduct} className="icon-img" />
              Add Product
            </Nav.Link>
            <Nav.Link href="/AddToping" className="popover.body mt-4">
              <img alt="" src={AddToping} className="icon-img" /> Add Toping
            </Nav.Link>
            <Nav.Link href="/ProductAdmin" className="popover.body mt-4">
              <img alt="" src={AddProduct} className="icon-img" /> Product List
            </Nav.Link>
            <Nav.Link href="/TopingAdmin" className="popover.body mt-4">
              <img alt="" src={AddToping} className="icon-img" /> Toping List
            </Nav.Link>
          </Popover.Body>
          <hr />
          <Popover.Body>
            <Nav.Link className="popover.body" onClick={logout}>
              <img alt="" src={Logout} className="icon-img" /> Logout
            </Nav.Link>
          </Popover.Body>
        </Popover>
      }
    >
      <img
        alt=""
        src={Profile?.image}
        className="d-inline-block align-top btn p-0 m-auto "
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #bd0707",
        }}
      />
    </OverlayTrigger>
  )
}

function Navs() {
  const [state, dispatch] = useContext(UserContext)
  const [showCanvas, setShowCanvas] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const { data: order, refetch: orderRefetch } = useQuery(
    "ordersCache",
    async () => {
      const response = await API.get("/orders-id")
      return response.data.data
    }
  )

  let { data: Profile, refetch: profileRefetch } = useQuery(
    "ProfileCache",
    async () => {
      const response = await API.get("/user")
      return response.data.data
    }
  )

  let navigate = useNavigate()

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    })
    navigate("/")
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image
            alt=""
            src={IconLogo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar-expand-lg"
          onClick={() => setShowCanvas(true)}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
          show={showCanvas}
          onHide={() => setShowCanvas(false)}
          className="offcanvas-nav"
        >
          <Offcanvas.Header className="fw-bold justify-content-center">
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              <Image src={IconLogo} className="img-fluid" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="justify-content-end">
            {state.isLogin === false ? (
              <Nav className="gap-3 justify-content-end">
                <Button
                  className="btn btn-navbar col-12"
                  size="sm"
                  variant="outline-danger"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
                <Button
                  className="btn btn-navbar col-12 "
                  size="sm"
                  variant="danger"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>

                <Login
                  show={showLogin}
                  onHide={() => setShowLogin(false)}
                  orderRefetch={orderRefetch}
                  profileRefetch={profileRefetch}
                  setShowLogin={setShowLogin}
                  setShowRegister={setShowRegister}
                />
                <Register
                  show={showRegister}
                  onHide={() => setShowRegister(false)}
                  setShowLogin={setShowLogin}
                  setShowRegister={setShowRegister}
                />
              </Nav>
            ) : (
              <NavbarLogin
                state={state}
                order={order}
                Profile={Profile}
                logout={logout}
              />
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Navs
