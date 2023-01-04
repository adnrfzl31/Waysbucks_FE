import "bootstrap/dist/css/bootstrap.min.css"
import { useContext } from "react"
import { Container } from "react-bootstrap"
import { UserContext } from "../context/UserContext"
import Income from "./admin/Admin"
import Jumbotron from "../component/home/Jumbotron"
import Products from "../component/home/Product"
import Navs from "../component/navbar/Navbar"

// import Income from "./Admin"
// import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

const style = {
  text: {
    color: "#BD0707",
  },
}
function Home() {
  // const DataUser = JSON.parse(localStorage.getItem("VALUE_LOGIN"))
  const [state] = useContext(UserContext)

  return (
    <>
      {state.isLogin ? (
        <>
          {state.user.role === "admin" ? (
            <Container className="my-5 w-90">
              <Income />
            </Container>
          ) : (
            <Container className="my-5 w-90">
              <Jumbotron />
              <h3 style={style.text} className="my-5">
                Let's Order
              </h3>
              <Products />
            </Container>
          )}
        </>
      ) : (
        <Container className="my-5 w-90">
          <Jumbotron />
          <h3 style={style.text} className="my-5">
            Let's Order
          </h3>
          <Products />
        </Container>
      )}
    </>
  )
}

export default Home
