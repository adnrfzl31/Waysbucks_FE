// dependencies
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Alert, Card, CardImg, Col, Modal, Row, Stack } from "react-bootstrap"
import { API } from "../../confiq/api"
import Logo from "../../assets/image/Logo2.png"
import CardHeader from "react-bootstrap/esm/CardHeader"

export default function ModalTransaction({
  showTrans,
  closeTrans,
  TransUser,
  formatIDR,
}) {

  return (
    <Modal
      show={showTrans}
      onHide={closeTrans}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Card>
          <Card.Body
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
                      {TransUser.status === "pending" ? (
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
                      ) : TransUser.status === "success" ? (
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
                      ) : TransUser.status === "cancel" ? (
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
