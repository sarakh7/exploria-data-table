import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { AppContext } from "./context/AppContext";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import { useSearchParams } from "react-router-dom";

function App() {
  const [searchParams] = useSearchParams();

  const [records, setRecords] = useState([]);
  const [sortedRecords, setSortedRecords] = useState([]);
  const [pageRecoredNum, setPageRecordNum] = useState(50);
  const [pageContent, setPageContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortMethod, setSortMethod] = useState(searchParams.get("sort") || "");
  //Filters
  const [name, setName] = useState(searchParams.get("name") || "");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [address, setAddress] = useState(searchParams.get("address") || "");

  const filterTable = () => {
    let newRecords = [...records];

    if (name !== "") {
      newRecords = newRecords.filter((record) =>
        record.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (sortMethod === "desc") {
      newRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortMethod === "asc") {
      newRecords.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setSortedRecords(newRecords);
  };

  const fetchData = async () => {
    try {
      const { data, status } = await axios.get("records.json");
      if (status === 200) {
        setRecords(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      filterTable();
    }
  }, [records]);

  useEffect(() => {
    filterTable();
  }, [sortMethod, name]);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        pageContent,
        setPageContent,
        pageRecoredNum,
        setPageRecordNum,
        sortMethod,
        setSortMethod,
        sortedRecords,
        setSortedRecords,
        name,
        setName,
        phone,
        setPhone,
        address,
        setAddress,
      }}
    >
      <Table />
      <Pagination />
    </AppContext.Provider>
  );
}

export default App;
