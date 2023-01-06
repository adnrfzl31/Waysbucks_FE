// dependencies
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Alert, Card, CardImg, Col, Modal, Row, Stack } from "react-bootstrap"
// import Rupiah from "rupiah-format"
import { API } from "../../confiq/api"
// logo
import Logo from "../../assets/image/Logo2.png"
import CardHeader from "react-bootstrap/esm/CardHeader"

export default function ModalTransaction({
  showTrans,
  closeTrans,
  TransUser,
  formatIDR,
}) {
  // const formatIDR = new Intl.NumberFormat(undefined, {
  //   style: "currency",
  //   currency: "IDR",
  //   maximumFractionDigits: 0,
  // })

  // const [transaction, serTransaction] = useState([])

  // useEffect(() => {
  //   API.get("/transaction/" + id)
  //     .then((res) => {
  //       serTransaction(res.data.data)
  //     })
  //     .catch((err) => console.log("error", err))
  // })

  return (
    <Modal
      show={showTrans}
      onHide={closeTrans}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* {TransUser?.map((TransUser) => ( */}
      <Modal.Body>
        <Card>
          <Card.Body
            // key={TransUser?.id}
            // onClick={handleShow}
            style={{
              background: "#F6DADA",
              borderRadius: "5px",
            }}
          >
            <Row>
              <Col sm={9} gap={3}>
                {TransUser.order?.map((order) => (
                  <Card
                    key={order?.id}
                    style={{ background: "#F6DADA", border: "0" }}
                  >
                    <Stack direction="horizontal">
                      <CardImg
                        variant="left"
                        src={order.product.image}
                        style={{ width: "100px" }}
                      />
                      <Card.Body>
                        <Card.Title
                          style={{
                            fontSize: "14pt",
                            fontWeight: "Bold",
                            color: "#BD0707",
                          }}
                        >
                          {order.product.nameproduct}
                        </Card.Title>
                        <Card.Subtitle
                          style={{ fontSize: "10pt", color: "#BD0707" }}
                        >
                          <b>Monday</b>, 5 December 2022
                        </Card.Subtitle>
                        <Card.Text
                          style={{
                            fontSize: "9pt",
                            color: "#BD0707",
                            margin: "0px",
                            marginTop: "20px",
                          }}
                        >
                          <b style={{ color: "#974A4A" }}>Toping</b>:
                          {order.topping?.map((topping) => (
                            <>{topping.nametopping},</>
                          ))}
                        </Card.Text>
                        <Card.Subtitle
                          style={{
                            color: "#974A4A",
                            fontSize: "11pt",
                            margin: "0px",
                            lineHeight: "2",
                          }}
                        >
                          Price : {formatIDR.format(order.total)}
                        </Card.Subtitle>
                      </Card.Body>
                    </Stack>
                  </Card>
                ))}
              </Col>
              <Col sm={3}>
                <Stack>
                  <Card style={{ background: "none", border: 0 }}>
                    <CardHeader
                      className="d-flex justify-content-center"
                      style={{ background: "none", border: "0" }}
                    >
                      <CardImg src={Logo} style={{ width: "90%" }} />
                    </CardHeader>
                    <Card.Body style={{ padding: 0, marginTop: "20px" }}>
                      <CardImg src="https://www.pngmart.com/files/22/QR-Code-Transparent-Isolated-Background.png" />
                      {TransUser.status === "Payment" ? (
                        <Alert
                          key="warning"
                          variant="warning"
                          style={{
                            fontSize: "8pt",
                            marginTop: "15px",
                            textAlign: "center",
                            padding: 5,
                          }}
                        >
                          Waiting
                        </Alert>
                      ) : TransUser.status === "Success" ? (
                        <Alert
                          key="success"
                          variant="success"
                          style={{
                            fontSize: "8pt",
                            marginTop: "15px",
                            textAlign: "center",
                            padding: 5,
                          }}
                        >
                          Success
                        </Alert>
                      ) : TransUser.status === "Cancel" ? (
                        <Alert
                          key="danger"
                          variant="danger"
                          style={{
                            background: "#B71C1C",
                            color: "#fff",
                            fontSize: "8pt",
                            marginTop: "15px",
                            textAlign: "center",
                            padding: 5,
                          }}
                        >
                          Cancel
                        </Alert>
                      ) : null}
                      <Card.Title
                        className="my-2"
                        style={{
                          fontSize: "9pt",
                          textAlign: "center",
                          fontWeight: "900",
                          color: "#974A4A",
                        }}
                      >
                        Total : {formatIDR.format(TransUser.total)}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Stack>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      {/* ))} */}
    </Modal>
  )
}

// <div className="profileCard">
//   <div className="contentCardLeft">
//     {transaction?.carts?.map((item, index) => (
//       <div className="mapContent" key={index}>
//         <img
//           src={"http://localhost:5000/uploads/" + item.product.image}
//           alt="coffee"
//         />
//         <ul>
//           <li className="profileCardTitle">{item.title}</li>
//           <li className="profileCardDate">
//             <strong>Monday</strong>,5 December 2022
//           </li>
//           <li className="profileCardToping">
//             <strong className="inline">
//               Toping :{" "}
//               {item.topping.map((topping, idx) => (
//                 <span key={idx}>{topping.title},</span>
//               ))}
//             </strong>
//           </li>
//           <li className="profileCardPrice">
//             Price: {formatIDR(item?.subtotal)}
//           </li>
//         </ul>
//       </div>
//     ))}
//   </div>
//   <div
//     className={
//       transaction?.status === "Success"
//         ? "contentCardRight Success"
//         : transaction?.status === "Cancel"
//         ? "contentCardRight Cancel"
//         : "contentCardRight Otw"
//     }
//   >
//     <img src={Logo} alt="logo" />
//     <CardImg src="https://www.pngmart.com/files/22/QR-Code-Transparent-Isolated-Background.png" />
//     <span>
//       <p>{transaction?.status}</p>
//     </span>
//     <p className="profileSubTotal">
//       Sub Total : {Rupiah.convert(transaction?.total)}
//     </p>
//   </div>
// </div>
