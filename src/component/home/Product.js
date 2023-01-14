import "bootstrap/dist/css/bootstrap.min.css"
import React, { useContext, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import "../../assets/css/home/product.css"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"
import Login from "../auth/Login"
import Register from "../auth/Register"

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

  return (
    <Container className="my-5">
      <h3 className="text">Let's Order</h3>
      <Row className="my-2 d-flex justify-content-start">
        {/* <div className="d-flex gap-4 justify-content-flex-start"> */}
        {products?.map((data) => (
          <Col key={data?.id} sm={12} md={6} lg={4} xl={3} className="my-5">
            <Card
              border="light"
              className="product-card"
              onClick={() =>
                state.isLogin === false
                  ? setShowLogin(true)
                  : toDetail(data?.id)
              }
            >
              <Card.Img
                variant="top"
                src={data?.image}
                className="product-img"
              />
              <Card.Body>
                <Card.Title className="title">{data?.nameproduct}</Card.Title>
                <Card.Text className="price">IDR {data?.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {/* </div> */}
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
    </Container>
  )
}

export default Products
