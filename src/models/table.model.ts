import { ReactNode } from "react";

type ColumnType = "string" | "boolean";
type OrderDirection = "ASC" | "DESC";

interface IColumnTemplate<T> {
  title: string;
  width: string;
  type?: ColumnType;
  valueKey?: string;
  sortable: boolean;
  render?: (row: T) => ReactNode;
}

interface ITableProps<T> {
  columns: IColumnTemplate<T>[];
  data: T[] | undefined;
  onSort?: (column: keyof T, direction: OrderDirection) => void;
  onRowClick?: (row: T) => void;
}

export type { IColumnTemplate, ColumnType, ITableProps, OrderDirection };
