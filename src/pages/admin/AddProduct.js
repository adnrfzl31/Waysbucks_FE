import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useMutation } from "react-query"
import { API } from "../../confiq/api"
import ModalPopUpProduct from "../../component/popup/PopUpProduct"

// import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

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

  bgColor: {
    backgroundColor: "#BD0707",
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

  // Image Product 1
  ImgLogo: {
    position: "absolute",
    width: "130px",
    height: "auto",
    top: "35%",
    left: "77%",
  },
}

function AddProduct() {
  // const [popUp, setPopUp] = React.useState(false)
  // const [photoProduct, setPhotoProduct] = React.useState(<p>Image Product</p>)
  const [preview, setPreview] = useState(null)
  const [DataProduct, setDataProduct] = useState({
    nameproduct: "",
    price: 0,
    image: "",
  })

  // const handleOnChange = (e) => {
  //   setState({
  //     ...DataProduct,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  const handleOnChange = (e) => {
    setDataProduct({
      ...DataProduct,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
      // setPhotoProduct(<p className="txt-black">{url}</p>)
    }
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      // Store data with FormData as object
      const formData = new FormData()
      formData.set("nameproduct", DataProduct.nameproduct)
      formData.set("price", DataProduct.price)
      formData.set(
        "image",
        DataProduct.image[0],
        DataProduct.image[0].nameproduct
      )

      // Insert product data
      const response = await API.post("/product", formData, config)
      //console.log(response)

      // navigate("/add-product")
    } catch (error) {
      console.log(error)
    }
  })

  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <Container className="my-5">
        <Card className="mt-5" style={{ border: "white" }}>
          <Row>
            <Col sm={8}>
              <Card.Body className="m-auto" style={{ width: "80%" }}>
                <Card.Title className="mb-5" style={style.textTitle}>
                  Product
                </Card.Title>
                <Form
                  onSubmit={(e) => handleSubmit.mutate(e)}
                  id="addProduct"
                  className="m-auto mt-3 d-grid gap-2 w-100"
                >
                  <Form.Group className="mb-3 " controlId="nameProduct">
                    <Form.Control
                      onChange={handleOnChange}
                      name="nameproduct"
                      style={{
                        border: "2px solid #BD0707",
                        backgroundColor: "#E0C8C840",
                      }}
                      type="text"
                      placeholder="Name Product"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Control
                      onChange={handleOnChange}
                      name="price"
                      style={{
                        border: "2px solid #BD0707",
                        backgroundColor: "#E0C8C840",
                      }}
                      type="number"
                      placeholder="Price"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="imgProduct">
                    <Form.Control
                      onChange={handleOnChange}
                      name="image"
                      style={{
                        border: "2px solid #BD0707",
                        backgroundColor: "#E0C8C840",
                      }}
                      type="file"
                      placeholder="Photo Product"
                    />
                  </Form.Group>
                  <Button
                    variant="outline-light"
                    style={style.bgColor}
                    type="submit"
                    onClick={() => {
                      setModalShow(true)
                    }}
                  >
                    Add Product
                  </Button>
                </Form>
              </Card.Body>
            </Col>
            {preview && (
              <Card.Img
                variant="top"
                src={preview}
                alt={preview}
                style={style.ImgProduct}
              />
            )}
          </Row>
        </Card>
      </Container>
      <ModalPopUpProduct show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default AddProduct
