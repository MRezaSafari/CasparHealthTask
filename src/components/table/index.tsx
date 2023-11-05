import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

import { IColumnTemplate, ITableProps, OrderDirection } from "../../models";
import { TableContainer, EmptyState, HeaderItem } from "./table.styles";

export const Table = <T,>({
  columns,
  data,
  onSort,
  onRowClick,
}: ITableProps<T>) => {
  const handleSort = (key: keyof T | undefined, order: OrderDirection) => {
    if (!key) return;
    onSort && onSort(key, order);
  };

  const renderHeaders = () =>
    columns.map((r) => (
      <td key={r.title.toLowerCase()} width={r.width}>
        <HeaderItem>
          <span>{r.title}</span>
          {r.sortable && (
            <ul>
              <li>
                <IconChevronUp
                  className="sort-asc"
                  width={15}
                  height={15}
                  onClick={() => handleSort(r.valueKey as keyof T, "ASC")}
                />
              </li>
              <li>
                <IconChevronDown
                  data-testid="sort-desc"
                  width={15}
                  height={15}
                  onClick={() => handleSort(r.valueKey as keyof T, "DESC")}
                />
              </li>
            </ul>
          )}
        </HeaderItem>
      </td>
    ));

  const renderRows = () =>
    data &&
    [...Array(data?.length).keys()].map((row: number) => {
      const currrentRow = (data as [])[row];
      return (
        <tr
          key={`row-${row}`}
          onClick={() => onRowClick && onRowClick(currrentRow)}
        >
          {columns.map((r: IColumnTemplate<T>) => (
            <td key={r.title.toLowerCase()} width={r.width}>
              {r.render && r.render(currrentRow)}
              {r.type === "string" && r.valueKey && currrentRow[r.valueKey]}
            </td>
          ))}
        </tr>
      );
    });

  return (
    <section>
      <TableContainer cellPadding="0" cellSpacing="0" data-testid="table"> 
        <thead>
          <tr>{renderHeaders()}</tr>
        </thead>
        {data && data?.length > 0 && <tbody>{renderRows()}</tbody>}
      </TableContainer>

      {(typeof data === "undefined" || data?.length === 0) && (
        <EmptyState>No Data!</EmptyState>
      )}
    </section>
  );
};

export default Table;
