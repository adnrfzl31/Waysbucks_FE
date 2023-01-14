import "bootstrap/dist/css/bootstrap.min.css"
import "../../assets/css/home/jumbotron.css"
import { Card } from "react-bootstrap"
import Image from "../../assets/image/Image1.png"

function Jumbotron() {
  return (
    <Card className="jumbotron-card">
      <Card.Img className="jumbotron-img " src={Image} />
      <Card.Body className="body-card">
        <Card.Title className="title-card">WAYSBUCKS</Card.Title>
        <Card.Text className="text-card">
          Things are changing, but we're still here for you
        </Card.Text>
        <Card.Text className="text-card">
          We have temporarily closed our in-store cafes, but select grocery and
          drive-thru locations remaining open. Waysbucks Drivers is also
          available
          <br />
          <br />
          Let's Order...
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Jumbotron
