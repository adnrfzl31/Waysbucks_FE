import "bootstrap/dist/css/bootstrap.min.css"
import { useContext } from "react"
import { Container } from "react-bootstrap"
import { UserContext } from "../context/UserContext"
import Jumbotron from "../component/home/Jumbotron"
import Products from "../component/home/Product"
import Navs from "../component/navbar/Navbar"
import Income from "./admin/Admin"

const style = {
  text: {
    color: "#BD0707",
  },
}
function Home() {
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
              <Products />
            </Container>
          )}
        </>
      ) : (
        <Container className="my-5 w-90">
          <Jumbotron />
          <Products />
        </Container>
      )}
    </>
  )
}

export default Home
