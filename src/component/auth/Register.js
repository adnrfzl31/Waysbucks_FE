import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"
import { Button, Form, Modal, Alert, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useMutation } from "react-query"
import { API } from "../../confiq/api"
// import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

const style = {
  textLogin: {
    fontFamily: "Avenir",
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: "36px",
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
}

function Register({ show, onHide, setShowLogin, setShowRegister }) {
  const title = "Register"
  document.title = "Waysbucks | " + title

  const [message, setMessage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dataRegis, setDataRegis] = useState({
    fullname: "",
    email: "",
    password: "",
    image: "",
  })

  const handleOnChange = (e) => {
    setDataRegis({
      ...dataRegis,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      // Data body
      // const body = JSON.stringify(dataRegis)

      // Store data with FormData as object
      const formData = new FormData()
      formData.set("image", dataRegis.image[0], dataRegis.image[0].fullname)
      formData.set("fullname", dataRegis.fullname)
      formData.set("email", dataRegis.email)
      formData.set("password", dataRegis.password)

      // Insert data user to database
      const response = await API.post("/register", formData, config)
      //console.log(response)
      // if (response.data.status === "success...") {
      //   const alert = (
      //     <Alert variant="success" className="py-1">
      //       Success
      //     </Alert>
      //   )
      //   setMessage(alert)
      //   setDataRegis({
      //     name: "",
      //     email: "",
      //     password: "",
      //     image: "",
      //   })
      // } else {
      //   const alert = (
      //     <Alert variant="danger" className="py-1">
      //       Failed
      //     </Alert>
      //   )
      //   setMessage(alert)
      // }
      setShowRegister(false)
      setShowLogin(true)
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      )
      setMessage(alert)
      console.log(error)
    }
  })

  // const addDataUser = JSON.parse(localStorage.getItem("DATA_USER"))
  // const users = []
  // const handleOnSubmit = (e) => {
  //   e.preventDefault()
  //   if (addDataUser === null) {
  //     users.push(dataRegis)
  //     localStorage.setItem("DATA_USER", JSON.stringify(users))
  //   } else {
  //     for (let i = 0; i < addDataUser.length; i++) {
  //       users.push(addDataUser[i])
  //     }
  //     dataRegis.id = addDataUser.length
  //     users.push(dataRegis)
  //     localStorage.setItem("DATA_USER", JSON.stringify(users))
  //   }
  //   setShowRegister(false)
  //   setShowLogin(true)
  // }

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body>
        <Modal.Title style={style.textLogin}>Register</Modal.Title>
        {message && message}
        <Form
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="w-100 m-auto mt-3 d-grid gap-2"
        >
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Control
              onChange={handleOnChange}
              name="fullname"
              style={{
                border: "2px solid #BD0707",
                backgroundColor: "#E0C8C840",
              }}
              type="text"
              placeholder="Full Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              onChange={handleOnChange}
              name="email"
              style={{
                border: "2px solid #BD0707",
                backgroundColor: "#E0C8C840",
              }}
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              onChange={handleOnChange}
              name="password"
              style={{
                border: "2px solid #BD0707",
                backgroundColor: "#E0C8C840",
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            {preview && (
              <Image
                src={preview}
                className="mb-4"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt={preview}
              />
            )}
            <Form.Control
              onChange={handleOnChange}
              name="image"
              style={{
                border: "2px solid #BD0707",
                backgroundColor: "#E0C8C840",
              }}
              type="file"
              placeholder="Image Profil"
            />
          </Form.Group>
          <Button variant="outline-light" style={style.bgColor} type="submit">
            Register
          </Button>
          <Form.Label style={style.textCenter}>
            Already have an account ? Klik
            <Link
              className="ms-1"
              onClick={() => {
                setShowRegister(false)
                setShowLogin(true)
              }}
              style={style.link}
            >
              Here
            </Link>
          </Form.Label>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Register
