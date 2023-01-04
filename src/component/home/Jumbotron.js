import "bootstrap/dist/css/bootstrap.min.css"
import { Card } from "react-bootstrap"
import Image from "../../assets/image/Image1.png"

// import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

const style = {
  card: {
    width: "90%",
    height: "400px",
    backgroundColor: "#BD0707",
    position: "relative",
  },

  img: {
    width: "450px",
    height: "auto",
    top: "10%",
    left: "65%",
    position: "absolute",
  },

  cardBody: {
    width: "50%",
  },

  cardTitle: {
    fontSize: "60px",
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    color: "white",
  },

  cardText: {
    color: "white",
  },
}

function Jumbotron() {
  return (
    // <Container className='mt-5 w-90'>
    <Card style={style.card}>
      <Card.Img src={Image} style={style.img} />
      <Card.Body className="m-5" style={style.cardBody}>
        <Card.Title style={style.cardTitle}>WAYSBUCKS</Card.Title>
        <Card.Text style={style.cardText}>
          Things are changing, but we're still here for you
        </Card.Text>
        <Card.Text style={style.cardText}>
          We have temporarily closed our in-store cafes, but select grocery and
          drive-thru locations remaining open. Waysbucks Drivers is also
          available
          <br />
          <br />
          Let's Order...
        </Card.Text>
      </Card.Body>
    </Card>
    // </Container>
  )
}

export default Jumbotron
