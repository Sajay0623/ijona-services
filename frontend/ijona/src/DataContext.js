// DataContext.js
import React, { createContext, useEffect, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [datalength, setDataLength] = useState(10);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const initialData = async () => {
    await fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(json);
      })
      .catch((err) => console.log(err));
  };
  const lengthOfData = async () => {
    await fetch("")
      .then((res) => res.json())
      .then((res) => setDataLength(res.length));
  };
  useEffect(() => {
    initialData();
    lengthOfData();
  }, [limit, page]);

  const addData = () => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          name: name,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((data) => data.json())
      .then((addedData) => {
        setData((data) => [...data, addedData]);
      });
  };

  const deleteData = async (id) => {
    console.log(id, "deleteId");
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}?_page=${page}&_limit=${limit}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setData(
            data.filter((e) => {
              return e.id != id;
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        limit,
        setLimit,
        datalength,
        setEmail,
        setName,
        page,
        setPage,
        addData,

        deleteData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
