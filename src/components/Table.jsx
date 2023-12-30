import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const Table = () => {
  const [currentName, setCurrentName] = useState("");
  const [currentPhone] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    pageContent,
    currentPage,
    pageRecoredNum,
    sortMethod,
    setSortMethod,
    name,
    setName,
    phone,
    setPhone,
  } = useContext(AppContext);

  const handleClick = () => {
    let method = sortMethod === "asc" ? "desc" : "asc";
    setSortMethod(method);
    navigate(`?sort=${method}&name=${name}&phone=${phone}`);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setName(currentName);
    setPhone(currentPhone);
    navigate(
      `?sort=${searchParams.get(
        "sort"
      )}&name=${currentName}&phone=${currentPhone}`
    );
  };

  return (
    <>
      <div className="filter-box">
        <div className="filter-left">
          <form action="GET" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setCurrentName(e.target.value)}
            />
            {/* <input
              type="text"
              placeholder="Phone Number"
              onChange={(e) => setCurrentPhone(e.target.value)}
            /> */}
            <button className="filter-btn" onClick={handleSubmit}>
              Filter
            </button>
          </form>
        </div>
        <button className="sort-btn" onClick={handleClick}>
          Sort By Date {sortMethod === "desc" ? "🔺" : "🔻"}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>index</th>
            <th>Name</th>
            <th>Date</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {pageContent.map((record, index) => (
            <tr key={index}>
              <th>{currentPage * pageRecoredNum + index + 1}</th>
              <th>{record.name}</th>
              <th>{record.date}</th>
              <th>{record.address}</th>
              <th>{record.phone}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
