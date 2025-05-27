import React, { useEffect, useState } from 'react';
import {List, ListItemText} from '@mui/material'
const Kafka = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log(event);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    
    socket.onerror = (error) => {
       console.error('WebSocket error:', error);
       };

    return () => socket.close();
  }, []);

  return (
    <div >
      <h1>Messages from Kafka:</h1>
      <List>
        {messages.map((msg, index) => (

          <ListItemText key={index}>{msg.value}</ListItemText> 
        ))}
      </List>
    </div>
  );
};

export default Kafka;




// import React, { useState } from "react";

// const Kafka = () => {
//   const [topic, setTopic] = useState("");
//   const [key, setKey] = useState("");
//   const [get, setGet] = useState(false);
//   const [msg, setMsg] = useState([]);
//   const initialValues = {
//     applicationId: "",
//     userId: "",
//     source: "",
//     message: "",
//   };
//   const [data, setData] = useState(initialValues);

//   const handleChange = (e) => {
//     setGet(false);
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleGet = () => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => setMsg(data))
//       .catch((e) => console.log(e));
//     setGet(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const params = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     };
//     fetch(
//       `http://172.16.0.192:19009/kafka/send?topic=${topic}&key=${key}`,
//       params
//     )
//       .then((res) => {
//         res.json();
//         console.log(res.status());
//       })
//       .catch((err) => console.log(err));
//     setData(initialValues);
//   };
//   return (
//     <div
//       style={{
//         border: "2px solid black",
//         display: "flex",
//         flexDirection: "column",
//         margin: "10% 25%",
//         padding: "20px",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <button onClick={handleGet}>Kafka Data</button>
//       Topic:
//       <input
//         type="text"
//         name="topic"
//         onChange={(e) => setTopic(e.target.value)}
//         required
//       />{" "}
//       <br />
//       Key:
//       <input
//         type="text"
//         name="key"
//         onChange={(e) => setKey(e.target.value)}
//         required
//       />
//       <br />
//       <form onSubmit={handleSubmit}>
//         Application Id:
//         <input
//           type="text"
//           name="applicationId"
//           onChange={handleChange}
//           required
//         />
//         <br />
//         User Id:
//         <input type="text" name="userId" onChange={handleChange} required />
//         <br />
//         Source:
//         <input type="text" name="source" onChange={handleChange} required />
//         <br />
//         Message:
//         <input type="text" name="message" onChange={handleChange} required />
//         <br />
//         <button type="submit">Create Topic</button>
//       </form>
//       {get && (
//         <div>
//           <table>
//             <thead>
//               <th>User Id</th>
//               <th>Id</th>
//               <th>Title</th>
//               <th>Body</th>
//             </thead>
//             <tbody>
//               {
//             msg.map((msg)=>( 
//             <tr key={msg.id}> 
//               <td> {msg.userId}</td>
//                <td> {msg.id}
//                 <td>{msg.title}</td>
//                 <td>{msg.body}</td>
//               </td>
//               </tr>
//             ))
          
//           }
//             </tbody>
//           </table>
          
//         </div>
//       )}
//     </div>
//   );
// };

// export default Kafka;
