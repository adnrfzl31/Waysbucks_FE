// import { Nav } from "react-bootstrap"
// import OverlayTrigger from "react-bootstrap/OverlayTrigger"
// import Popover from "react-bootstrap/Popover"
// import Logout from "../assets/image/Logout.png"
// import User from "../assets/image/User.png"

// // const userSkrng = JSON.parse(localStorage.getItem("VALUE_LOGIN"))

// // const image = []
// // const idUser = userSkrng[0].id
// // for (let index = 0; index < LoginDataUser.length; index++) {
// //   if (LoginDataUser[index].id === idUser) {
// //     image.push(LoginDataUser[index].imgProfil)
// //   }
// // }

// const LoginDataUser = JSON.parse(localStorage.getItem("DATA_USER"))
// const logout = () => {
//   localStorage.removeItem("VALUE_LOGIN")
//   window.location.reload()
// }

// const popover = (
//   <Popover id="popover-basic">
//     <Popover.Body>
//       <Nav.Link
//         href="/Profile"
//         style={{ fontWeight: "600", fontSize: "17px", alignItems: "center" }}
//       >
//         <img alt="" src={User} style={{ width: "30px", marginRight: "15px" }} />
//         Profile
//       </Nav.Link>
//     </Popover.Body>
//     <hr />
//     <Popover.Body>
//       <Nav.Link
//         onClick={logout}
//         style={{ fontWeight: "600", fontSize: "17px", alignItems: "center" }}
//       >
//         <img
//           alt=""
//           src={Logout}
//           style={{ width: "30px", marginRight: "15px" }}
//         />
//         Logout
//       </Nav.Link>
//     </Popover.Body>
//   </Popover>
// )

// const DropdownUser = () => (
//   <OverlayTrigger
//     trigger="click"
//     placement="bottom-end"
//     overlay={
//       <Popover id="popover-basic">
//         <Popover.Body>
//           <Nav.Link
//             href="/Profile"
//             style={{
//               fontWeight: "600",
//               fontSize: "17px",
//               alignItems: "center",
//             }}
//           >
//             <img
//               alt=""
//               src={User}
//               style={{ width: "30px", marginRight: "15px" }}
//             />{" "}
//             Profile
//           </Nav.Link>
//         </Popover.Body>
//         <hr />
//         <Popover.Body>
//           <Nav.Link
//             onClick={logout}
//             style={{
//               fontWeight: "600",
//               fontSize: "17px",
//               alignItems: "center",
//             }}
//           >
//             <img
//               alt=""
//               src={Logout}
//               style={{ width: "30px", marginRight: "15px" }}
//             />{" "}
//             Logout
//           </Nav.Link>
//         </Popover.Body>
//       </Popover>
//     }
//     style={{
//       width: "70px",
//       heigth: "70px",
//     }}
//   >
//     <img
//       alt=""
//       src={LoginDataUser[0].imgProfil}
//       className="d-inline-block align-top btn p-0 m-auto"
//       style={{
//         width: "60px",
//         height: "60px",
//         borderRadius: "50%",
//         objectFit: "cover",
//         border: "2px solid #bd0707",
//       }}
//     />
//   </OverlayTrigger>
// )

// export default DropdownUser
