import React from "react"
import {
  Alert,
  Card,
  CardGroup,
  CardImg,
  Col,
  Row,
  Stack,
} from "react-bootstrap"
import CardHeader from "react-bootstrap/esm/CardHeader"
import { useQuery } from "react-query"
import { API } from "../../confiq/api"
import Logo from "../../assets/image/Logo2.png"
// import Image1 from "../assets/image/produk1.png"

function HistoryOrder() {
  let { data: TransUser } = useQuery("HistoryChache", async () => {
    const response = await API.get("/transaction-user")
    return response.data.data
  })
  console.log("History", TransUser)

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
  return (
    <>
      <Card className="border-0 p-2" style={{ width: "50%" }}>
        <CardGroup>
          <Stack>
            <CardHeader className="bg-white border-0">
              <Card.Title>
                <h3 style={{ color: "#BD0707", fontWeight: "bold" }}>
                  My Transaction
                </h3>
              </Card.Title>
            </CardHeader>
            {TransUser?.map((dataTransUser) => (
              <Card.Body
                key={dataTransUser?.id}
                style={{
                  background: "#F6DADA",
                  borderRadius: "5px",
                  marginBottom: "20px",
                }}
              >
                <Row>
                  <Col sm={9} gap={3}>
                    {dataTransUser.order?.map((order) => (
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
                              {order.toping?.map((topping) => (
                                <>{topping.nametoping},</>
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
                              Price : {formatIDR.format(order.subtotal)}
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
                          {dataTransUser.status === "Payment" ? (
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
                          ) : dataTransUser.status === "Success" ? (
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
                          ) : dataTransUser.status === "Cancel" ? (
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
                            Total : {formatIDR.format(dataTransUser.price)}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Stack>
                  </Col>
                </Row>
              </Card.Body>
            ))}
          </Stack>
        </CardGroup>
      </Card>
    </>
  )
}

export default HistoryOrder
