// import { useState } from "react"
// import { Badge, Card } from "react-bootstrap"
// import { useParams } from "react-router-dom"
// import Approve from "../assets/image/Approve.png"
// import ListToping from "./ListToping"

// const style = {
//   textToping: {
//     color: "#BD0707",
//     textAlign: "center",
//   },

//   imgToping: {
//     width: "25%",
//     height: "auto",
//     marginLeft: "40%",
//   },
// }

// function SelectToping(props) {
//   const formatIDR = new Intl.NumberFormat(undefined, {
//     style: "currency",
//     currency: "IDR",
//     maximumFractionDigits: 0,
//   })

//   const DataToping = JSON.parse(localStorage.getItem("DATA_TOPING"))

//   const [topingCheck, setTopingCheck] = useState([])
//   const [topingPrice, setTopingPrice] = useState(0)

//   const handleChecked = (id, price) => {
//     let filterID = topingCheck.filter((e) => e === id)
//     if (filterID[0] !== id) {
//       setTopingCheck([...topingCheck, id])
//       setTopingPrice(topingPrice + price)
//     } else {
//       setTopingCheck(topingCheck.filter((e) => e !== id))
//       setTopingPrice(topingPrice - price)
//     }
//   }

//   return (
//     <div className="p-3">
//       <div
//         className="position-relative"
//         onClick={() => handleChecked(props.id, props.price)}
//       >
//         <Card.Img alt="" style={style.imgToping} src={props.order} />
//         <Badge
//           style={{ top: "10%", left: "65%" }}
//           className="position-absolute translate-middle bg-success p-0   border border-light rounded-circle"
//         >
//           {topingCheck.filter((Element) => Element === props.id)[0] ===
//           props.id ? (
//             <img alt="" style={{ width: "20px" }} src={Approve} />
//           ) : (
//             <></>
//           )}
//         </Badge>
//       </div>
//       {/* <Card.Img alt="" style={style.imgToping} src={ListToping.order} /> */}
//       <Card.Text className="m-0" style={style.textToping}>
//         {props.name}
//       </Card.Text>
//       <Card.Text style={style.textToping}>
//         {formatIDR.format(props.price)}
//       </Card.Text>
//     </div>
//   )
// }

// export default SelectToping
