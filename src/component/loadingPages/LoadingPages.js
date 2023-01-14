import "bootstrap/dist/css/bootstrap.min.css"
import "../../assets/css/loadingPages/Loading.css"
import React from "react"
import { Container, Image } from "react-bootstrap"
import IconLogo from "../../assets/image/Logo2.png"

const style = {}

function LoadingPages() {
  return (
    <Container className="loading-page p-0 m-auto d-flex justify-content-center align-items-center flex-column">
      <Image src={IconLogo} className="loading-image img-fluid" />
      <h3>Loading...</h3>
    </Container>
  )
}

export default LoadingPages
