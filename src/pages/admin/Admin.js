import "bootstrap/dist/css/bootstrap.min.css"
import { useContext } from "react"
import { Container, Button, Table, Stack, Badge } from "react-bootstrap"
import { useMutation, useQuery } from "react-query"
import { Link } from "react-router-dom"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
// import Approve from "../../assets/image/Approve.png"
// import Cancel from "../../assets/image/Cancel.png"
// import Jumbotron from "../../component/Jumbotron"

const style = {
  textTitle: {
    fontWeight: "600",
    fontSize: "32px",
    lineHeight: "49px",

    color: "#BD0707",
  },

  bgColor: {
    backgroundColor: "#828282",
  },

  textCenter: {
    textAlign: "center",
  },

  link: {
    color: "#061E99",
    textDecoration: "none",
  },

  warning: {
    color: "#FF9900",
  },

  success: {
    color: "#78A85A",
  },

  danger: {
    color: "#E83939",
  },

  light: {
    color: "#00D1FF",
  },
}

function Income() {
  const [state] = useContext(UserContext)

  let { data: transall, refetch } = useQuery("TransTable", async () => {
    if (state.user.role === "admin") {
      const response = await API.get("/transactions")
      return response.data.data
    }
  })

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  let income = 0
  // //console.log(transall.data.subtotal)

  const HandleCancel = useMutation(async (id) => {
    //console.log("Cancel ID =>", id)
    try {
      const response = await API.patch("/canceltrans/" + id)
      refetch()
      //console.log(response)
    } catch (error) {
      console.log(error)
    }
  })

  const HandleAccept = useMutation(async (id) => {
    //console.log("Accept ID =>", id)
    try {
      const response = await API.patch("/accepttrans/" + id)
      refetch()
      //console.log(response)
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Container className="mt-5">
      {/* <Jumbotron /> */}
      <h3 style={style.textTitle} className="my-5">
        Income transaction
      </h3>
      <Table bordered hover>
        <thead>
          <tr style={style.bgColor}>
            <th>No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Post Code</th>
            <th>Income</th>
            <th>Status</th>
            <th style={style.textCenter}>Action</th>
          </tr>
        </thead>
        <tbody>
          {transall === 0 ? (
            <tr>
              <td colSpan={6}>Not Transaction</td>
            </tr>
          ) : (
            transall?.map((element, number) => {
              number += 1
              if (element.status === "Success") {
                income += element.price
                //console.log("income : ", element.price)
              }

              return (
                <tr>
                  <td>{number}</td>
                  <td>{element.name}</td>
                  <td>{element.address}</td>
                  <td>{element.poscode}</td>
                  <td>
                    <Link to="/Transaction" style={style.link}>
                      {formatIDR.format(element.price)}
                    </Link>
                  </td>
                  {element.status === "Payment" ? (
                    <label className="text-warning">Waiting Approve</label>
                  ) : element.status === "Success" ? (
                    <label className="text-success">Success</label>
                  ) : element.status === "Cancel" ? (
                    <label className="text-danger">Cancel</label>
                  ) : null}
                  <td>
                    {element.status === "Payment" ? (
                      <Stack direction="horizontal" gap={3}>
                        <Button
                          variant="danger"
                          onClick={() => HandleCancel.mutate(element.id)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => HandleAccept.mutate(element.id)}
                        >
                          Accept
                        </Button>
                      </Stack>
                    ) : element.status === "Success" ? (
                      <Badge
                        className="rounded-circle bg-success"
                        style={{ width: "25px" }}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Badge>
                    ) : element.status === "Cancel" ? (
                      <Badge
                        className="rounded-circle bg-danger"
                        style={{ width: "25px" }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </Badge>
                    ) : null}
                  </td>
                </tr>
              )
            })
          )}

          <tr>
            <td colSpan={7} className="fw-bold">
              Income : {formatIDR.format(income)}
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default Income
