import "bootstrap/dist/css/bootstrap.min.css"
import "../../assets/css/detailProduct/detailProduct.css"
import { useContext, useEffect, useState } from "react"
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Approve from "../../assets/image/Approve.png"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"

function DetailProduct() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [state] = useContext(UserContext)

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  //produk
  let { data: productdetail } = useQuery("productdetailCache", async () => {
    const response = await API.get("/product/" + id)
    return response.data.data
  })

  /// topping
  let { data: toppings } = useQuery("toppingsCache", async () => {
    const response = await API.get("/toppings")
    return response.data.data
  })

  const [toppingCheck, setToppingCheck] = useState([0])
  const [toppingPrice, setToppingPrice] = useState(0)

  const handleChecked = (id, price) => {
    let filterID = toppingCheck.filter((e) => e === id)
    if (filterID[0] !== id) {
      setToppingCheck([...toppingCheck, id])
      setToppingPrice(toppingPrice + price)
    } else {
      setToppingCheck(toppingCheck.filter((e) => e !== id))
      setToppingPrice(toppingPrice - price)
    }
  }

  let subTotal = productdetail?.price + toppingPrice

  const HandleAddCart = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      const data = {
        buyer_id: state.user.id,
        product_id: productdetail.id,
        topping_id: toppingCheck,
      }
      const datatrans = {
        user_id: state.user.id,
      }

      const bodytrans = JSON.stringify(datatrans)
      const response = await API.get("/my-order")

      await API.post("/transaction", bodytrans)

      const body = JSON.stringify(data)

      await API.post("/order", body, config)

      navigate("/Carts")
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Container className="my-5">
      <Card className="detail-product-card" border="white">
        <Row className="gap-3">
          <Col md={12} lg={4}>
            <Card.Img
              alt=""
              className="detail-product-img"
              src={productdetail?.image}
            />
          </Col>
          <Card.Body className="detail-product-body-card my-2">
            <Row as={Col} md={12} lg={7} className="d-flex flex-column gap-3">
              <Col xs={12}>
                <Card.Title className="detail-product-title-card">
                  {productdetail?.nameproduct}
                </Card.Title>
                <Card.Text className="detail-product-text-card">
                  {formatIDR.format(productdetail?.price)}
                </Card.Text>
              </Col>
              <div className="my-2">
                <Card.Text className="detail-product-text-card">
                  Toping
                </Card.Text>
                <Row xs="4" className="m-2">
                  {/* Toping */}
                  {toppings?.map((topping) => (
                    <Col
                      key={topping?.id}
                      xs={6}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={3}
                      className="my-2"
                    >
                      <div
                        onClick={() =>
                          handleChecked(topping?.id, topping?.price)
                        }
                      >
                        <div className="position-relative">
                          <Card.Img
                            alt=""
                            className="detail-product-toping-img"
                            src={topping?.image}
                          />
                          <Badge className="detail-product-badge position-absolute translate-middle bg-success p-0   border border-light rounded-circle">
                            {toppingCheck.filter(
                              (Element) => Element === topping?.id
                            )[0] === topping?.id ? (
                              <img
                                alt=""
                                className="detail-product-toping-approve"
                                src={Approve}
                              />
                            ) : (
                              <></>
                            )}
                          </Badge>
                        </div>
                        {/* <Card.Img alt="" style={style.imgToping} src={ListToping.order} /> */}
                        <Card.Text className="detail-product-toping-text m-0">
                          {topping?.nametopping}
                        </Card.Text>
                        <Card.Text className="detail-product-toping-text">
                          {formatIDR.format(topping?.price)}
                        </Card.Text>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Row>
            <Row className="m-4 justify-content-between">
              <Col>
                <Card.Text className="detail-product-text-card">
                  Total
                </Card.Text>
              </Col>
              <Col>
                <Card.Text className="detail-product-text-card text-end">
                  {formatIDR.format(subTotal)}
                </Card.Text>
              </Col>
            </Row>
            <Button
              className="detail-product-bg-color w-100"
              variant="outline-light"
              onClick={(e) => HandleAddCart.mutate(e)}
            >
              Add Cart
            </Button>
          </Card.Body>
        </Row>
      </Card>
    </Container>
  )
}

export default DetailProduct
