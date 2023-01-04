import "bootstrap/dist/css/bootstrap.min.css"
import React, { useContext, useState } from "react"
import { Card, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"
import { useQuery } from "react-query"
import Login from "../auth/Login"
import Register from "../auth/Register"

const style = {
  card: {
    width: "16rem",
    backgroundColor: "#F6DADA",
    padding: "0",
  },

  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#BD0707",
  },

  price: {
    color: "#974A4A",
    fontSize: "14px",
  },

  ImgProduct: {
    position: "relative",
    width: "100%",
  },

  // Image Product 1
  ImgLogo: {
    position: "absolute",
    width: "90px",
    height: "auto",
    top: "27%",
    left: "33%",
  },

  // Image Product 2
  ImgLogo2: {
    position: "absolute",
    width: "90px",
    height: "auto",
    top: "27%",
    left: "34%",
  },

  // Image Product 3
  ImgLogo3: {
    position: "absolute",
    width: "90px",
    height: "auto",
    top: "27%",
    left: "34%",
  },

  // Image Product 4
  ImgLogo4: {
    position: "absolute",
    width: "90px",
    height: "auto",
    top: "38%",
    left: "36%",
  },
}

function Products() {
  const navigate = useNavigate()
  const toDetail = (id) => {
    navigate("/DetailProduct/" + id)
  }

  const [state, dispatch] = useContext(UserContext)

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const { data: products } = useQuery("productsCache", async () => {
    const res = await API.get("/products")
    return res.data.data
  })
  //console.log("data product home : ", products)

  return (
    <Row className="d-flex gap-4 justify-content-center">
      {products?.map((data) => (
        <Card
          key={data?.id}
          border="light"
          style={style.card}
          onClick={() =>
            state.isLogin === false ? setShowLogin(true) : toDetail(data?.id)
          }
        >
          <Card.Img variant="top" src={data?.image} style={style.Image} />
          <Card.Body>
            <Card.Title style={style.title}>{data?.nameproduct}</Card.Title>
            <Card.Text style={style.price}>IDR {data?.price}</Card.Text>
          </Card.Body>
        </Card>
      ))}
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
    </Row>
  )
}

export default Products
