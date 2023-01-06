import "bootstrap/dist/css/bootstrap.min.css"
import { useContext, useEffect, useState } from "react"
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Approve from "../../assets/image/Approve.png"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"

const style = {
  card: {
    width: "100%",
    height: "500px",
    position: "relative",
  },

  imgProduct: {
    width: "30%",
    height: "80%",
    // position: "absolute",
  },

  cardBody: {
    width: "50%",
  },

  cardTitle: {
    fontSize: "47px",
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    color: "#BD0707",
  },

  cardText: {
    color: "#974A4A",
  },

  textToping: {
    color: "#BD0707",
    textAlign: "center",
  },

  imgToping: {
    width: "25%",
    height: "auto",
    marginLeft: "40%",
  },

  bgColor: {
    backgroundColor: "#BD0707",
  },
}

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

      // const data = {
      //   qty: 1,
      //   subtotal: subTotal,
      //   product_id: productdetail.id,
      //   topping_id: toppingCheck,
      // }

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

      // const body = JSON.stringify(data)

      // const respone = await API.post("/order/" + productdetail.id, body, config)
      // //console.log("respon Order :", respone)
      // navigate("/Carts")
    } catch (error) {
      console.log(error)
    }
  })

  // useEffect(() => {
  //   if (state.isLogin === false || state.user.role === "admin") {
  //     navigate("/")
  //   }
  // }, [state])

  return (
    <Container className="my-5">
      <Card border="white" style={style.card}>
        <Row>
          <Card.Img
            alt=""
            style={style.imgProduct}
            src={productdetail?.image}
          />
          <Card.Body className="my-2" style={style.cardBody}>
            <Card.Title style={style.cardTitle}>
              {productdetail?.nameproduct}
            </Card.Title>
            <Card.Text style={style.cardText}>
              {formatIDR.format(productdetail?.price)}
            </Card.Text>

            <div className="mt-5">
              <Card.Text style={style.cardText}>Toping</Card.Text>
              <Row xs="4" className="m-2">
                {/* Toping */}
                {toppings?.map((topping) => (
                  <div
                    key={topping?.id}
                    className="p-3"
                    onClick={() => handleChecked(topping?.id, topping?.price)}
                  >
                    <div className="position-relative">
                      <Card.Img
                        alt=""
                        style={style.imgToping}
                        src={topping?.image}
                      />
                      <Badge
                        style={{ top: "10%", left: "65%" }}
                        className="position-absolute translate-middle bg-success p-0   border border-light rounded-circle"
                      >
                        {toppingCheck.filter(
                          (Element) => Element === topping?.id
                        )[0] === topping?.id ? (
                          <img alt="" style={{ width: "20px" }} src={Approve} />
                        ) : (
                          <></>
                        )}
                      </Badge>
                    </div>
                    {/* <Card.Img alt="" style={style.imgToping} src={ListToping.order} /> */}
                    <Card.Text className="m-0" style={style.textToping}>
                      {topping?.nametopping}
                    </Card.Text>
                    <Card.Text style={style.textToping}>
                      {formatIDR.format(topping?.price)}
                    </Card.Text>
                  </div>
                ))}
              </Row>
            </div>
            <Row className="m-4">
              <Col xs={12} md={10}>
                <Card.Text style={style.cardText}>Total</Card.Text>
              </Col>
              <Col xs={6} md={2}>
                <Card.Text style={style.cardText}>
                  {formatIDR.format(subTotal)}
                </Card.Text>
              </Col>
            </Row>
            <Button
              className="w-100"
              variant="outline-light"
              style={style.bgColor}
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

// const navigate = useNavigate()

// // const getProductURL = useLocation()
// // const getProductId = parseInt(getProductURL.pathname.replace(/\D/g, ""))

// const DataLogin = JSON.parse(localStorage.getItem("VALUE_LOGIN"))

// const Product = []
// const getProduct = () => {
//   if (typeof Storage === "undefined") {
//     alert("cant store user")
//   }

//   const DataProduct = JSON.parse(localStorage.getItem("DATA_PRODUCT"))

//   if (DataProduct !== null) {
//     for (let i = 0; i < DataProduct.length; i++) {
//       Product.push(DataProduct[i])
//       // if (DataProduct[i].id === getProductId) {
//       // }
//     }
//   }
// }

// const Topings = []
// const getTopings = () => {
//   if (typeof Storage === "undefined") {
//     alert("cant store user")
//   }

//   const DataToping = JSON.parse(localStorage.getItem("DATA_TOPING"))

//   if (DataToping !== null) {
//     for (let i = 0; i < DataToping.length; i++) {
//       Topings.push(DataToping[i])
//     }
//   }
// }

// getProduct()
// getTopings()

// const formatIDR = new Intl.NumberFormat(undefined, {
//   style: "currency",
//   currency: "IDR",
//   maximumFractionDigits: 0,
// })

// const [toppingCheck, setTopingCheck] = useState([])
// const [toppingPrice, setTopingPrice] = useState(0)

// const handleChecked = (id, price) => {
//   const filterID = toppingCheck.filter((e) => e === id)
//   if (filterID[0] !== id) {
//     setTopingCheck([...toppingCheck, id])
//     setTopingPrice(toppingPrice + price)
//   } else {
//     setTopingCheck(toppingCheck.filter((e) => e !== id))
//     setTopingPrice(toppingPrice - price)
//   }
// }

// const dataCart = []
// const getCartUser = () => {
//   if (typeof Storage === "undefined") {
//     alert("cant store user")
//   }

//   const data = JSON.parse(localStorage.getItem(`DATA_CART_${DataLogin[0].id}`))

//   if (data !== null) {
//     for (let i = 0; i < data.length; i++) {
//       dataCart.push(data[i])
//     }
//   }
// }

// const saveCartUser = () => {
//   const currentProduct = {
//     cartId: +new Date(),
//     itemId: Product[0].id,
//     topping: toppingCheck,
//     total: Product[0].price + toppingPrice,
//     isPaid: false,
//   }

//   dataCart.push(currentProduct)
//   localStorage.setItem(`DATA_CART_${DataLogin[0].id}`, JSON.stringify(dataCart))
// }

// const handleOnSubmit = () => {
//   getCartUser()
//   saveCartUser()
//   navigate("/Cart")
// }
