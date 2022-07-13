import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS /* GROUPED_COLUMNS */ } from "./columns";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";

import { BsSortUpAlt, BsSortDown } from "react-icons/bs";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { Button } from "react-bootstrap";

export const PaginationTable = (props) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, //Page variabke
    previousPage, //Page variabke
    nextPage, //Page variabke
    canNextPage, //Page variabke
    canPreviousPage, //Page variabke
    pageOptions, //Page 1 to 20.
    gotoPage, //Select Page Number
    pageCount, //Number of pages
    setPageSize,
    prepareRow,
    state, //React-Table state
    setGlobalFilter, //Filter for all rows
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span className="sorting_icon">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BsSortDown />
                      ) : (
                        <BsSortUpAlt />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <span>
        Page{" "}
        <strong>
          {" "}
          {pageIndex + 1} of {pageOptions.length}{" "}
        </strong>
      </span>{" "}
      |
      <span>
        Go to page:{""}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value - 1) : 0;
            gotoPage(pageNumber);
          }}
          min="1"
          style={{ maxWidth: "50px" }}
        />{" "}
      </span>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[10, 25, 50].map((sizeValue, index) => (
          <option key={index} value={sizeValue}>
            Show {sizeValue}
          </option>
        ))}
      </select>
      <Button
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        variant="link"
        text="white"
      >
        <GrChapterPrevious />
      </Button>
      <Button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        variant="success"
        size="sm"
        style={{ marginRight: "5px" }}
      >
        Previous
      </Button>
      --
      <Button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        variant="success"
        size="sm"
        style={{ marginLeft: "5px" }}
      >
        Next
      </Button>
      <Button
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
        variant="link"
        text="white"
      >
        <GrChapterNext />
      </Button>
    </div>
  );
};
