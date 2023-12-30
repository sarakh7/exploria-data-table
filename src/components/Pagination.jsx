import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Pagination = () => {
  const {
    currentPage,
    setCurrentPage,
    setPageContent,
    sortedRecords,
    pageRecoredNum,
  } = useContext(AppContext);

  const pageList = [];
  let totalPage = sortedRecords.length;
  let total =
    sortedRecords.length % pageRecoredNum !== 0
      ? totalPage / pageRecoredNum + 1
      : totalPage / pageRecoredNum;

  for (let i = 1; i <= total; i++) {
    pageList.push(i);
  }

  useEffect(() => {
    setPageContent(
      sortedRecords.slice(
        currentPage * pageRecoredNum,
        currentPage * pageRecoredNum + pageRecoredNum
      )
    );
  }, [pageRecoredNum, currentPage, sortedRecords, setPageContent]);

  return (
    <div className="pagination">
      {pageList.map((page, index) => (
        <span
          key={index}
          className={`page-number ${
            currentPage === index ? "active-page" : ""
          }`}
          onClick={() => setCurrentPage(page - 1)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
