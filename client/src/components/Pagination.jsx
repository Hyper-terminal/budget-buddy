import React, { Fragment, useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";

const Pagination = ({
  totalPageCount,
  currentPageProp,
  onPageSelect,
  limit,
  hasNextPage,
  hasPrevPage,
}) => {
  // Onclick handlers for the butons
  const onNextPage = () => {
    if (hasNextPage) {
      const nextPage = parseInt(currentPageProp) + 1;
      onPageSelect(nextPage, parseInt(limit));
    }
  };
  const onPrevPage = () => {
    if (hasPrevPage) {
      const prevPage = parseInt(currentPageProp) - 1;
      onPageSelect(prevPage, parseInt(limit));
    }
  };

  // last page numbers for pagination design
  const generatePageNumbers = () => {
    const numberOfPageNumbersToShow = 3; // Adjust this based on how many page numbers you want to display
    const pages = [];

    if (totalPageCount <= numberOfPageNumbersToShow) {
      // If there are fewer pages than the specified number, display all pages.
      for (let i = 1; i <= totalPageCount; i++) {
        pages.push(i);
      }
    } else {
      // Display a range of page numbers with "..." in the middle.
      const halfRange = Math.floor(numberOfPageNumbersToShow / 2);
      const lowerBound = Math.max(currentPageProp - halfRange, 1);
      const upperBound = Math.min(currentPageProp + halfRange, totalPageCount);

      if (lowerBound > 1) {
        pages.push(1);

        if (lowerBound > 2) {
          pages.push("..."); // Add "..." if there are more pages before the range.
        }
      }

      for (let i = lowerBound; i <= upperBound; i++) {
        pages.push(i);
      }

      if (upperBound < totalPageCount) {
        if (upperBound < totalPageCount - 1) {
          pages.push("..."); // Add "..." if there are more pages after the range.
        }
        pages.push(totalPageCount);
      }
    }

    return pages;
  };

  const handlePageSelect = (pageNumber) => {
    if (pageNumber !== "..." && pageNumber !== currentPageProp) {
      onPageSelect(pageNumber, limit); // Call the onPageSelect function with the selected page
    }
  };

  return (
    <Box>
      <Button variant="dark" onClick={onPrevPage}>
        Previous
      </Button>
      {generatePageNumbers().map((pageNumber, index) => (
        <Fragment key={index}>
          {pageNumber === "..." ? (
            <span className="mx-2">...</span>
          ) : (
            <Button
              variant="dark"
              onClick={() => handlePageSelect(pageNumber)} // Subtract 1 to match the page index
            >
              {pageNumber}
            </Button>
          )}
        </Fragment>
      ))}
      <Button onClick={onNextPage} variant="dark">
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
