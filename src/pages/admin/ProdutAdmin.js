import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react"
import { Container, Button, Table, Stack } from "react-bootstrap"
import { useMutation, useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { API } from "../../confiq/api"
import DeleteData from "../../component/modal/Delete"
import Approve from "../../assets/image/Approve.png"
import Cancel from "../../assets/image/Cancel.png"

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

function ProductAdmin() {
  const navigate = useNavigate()
  const [idDelete, setIdDelete] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleEdit = (id) => {
    navigate("/UpdateProduct/" + id)
  }

  const handleDelete = (id) => {
    setIdDelete(id)
    handleShow()
  }

  const { data: productAdmin, refetch } = useQuery(
    "productAdminCache",
    async () => {
      const res = await API.get("/products")
      return res.data.data
    }
  )

  const deleteById = useMutation(async (id) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      }
      await API.delete(`/product/${id}`, config)
      refetch()
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose()
      // execute delete data by id function
      deleteById.mutate(idDelete)
      setConfirmDelete(null)
    }
  }, [confirmDelete])

  return (
    <>
      <Container className="mt-5">
        <h3 style={style.textTitle} className="my-5">
          Product List
        </h3>
        <Table bordered hover>
          <thead>
            <tr style={style.bgColor}>
              <th>No</th>
              <th>Name Product</th>
              <th>Price</th>
              <th>Image</th>
              <th style={style.textCenter}>Action</th>
            </tr>
          </thead>
          <tbody>
            {productAdmin?.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.nameproduct}</td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={item.image}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <Stack
                    direction="horizontal"
                    gap={3}
                    className="justify-content-center"
                  >
                    <Button
                      className="w-50 p-0"
                      size="sm"
                      style={{ border: "white", backgroundColor: "#0ACF83" }}
                      onClick={() => {
                        handleEdit(item.id)
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      className="w-50 p-0"
                      size="sm"
                      style={{ border: "white", backgroundColor: "#FF0742" }}
                      onClick={() => {
                        handleDelete(item.id)
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  )
}

export default ProductAdmin
