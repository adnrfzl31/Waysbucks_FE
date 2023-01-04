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

  ImgToping: {
    position: "relative",
    width: "350px",
  },

  // Image Toping 1
  ImgLogo: {
    position: "absolute",
    width: "130px",
    height: "auto",
    top: "35%",
    left: "77%",
  },
}

function UpdateToping() {
  const title = "Toping admin"
  document.title = "WaysBucks | " + title

  const navigate = useNavigate()
  const { id } = useParams()

  const [preview, setPreview] = useState(null)
  const [toping, setToping] = useState({})
  const [DataToping, setDataToping] = useState({
    nametoping: "",
    price: 0,
    image: "",
  })

  // Fetching detail toping data by id from database
  let { data: topings } = useQuery("updateTopingCache", async () => {
    const response = await API.get("/toping/" + id)
    return response.data.data
    // setDataToping({
    //   nametoping: response.data.nametoping,
    //   price: response.data.price,
    //   image: response.data.image,
    // })
    // setToping(response.data)
  })

  useEffect(() => {
    if (topings) {
      setPreview(topings.image)
      setDataToping({
        ...DataToping,
        nametoping: topings.nametoping,
        price: topings.price,
      })
      setToping(topings)
    }
  }, [topings])

  const handleOnChange = (e) => {
    setDataToping({
      ...DataToping,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
      // setPhotoToping(<p className="txt-black">{url}</p>)
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
      if (DataToping.image) {
        formData.set(
          "image",
          DataToping.image[0],
          DataToping.image[0]?.nametoping
        )
      }
      formData.set("nametoping", DataToping.nametoping)
      formData.set("price", DataToping.price)

      // Insert toping data
      const response = await API.patch(
        "/toping/" + topings.id,
        formData,
        config
      )
      //console.log(response.data)

      navigate("/TopingAdmin")
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
                Toping
              </Card.Title>
              <Form
                onSubmit={(e) => handleSubmit.mutate(e)}
                id="UpdateToping"
                className="m-auto mt-3 d-grid gap-2 w-100"
              >
                <Form.Group className="mb-3 " controlId="nameToping">
                  <Form.Control
                    onChange={handleOnChange}
                    name="nametoping"
                    value={DataToping?.nametoping}
                    style={{
                      border: "2px solid #BD0707",
                      backgroundColor: "#E0C8C840",
                    }}
                    type="text"
                    placeholder="Name Toping"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Control
                    onChange={handleOnChange}
                    name="price"
                    value={DataToping?.price}
                    style={{
                      border: "2px solid #BD0707",
                      backgroundColor: "#E0C8C840",
                    }}
                    type="number"
                    placeholder="Price"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="imgToping">
                  <Form.Control
                    onChange={handleOnChange}
                    name="image"
                    // value={DataToping?.image}
                    style={{
                      border: "2px solid #BD0707",
                      backgroundColor: "#E0C8C840",
                    }}
                    type="file"
                    placeholder="Photo Toping"
                  />
                </Form.Group>
                <Button
                  variant="outline-light"
                  style={style.bgColor}
                  type="submit"
                  // onClick={() => setPopUp(true)}
                >
                  Add Toping
                </Button>
              </Form>
            </Card.Body>
          </Col>
          {preview && (
            <Card.Img
              variant="top"
              src={preview}
              alt=""
              style={style.ImgToping}
            />
            // ) : (
            //   <Card.Img
            //     variant="top"
            //     src={URL.createObjectURL(preview[0])}
            //     alt=""
            //     style={style.ImgToping}
            //   />
          )}
        </Row>
      </Card>
    </Container>
  )
}

export default UpdateToping
