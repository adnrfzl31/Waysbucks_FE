import "bootstrap/dist/css/bootstrap.min.css"
import React, { useContext, useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { API } from "../../confiq/api"

// import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

const style = {
  textLogin: {
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

const Login = ({
  show,
  onHide,
  setShowLogin,
  setShowRegister,
  profileRefetch,
  orderRefetch,
}) => {
  const title = "Login"
  document.title = "Waysbucks | " + title

  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)

  const [message, setMessage] = useState(null)
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  })

  const handleOnChange = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      // Data body
      const body = JSON.stringify(dataLogin)

      // Insert data for login process
      const response = await API.post("/login", body, config)

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        })

        // Status check
        if (response.data.data.role === "admin") {
          navigate("/admin")
        } else {
          navigate("/")
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        )
        profileRefetch()
        orderRefetch()
        setMessage(alert)
      }
      // console.log(response)
      setShowLogin(false)
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      )
      setMessage(alert)
      // console.log(error)
    }
  })

  // const users = []
  // const LoginDataUser = JSON.parse(localStorage.getItem("DATA_USER"))
  // const handleOnSubmit = (e) => {
  //   e.preventDefault()
  //   window.location.reload()
  //   LoginDataUser.forEach((element) => {
  //     if (
  //       dataLogin.email === element.email &&
  //       dataLogin.password === element.password
  //     ) {
  //       users.push(element)
  //       localStorage.setItem("VALUE_LOGIN", JSON.stringify(users))
  //       setShowLogin(false)
  //     } else {
  //       console.log(LoginDataUser)
  //     }
  //   })
  // }

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body>
        <Modal.Title style={style.textLogin} className="mb-3">
          Login
        </Modal.Title>
        {message && message}
        <Form
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="w-100 m-auto mt-3 d-grid gap-2"
        >
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Control
              onChange={handleOnChange}
              value={dataLogin.email}
              name="email"
              style={{ border: "2px solid #BD0707" }}
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={handleOnChange}
              value={dataLogin.password}
              name="password"
              style={{ border: "2px solid #BD0707" }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="outline-light" style={style.bgColor} type="submit">
            Submit
          </Button>
          <Form.Label style={style.textCenter}>
            Don't have an account ? Klik
            <Link
              className="ms-1"
              onClick={() => {
                setShowLogin(false)
                setShowRegister(true)
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

export default Login
