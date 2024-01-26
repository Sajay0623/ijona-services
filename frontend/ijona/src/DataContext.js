// DataContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// creation of context
const DataContext = createContext();

//Proving the context to app
const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [datalength, setDataLength] = useState(null);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading , setLoading] = useState(false)
  const url = new URL(
    "https://65b3b050770d43aba47a3e2e.mockapi.io/mock/ijona/users"
  );
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit);

  useEffect(() => {
    initialData();
    lengthOfData();
  }, [limit, page]);

  // Function for calculating the original length of the fetched Data

  const lengthOfData = async () => {
    setLoading(true)
    await fetch("https://65b3b050770d43aba47a3e2e.mockapi.io/mock/ijona/users")
      .then((res) => res.json())
      .then((res) => { setLoading(false) ; setDataLength(res.length);});
  };
  console.log(datalength, "dataLength");

  // Fetching the rendered data
  const initialData = async () => {
      setLoading(true);
      await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((users) => {
        setLoading(false)
        setData(users);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        setLoading(false)
      });
  };

  // function for adding the data
  const addData = (closeFun) => {
    setLoading(true);
    fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        name: name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((addedData) => {
         setLoading(false)
        initialData();
        lengthOfData();
      });
    closeFun();
  };
  // function for deleting the data
  const deleteData = async (id) => {
    setLoading(true);
    await fetch(
      `https://65b3b050770d43aba47a3e2e.mockapi.io/mock/ijona/users/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
           setLoading(false)
          initialData();
          lengthOfData();
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
        initialData,
        loading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
