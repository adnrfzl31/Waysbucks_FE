import "bootstrap/dist/css/bootstrap.min.css"
import "../../assets/css/navbar/navbar.css"
import React, { useEffect, useState } from "react"
import { Badge, Nav, OverlayTrigger, Popover, Stack } from "react-bootstrap"
import AddProduct from "../../assets/image/AddProduct.png"
import AddToping from "../../assets/image/AddToping.png"
import Basket from "../../assets/image/Basket.png"
import Logout from "../../assets/image/Logout.png"
import User from "../../assets/image/User.png"

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

function NavbarLogin({ state, order, Profile, logout }) {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth)
    })
  }, [width])

  return (
    <>
      {width >= 992 ? (
        <>
          {state.user.role === "admin" ? (
            // Navbar Admin
            <DropdownAdmin Profile={Profile} logout={logout} />
          ) : (
            // Navbar User
            <Stack direction="horizontal">
              <Nav.Link href="/Carts" className="position-relative m-3">
                <img
                  alt=""
                  src={Basket}
                  width="35"
                  height="30"
                  className="d-inline-block align-top"
                />
                {order?.length >= 1 && (
                  <Badge className="position-absolute translate-middle badge-position rounded-pill bg-danger p-1   border border-light rounded-circle">
                    {order?.length}
                  </Badge>
                )}
              </Nav.Link>
              <DropdownUser Profile={Profile} logout={logout} />
            </Stack>
          )}
        </>
      ) : (
        <>
          {state.user.role === "admin" ? (
            // Navbar Admin
            <Stack direction="vertical">
              <Nav.Link href="/Profile">
                <Stack direction="horizontal">
                  <div className="position-relative m-3 ">
                    <img
                      alt=""
                      src={User}
                      width="35"
                      height="30"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <h3 className="m-0">Profile</h3>
                  </div>
                </Stack>
              </Nav.Link>
              <hr className="m-2" />
              <Nav.Link href="/AddProduct">
                <Stack direction="horizontal">
                  <div className="position-relative m-3 ">
                    <img
                      alt=""
                      src={AddProduct}
                      width="35"
                      height="30"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <h3 className="m-0">Add Product</h3>
                  </div>
                </Stack>
              </Nav.Link>
              <hr />
              <Nav.Link href="/AddToping">
                <Stack direction="horizontal">
                  <div className="position-relative m-3 ">
                    <img
                      alt=""
                      src={AddToping}
                      width="35"
                      height="30"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <h3 className="m-0">Add Toping</h3>
                  </div>
                </Stack>
              </Nav.Link>
              <hr />
              <Nav.Link href="/ProductAdmin">
                <Stack direction="horizontal">
                  <div className="position-relative m-3 ">
                    <img
                      alt=""
                      src={AddProduct}
                      width="35"
                      height="30"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <h3 className="m-0">Product Admin</h3>
                  </div>
                </Stack>
              </Nav.Link>
              <hr />
              <Nav.Link href="/TopingAdmin">
                <Stack direction="horizontal">
                  <div className="position-relative m-3 ">
                    <img
                      alt=""
                      src={AddToping}
                      width="35"
                      height="30"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <h3 className="m-0">Toping Admin</h3>
                  </div>
                </Stack>
              </Nav.Link>
              <hr />
              <Nav.Link onClick={logout}>
                <Stack direction="horizontal">
                  <div className="position-relative m-3 ">
                    <img
                      alt=""
                      src={Logout}
                      width="35"
                      height="30"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <h3 className="m-0">Logout</h3>
                  </div>
                </Stack>
              </Nav.Link>
            </Stack>
          ) : (
            // Navbar User
            <Stack direction="vertical">
              <Nav.Link href="/Carts">
                <Stack direction="horizontal">
                  <div className="position-relative m-3 ">
                    <img
                      alt=""
                      src={Basket}
                      width="35"
                      height="30"
                      className="d-inline-block align-top"
                    />
                    {order?.length >= 1 && (
                      <Badge className="position-absolute translate-middle badge-position rounded-pill bg-danger p-1   border border-light rounded-circle">
                        {order?.length}
                      </Badge>
                    )}
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <h3 className="m-0">Cart</h3>
                  </div>
                </Stack>
              </Nav.Link>
              <hr className="m-2" />
              <Nav.Link href="/Profile">
                <Stack direction="horizontal">
                  <div href="/Profile" className="position-relative m-3 ">
                    <img
                      alt=""
                      src={User}
                      width="35"
                      height="30"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <h3 className="m-0">Profile</h3>
                  </div>
                </Stack>
              </Nav.Link>
              <hr />
              <Nav.Link onClick={logout}>
                <Stack direction="horizontal">
                  <div className="position-relative m-3 ">
                    <img
                      alt=""
                      src={Logout}
                      width="35"
                      height="30"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <h3 className="m-0">Logout</h3>
                  </div>
                </Stack>
              </Nav.Link>
            </Stack>
          )}
        </>
      )}
    </>
  )
}

export default NavbarLogin
