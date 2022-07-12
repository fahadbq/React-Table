import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS /* GROUPED_COLUMNS */ } from "./columns";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";

import { BsSortUpAlt, BsSortDown } from "react-icons/bs";

export const FilteringTable = (props) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}> {column.render("Footer")} </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};
