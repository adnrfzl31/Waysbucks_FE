import { Nav } from "react-bootstrap"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Popover from "react-bootstrap/Popover"
import AddProduct from "../assets/image/AddProduct.png"
import AddToping from "../assets/image/AddToping.png"
import Logout from "../assets/image/Logout.png"

const LoginDataUser = JSON.parse(localStorage.getItem("DATA_USER"))

const logout = () => {
  localStorage.removeItem("VALUE_LOGIN")
  window.location.reload()
}

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>
      <Nav.Link
        href="/AddProduct"
        className="mt-2"
        style={{ fontWeight: "600", fontSize: "17px", alignItems: "center" }}
      >
        <img
          alt=""
          src={AddProduct}
          style={{ width: "30px", marginRight: "15px" }}
        />
        Add Product
      </Nav.Link>
      <Nav.Link
        href="/AddToping"
        className="mt-4"
        style={{ fontWeight: "600", fontSize: "17px", alignItems: "center" }}
      >
        <img
          alt=""
          src={AddToping}
          style={{ width: "30px", marginRight: "15px" }}
        />{" "}
        Add Toping
      </Nav.Link>
    </Popover.Body>
    <hr />
    <Popover.Body>
      <Nav.Link
        style={{ fontWeight: "600", fontSize: "17px", alignItems: "center" }}
        onClick={logout}
      >
        <img
          alt=""
          src={Logout}
          style={{ width: "30px", marginRight: "15px" }}
        />{" "}
        Logout
      </Nav.Link>
    </Popover.Body>
  </Popover>
)

const DropdownAdmin = () => (
  <OverlayTrigger trigger="click" placement="bottom-end" overlay={popover}>
    <img
      alt=""
      src={LoginDataUser[0].imgProfil}
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

export default DropdownAdmin
