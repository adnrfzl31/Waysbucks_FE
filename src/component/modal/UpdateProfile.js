import React, { useContext, useEffect, useState } from "react"
import { Alert, Button, Card, FloatingLabel, Form } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"

const style = {
  header: {
    fontWeight: "900",
    fontSize: "30px",
    lineHeight: "49px",
  },

  ImgProfile: {
    position: "relative",
    width: "150px",
    height: "180px",
  },

  form: {
    backgroundColor: "#FFF3F7",
    border: "2px solid #bd0707",
    color: "#b9b9b9",
  },

  colorTextarea: {
    color: "#b9b9b9",
  },

  formTextarea: {
    height: "100px",
    resize: "none",
    backgroundColor: "#FFF3F7",
    color: "#b9b9b9",
    border: "2px solid #bd0707",
  },

  bgButton: {
    color: "white",
    backgroundColor: "#EE4622",
  },
}
function FormProfile({ show, onHide, setProfileShow }) {
  const [message, setMessage] = useState(null)

  const [preview, setPreview] = useState(null)
  const [dataProfile, setDataProfile] = useState({
    fullname: "",
    phone: "",
    address: "",
    image: "",
  })

  let { data: Profile, refetch } = useQuery("ProfileCache", async () => {
    const response = await API.get("/user")
    return response.data.data
  })

  useEffect(() => {
    if (Profile) {
      setPreview(Profile.image)
      setDataProfile({
        ...dataProfile,
        fullname: Profile.fullname,
        phone: Profile.phone,
        address: Profile.address,
      })
    }
  }, [Profile])

  const handleOnChange = (e) => {
    setDataProfile({
      ...dataProfile,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      const formData = new FormData()
      formData.set("fullname", dataProfile.fullname)
      formData.set("phone", dataProfile.phone)
      formData.set("address", dataProfile.address)
      if (dataProfile.image) {
        formData.set("image", dataProfile.image[0], dataProfile.image[0]?.name)
      }

      const response = await API.patch("/user-update", formData, config)

      refetch()
      setProfileShow(false)
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      )
      setMessage(alert)
      console.log(error)
    }
  })

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body>
        <Modal.Title style={style.header} className="mb-3">
          Update Profile
        </Modal.Title>
        {message && message}
        <Form
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="w-100 m-auto mt-3 d-grid gap-2"
        >
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Control
              onChange={handleOnChange}
              value={dataProfile?.fullname}
              name="fullname"
              style={style.form}
              type="text"
              placeholder="Fullname"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Control
              onChange={handleOnChange}
              value={dataProfile?.phone}
              name="phone"
              style={style.form}
              type="number"
              placeholder="Phone"
            />
          </Form.Group>
          <FloatingLabel
            className="mb-3"
            controlId="floatingTextarea2"
            style={style.colorTextarea}
            label="Address"
          >
            <Form.Control
              onChange={handleOnChange}
              value={dataProfile?.address}
              name="address"
              as="textarea"
              placeholder="Address"
              style={style.formTextarea}
            />
          </FloatingLabel>
          {preview && (
            <Card.Img
              variant="top"
              src={preview}
              alt={preview}
              style={style.ImgProfile}
            />
          )}
          <Form.Group className="mb-3" controlId="phone">
            <Form.Control
              onChange={handleOnChange}
              name="image"
              style={style.form}
              type="file"
              placeholder="Image"
            />
          </Form.Group>
          <Button variant="danger" className="fw-bold" type="submit">
            Update Profile
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default FormProfile
