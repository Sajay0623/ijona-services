// DataContext.js
import React, { createContext, useEffect, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [limit , setLimit] = useState(5)
  const [page , setPage] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  // console.log(page)
  const initialData = () => {
    fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(json);
      });
  };

  useEffect(() => {
    initialData();
  }, [limit]);

     console.log(name, email)

  const addData = (item) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        name: name,
         
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((data) => data.json()).then((data)=>{console.log(data)}).then(()=>initialData());
  };

  const updateData = (id, newItem) => {
    setData();
     
  };

  const deleteData = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <DataContext.Provider value={{ data, limit , setLimit , setEmail, setName, page , setPage , addData, updateData, deleteData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
