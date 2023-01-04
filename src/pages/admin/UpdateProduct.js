import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import { useMutation, useQuery } from "react-query"
import { API } from "../../confiq/api"

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

function UpdateProduct() {
  const title = "Product admin"
  document.title = "WaysBucks | " + title

  const navigate = useNavigate()
  const { id } = useParams()

  const [preview, setPreview] = useState(null)
  const [product, setProduct] = useState({})
  const [DataProduct, setDataProduct] = useState({
    nameproduct: "",
    price: 0,
    image: "",
  })

  // Fetching detail product data by id from database
  let { data: products } = useQuery("updateproductCache", async () => {
    const response = await API.get("/product/" + id)
    return response.data.data
    // setDataProduct({
    //   nameproduct: response.data.nameproduct,
    //   price: response.data.price,
    //   image: response.data.image,
    // })
    // //console.log(response)
    // setProduct(response.data)
  })

  useEffect(() => {
    if (products) {
      setPreview(products.image)
      setDataProduct({
        ...DataProduct,
        nameproduct: products.nameproduct,
        price: products.price,
      })
      setProduct(products)
    }
  }, [products])

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
        // method: "PATCH",
        headers: {
          "Content-type": "multipart/form-data",
          // Authorization: "Basic " + localStorage.token,
        },
      }

      // Store data with FormData as object
      const formData = new FormData()
      if (DataProduct.image) {
        formData.set(
          "image",
          DataProduct.image[0],
          DataProduct.image[0]?.nameproduct
        )
      }
      formData.set("nameproduct", DataProduct.nameproduct)
      formData.set("price", DataProduct.price)

      // Insert product data
      const response = await API.patch(
        "/product/" + products.id,
        formData,
        config
      )
      //console.log(response.data)

      navigate("/ProductAdmin")
    } catch (error) {
      console.log(error)
    }
  })

  return (
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
                id="UpdateProduct"
                className="m-auto mt-3 d-grid gap-2 w-100"
              >
                <Form.Group className="mb-3 " controlId="nameProduct">
                  <Form.Control
                    onChange={handleOnChange}
                    name="nameproduct"
                    value={DataProduct?.nameproduct}
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
                    value={DataProduct?.price}
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
                    // value={DataProduct?.image}
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
                  // onClick={() => setPopUp(true)}
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
              alt=""
              style={style.ImgProduct}
            />
          )}
        </Row>
      </Card>
    </Container>
  )
}

export default UpdateProduct
