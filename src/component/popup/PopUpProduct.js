import React from "react"
import Modal from "react-bootstrap/Modal"

function ModalPopUpProduct({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 style={{ color: "#469F74" }} className="text-center m-0 px-5 py-4">
          Product Added Successfully
        </h4>
      </Modal.Body>
    </Modal>
  )
}

export default ModalPopUpProduct
