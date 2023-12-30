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
  let totalDataNumber = sortedRecords.length;
  let totalPage =
    sortedRecords.length % pageRecoredNum !== 0
      ? totalDataNumber / pageRecoredNum + 1
      : totalDataNumber / pageRecoredNum;

  for (let i = 1; i <= totalPage; i++) {
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
