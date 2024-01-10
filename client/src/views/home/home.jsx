import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities } from "../../redux/actions";
import Nav from "../../components/Nav/nav";
import Cards from "../../components/Cards/Cards";
import FiltersNav from "../../components/Filters/Filters"
import Footer from "../../components/Footer/Footer"
import "./home.css";

function Home() {
  const INITIAL_PAGE = 1;
  const [page, setPage] = useState(INITIAL_PAGE);
  const cardsPerPage = 10;
  const maxPageNumbers = 5; // Máximo de índices a mostrar en la paginación

  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities())
  }, [dispatch]);

  const indexOfLastCard = page * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = countries.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(countries.length / cardsPerPage);

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const middlePageIndex = Math.ceil(maxPageNumbers / 2);
    let startPageIndex = page - middlePageIndex + 1;
    let endPageIndex = page + middlePageIndex - 1;

    if (totalPages <= maxPageNumbers) {
      startPageIndex = 1;
      endPageIndex = totalPages;
    } else {
      if (startPageIndex < 1) {
        startPageIndex = 1;
        endPageIndex = maxPageNumbers;
      } else if (endPageIndex > totalPages) {
        startPageIndex = totalPages - maxPageNumbers + 1;
        endPageIndex = totalPages;
      }
    }

    for (let i = startPageIndex; i <= endPageIndex; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => setPage(pageNumber)}
        className={page === pageNumber ? "button-pagactive" : "button-pagination"}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div>
      <Nav />
      <FiltersNav/>
      <div className='custom-select'>
        <button className='button-pagination'
          disabled={page === 1}
          onClick={handlePreviousPage}
        >
          {'<<'}
        </button>
        {renderPageNumbers()}
        <button className='button-pagination'
          disabled={page === totalPages}
          onClick={handleNextPage}
        >
          {'>>'}
        </button>
      </div>
      <Cards countries={currentCards} />
      <Footer/>
    </div>
  );
}

export default Home;