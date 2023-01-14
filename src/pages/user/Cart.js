import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Button,
  Card,
  CardImg,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Stack,
} from "react-bootstrap"
import { UserContext } from "../../context/UserContext"
import { API } from "../../confiq/api"
import { useMutation, useQuery } from "react-query"
import Login from "../../component/auth/Login"
import Register from "../../component/auth/Register"
import ModalPopUp from "../../component/popup/PopUP"
import Jumbotron from "../../component/home/Jumbotron"
import Products from "../../component/home/Product"
import DeleteData from "../../component/modal/Delete"
import FileUpload from "../../assets/image/FileUpload.png"
import Trash from "../../assets/image/Trash.png"
import Product1 from "../../assets/image/Product1.png"

const style = {
  textTitle: {
    fontWeight: "600",
    fontSize: "32px",
    lineHeight: "49px",

    color: "#BD0707",
  },

  textRed: {
    color: "#BD0707",
  },

  textCenter: {
    textAlign: "center",
  },

  link: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "black",
  },

  ImgProduct: {
    position: "relative",
    width: "350px",
  },

  ImgLogo: {
    position: "absolute",
    width: "130px",
    height: "auto",
    top: "35%",
    left: "77%",
  },
}

function Cart() {
  const [state] = useContext(UserContext)
  const [checkswitch, setCheckSwitch] = useState(false)

  let { data: order, refetch: orderRefetch } = useQuery(
    "ordersCache",
    async () => {
      const response = await API.get("/orders-id")
      return response.data.data
    }
  )

  const { data: user } = useQuery("usersCache", async () => {
    if (state.isLogin === true) {
      const response = await API.get("/user")
      return response.data.data
    }
  })

  let Subtotal = 0
  let Qty = 0
  if (state.isLogin === true) {
    order?.map((element) => ((Subtotal += element.total), (Qty += element.qty)))
  }

  //Payment
  const [dataPay, setDataPay] = useState({
    fullname: "",
    phone: "",
    address: "",
  })

  const handleOnChange = (e) => {
    setDataPay({
      ...dataPay,
      [e.target.name]: e.target.value,
    })
  }

  let navigate = useNavigate()

  const HandlePay = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      if (dataPay.fullname != "") {
        user.fullname = dataPay.fullname
      }
      if (dataPay.phone != "") {
        user.phone = dataPay.phone
      }
      if (dataPay.address != "") {
        user.address = dataPay.address
      }

      const data = {
        ID: order[0].transaction_id,
        Name: user.fullname,
        Address: user.address,
        Phone: user.phone,
        UserID: user.id,
        Total: Subtotal,
        Status: "pending",
      }

      const response = await API.patch("/transaction", data, config)

      const token = response.data.data.token

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result)
          navigate("/profile")
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result)
          navigate("/profile")
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result)
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment")
        },
      })

      navigate("/profile")
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-9m3zb0scyClSg1so"

    let scriptTag = document.createElement("script")
    scriptTag.src = midtransScriptUrl
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey)

    document.body.appendChild(scriptTag)
    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  const handleSubmit = (e) => {
    setModalShow(true)
    HandlePay.mutate(e)
  }

  //Delete order
  const [idDelete, setIdDelete] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleDelete = (id) => {
    setIdDelete(id)
    handleShow()
  }

  const deleteById = useMutation(async (id) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      }
      await API.delete(`/order/${id}`, config)
      orderRefetch()
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose()
      // execute delete data by id function
      deleteById.mutate(idDelete)
      setConfirmDelete(null)
    }
  }, [confirmDelete])

  return (
    <>
      {state.isLogin === false ? (
        <>
          <Container className="my-5">
            <Jumbotron />
            <h3 style={style.text} className="my-5">
              Let's Order
            </h3>
            <Products />
          </Container>

          <Login
            show={showLogin}
            onHide={() => setShowLogin(false)}
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />

          <Register
            show={showRegister}
            onHide={() => setShowRegister(false)}
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />
        </>
      ) : (
        <>
          <Container style={{ width: "90%" }} className="my-5">
            <Card className="mt-5" style={{ border: "white" }}>
              <Row>
                <Card.Title className="mb-5" style={style.textTitle}>
                  My Cart
                </Card.Title>
                <Row className="gap-5 p-3">
                  <Col sm={7} className="p-3">
                    <Card.Body className="p-0" style={{ width: "100%" }}>
                      <Card.Body className="m-0 p-0" style={{ width: "100%" }}>
                        <Card.Text style={style.textRed}>
                          Review Your Order
                        </Card.Text>
                        <hr style={style.textRed} className="m-0" />
                        <Stack>
                          {/* Data pembelian product */}

                          {order?.map((data) => (
                            <Card.Body key={data?.id} className="pe-0">
                              <Stack direction="horizontal" gap={4}>
                                <Card.Img
                                  src={data?.product?.image}
                                  style={{ width: "20%" }}
                                />
                                <Stack
                                  direction="horizontal"
                                  className="flex-fill"
                                >
                                  <Card.Body className="ps-0 m-0 w-100">
                                    <Card.Title
                                      className="mb-2"
                                      style={style.textRed}
                                    >
                                      {data?.product?.nameproduct}
                                    </Card.Title>
                                    <Stack
                                      direction="horizontal"
                                      className="align-items-start"
                                    >
                                      <Card.Text
                                        className="m-0 me-2"
                                        style={{
                                          fontSize: "15px",
                                          color: "#974A4A",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Topping :
                                      </Card.Text>
                                      {data.topping?.map((dataTopping) => (
                                        <Card.Text
                                          key={dataTopping?.id}
                                          className="d-flex flex-wrap"
                                          style={{
                                            fontSize: "15px",
                                            color: "#BD0707",
                                          }}
                                        >
                                          {dataTopping?.nametopping},
                                        </Card.Text>
                                      ))}
                                    </Stack>
                                  </Card.Body>

                                  <Card.Body className=" p-0 m-0">
                                    <Card.Text style={style.textRed}>
                                      {formatIDR.format(data?.total)}
                                    </Card.Text>
                                    <Button
                                      variant="light"
                                      className="p-0 ms-5"
                                      onClick={() => {
                                        handleDelete(data?.id)
                                      }}
                                    >
                                      <Card.Img
                                        src={Trash}
                                        style={{ width: "100%" }}
                                      />
                                    </Button>
                                  </Card.Body>
                                </Stack>
                              </Stack>
                            </Card.Body>
                          ))}
                        </Stack>
                        <hr style={style.textRed} className="mt-0" />
                      </Card.Body>
                      {/* <Stack direction="horizontal"> */}
                      <Card.Body className="px-0">
                        <hr style={style.textRed} className="m-0" />
                        <Stack direction="horizontal">
                          <Card.Body>
                            <Card.Text style={style.textRed}>
                              Subtotal
                            </Card.Text>
                            <Card.Text style={style.textRed}>Qty</Card.Text>
                          </Card.Body>
                          <Card.Body>
                            <Card.Text
                              style={style.textRed}
                              className="text-end"
                            >
                              {formatIDR.format(Subtotal)}
                            </Card.Text>
                            <Card.Text
                              style={style.textRed}
                              className="text-end"
                            >
                              {Qty}
                            </Card.Text>
                          </Card.Body>
                        </Stack>
                        <hr style={style.textRed} />
                        <Stack direction="horizontal">
                          <Card.Body>
                            <Card.Text style={style.textRed}>Total</Card.Text>
                          </Card.Body>
                          <Card.Body>
                            <Card.Text
                              style={style.textRed}
                              className="text-end"
                            >
                              {formatIDR.format(Subtotal)}
                            </Card.Text>
                          </Card.Body>
                        </Stack>
                      </Card.Body>
                      {/* <Card.Body style={{ width: "40%" }}>
                        <Form.Group controlId="formFile" className="m-3">
                          <Form.Label className="w-100">
                            <Card
                              style={{
                                border: "2px solid #BD0707",
                                backgroundColor: "#E0C8C840",
                              }}
                            >
                              <CardImg
                                src={FileUpload}
                                className="w-25  m-auto my-3"
                              />
                              <Card.Text
                                className="m-auto mb-3"
                                style={{ color: "#68323280" }}
                              >
                                Attache of Transaction
                              </Card.Text>
                            </Card>
                          </Form.Label>
                          <Form.Control
                            type="file"
                            style={{ display: "none" }}
                          />
                        </Form.Group>
                      </Card.Body> */}
                      {/* </Stack> */}
                    </Card.Body>
                  </Col>
                  <Col sm={4} className="p-3">
                    <Form className="m-auto mt-5 d-grid gap-4 w-100">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input mb-4"
                          type="checkbox"
                          onChange={() => {
                            setCheckSwitch(!checkswitch)
                          }}
                          role="switch"
                          id="flexSwitchCheckChecked"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckChecked"
                          style={{ color: "#bd0707" }}
                        >
                          Other Address
                        </label>
                      </div>
                      {checkswitch === true ? (
                        <>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            name="fullname"
                            onChange={handleOnChange}
                            className="mb-3"
                            style={{
                              borderColor: "#bd0707",
                              borderWidth: "3px",
                              backgroundColor: "#FFF3F7",
                            }}
                          />

                          <Form.Control
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            onChange={handleOnChange}
                            className="mb-3"
                            style={{
                              borderColor: "#bd0707",
                              borderWidth: "3px",
                              backgroundColor: "#FFF3F7",
                            }}
                          />
                          <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Address"
                            name="address"
                            onChange={handleOnChange}
                            className="mb-5"
                            style={{
                              borderColor: "#bd0707",
                              borderWidth: "3px",
                              backgroundColor: "#FFF3F7",
                              resize: "none",
                            }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <Button
                        variant="primary"
                        onClick={(e) => handleSubmit(e)}
                        style={{
                          width: "100%",
                          color: "white",
                          fontWeight: "bold",
                          borderColor: "#bd0707",
                          backgroundColor: "#bd0707",
                        }}
                      >
                        Pay
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Row>
            </Card>
          </Container>
          <DeleteData
            setConfirmDelete={setConfirmDelete}
            show={show}
            handleClose={handleClose}
          />
          <ModalPopUp show={modalShow} onHide={() => setModalShow(false)} />
        </>
      )}
    </>
  )
}

export default Cart
