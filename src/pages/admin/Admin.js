import "bootstrap/dist/css/bootstrap.min.css"
import { useContext, useState } from "react"
import { Container, Button, Table, Stack, Badge } from "react-bootstrap"
import { useMutation, useQuery } from "react-query"
import { Link } from "react-router-dom"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import ModalTransaction from "../../component/modal/ModalTransaction"

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
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [dataHistoryOrder, setDataHistoryOrder] = useState({})

  const handleHistoryOrder = (data) => {
    setDataHistoryOrder(data)
    handleShow()
  }

  let { data: transall, refetch } = useQuery("TransTable", async () => {
    const response = await API.get("/transactions")
    return response.data.data
  })

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  let income = 0

  const HandleCancel = useMutation(async (id) => {
    try {
      const dataTransAll = {
        status: "cancel",
        id: id,
      }

      const response = await API.patch("/transUpdate/" + id, dataTransAll)
      refetch()
    } catch (error) {
      console.log(error)
    }
  })

  const HandleAccept = useMutation(async (id) => {
    try {
      const dataTransAll = {
        status: "success",
        id: id,
      }
      const response = await API.patch("/transUpdate/" + id, dataTransAll)
      refetch()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Container className="mt-5">
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
              if (element.status === "success") {
                income += element.total
              }

              return (
                <tr>
                  <td>{number}</td>
                  <td>{element.name}</td>
                  <td>{element.address}</td>
                  <td>{element.poscode}</td>
                  <td>
                    <div
                      onClick={() => handleHistoryOrder(element)}
                      style={style.link}
                    >
                      {formatIDR.format(element.total)}
                    </div>
                  </td>
                  {element.status === "pending" ? (
                    <label className="text-warning">Waiting Approve</label>
                  ) : element.status === "success" ? (
                    <label className="text-success">Success</label>
                  ) : element.status === "cancel" ? (
                    <label className="text-danger">Cancel</label>
                  ) : null}
                  <td>
                    {element.status === "pending" ? (
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
                    ) : element.status === "success" ? (
                      <Badge
                        className="rounded-circle bg-success"
                        style={{ width: "25px" }}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Badge>
                    ) : element.status === "cancel" ? (
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
      <ModalTransaction
        showTrans={show}
        closeTrans={handleClose}
        TransUser={dataHistoryOrder}
        formatIDR={formatIDR}
      />
    </Container>
  )
}

export default Income
