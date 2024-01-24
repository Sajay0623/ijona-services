import React, { useContext, useState } from "react";
import { DataContext } from "./DataContext";

  

const Pagination = ({dataLength , ItemsPerPage}) => {
  const [currentPage, setCurrentPage] = useState(1);
const { data , page , limit } = useContext(DataContext);
  const indexOfLastItem = page * limit;
  const indexOfFirstItem = indexOfLastItem - limit;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
     
  const totalPages = Math.ceil(dataLength / ItemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      

      <div>
        <p>
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)} of {data.length}
        </p>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
