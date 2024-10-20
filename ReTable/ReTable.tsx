import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { Button, ButtonProps, Table } from "antd";
import "./ReTableStyles.css";
import { SortOrder } from "antd/es/table/interface";
interface IHeader {
  headerButtons?: ButtonProps[];
  title?: string | ReactNode;
}
interface IPagination {
  disabled?: boolean;
  pageSizeOptions?: string[] | number[];
  total?: number;
  current?: number;
}
interface IProps {
  className?: string;
  columns: any;
  data?: unknown[];
  loading?: boolean;
  name?: string;
  header?: IHeader;
  pagination?: IPagination;
  scroll?: IScroll;
  columnOptions?: IColumnOptions;
  refreshTable?: boolean;
}
interface IScroll {
  x?: number | true;
  y?: number | "max-content";
}

interface IFilterItem {
  text: string;
  value: number | string | boolean;
}
interface IKeysWFilterItems {
  key: string;
  items: IFilterItem[];
}
interface IKeysWAction {
  key: string;
  action?: (value: number | string) => number | string;
}
interface IColumnOptions {
  sorting?: {
    columnsKeys: string[];
    sortingDirections?: SortOrder[];
  };
  filter?: {
    columnsKeys: Array<string | IKeysWFilterItems | IKeysWAction>;
    filterSearch?: boolean;
  };
}
export default function ReTable(props: IProps) {
  const {
    columns,
    data,
    loading,
    pagination,
    scroll,
    className,
    columnOptions,
    header,
  } = props;

  const [newColumns, setNewColumns] = useState<any>([]);
  const [newData, setNewData] = useState<any>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [tableHeight, setTableHeight] = useState<number>(400);

  const handleTableChange = async (
    pagination: any,
    filters: any,
    sorter: any
  ) => {
    console.log(pagination, filters, sorter);
  };

  const setColumnSortingOption = (col: any, index: number) => {
    console.log(index);
    let newCol;
    const columnKey = col.key;
    if (
      columnOptions?.sorting &&
      columnOptions?.sorting?.columnsKeys.includes(columnKey)
    ) {
      const dataType = typeof newData[0][columnKey]; // getting data type of column data
      newCol = {
        ...col,
        sorter: (a: any, b: any) => {
          switch (dataType) {
            case "string":
              return a[columnKey]?.localeCompare(b[columnKey]);
            case "number":
              return a[columnKey] - b[columnKey];
            case "boolean":
              return (a[columnKey] ? 1 : -1) - (b[columnKey] ? 1 : -1);
            default:
              break;
          }
        },
      };
    } else return col;
    return newCol;
  };

  const getFilterOptionItems = (tableData: object[], key: string) => {
    let uniqueItems: object[] = [];
    tableData.forEach((data: any) => {
      if (data.hasOwnProperty(key)) {
        const newItem = {
          text: data[key] ? data[key] : "-",
          value: data[key],
        };
        const isAlreadyPresent = uniqueItems.some((item: any) => {
          return item.text === newItem.text && item.value === newItem.value;
        });
        if (!isAlreadyPresent) {
          uniqueItems.push(newItem);
        }
      }
    });
    return uniqueItems;
  };

  const setColumnFilterOption = async (col: any) => {
    let newCol;
    const columnKey = col.key;
    // let isFilterItemGiven = false;
    let filterItems;
    let isMapperIsGiven = false;
    let mapper: any;

    // here we are check weather current column key is present or not in the requested columns array
    let isColumnKeyPresent = false;
    if (columnOptions?.filter) {
      if (columnOptions?.filter?.columnsKeys.includes(columnKey)) {
        isColumnKeyPresent = true;
      } else {
        columnOptions?.filter?.columnsKeys.forEach((element: any) => {
          if (typeof element === "object" && element.key === columnKey) {
            isColumnKeyPresent = true;
            if (Object.keys(element).includes("items")) {
              // isFilterItemGiven = true;
              filterItems = element.items;
            }

            if (Object.keys(element).includes("action")) {
              isMapperIsGiven = true;
              mapper = element.action;
            }
          }
        });
      }
    }

    if (isColumnKeyPresent) {
      filterItems = getFilterOptionItems(newData, columnKey);

      // mapping the filter when action is present
      if (isMapperIsGiven) {
        const mappedItems = filterItems.map((fil: any) => {
          return {
            text: mapper(fil.value),
            value: fil.value,
          };
        });
        filterItems = mappedItems;
      }

      newCol = {
        ...col,
        filterSearch: columnOptions?.filter?.filterSearch,
        filters: filterItems,
        onFilter: (value: string | number | boolean, row: any) => {
          const typeOfValue = typeof value;
          if (typeOfValue === "string") {
            return row[columnKey]?.includes(value);
          } else {
            return String(row[columnKey]).includes(String(value));
          }
        },
      };
    } else return col;
    return newCol;
  };

  const setColumnOptions = async (columns: any) => {
    const newColumns = await Promise.all(
      columns.map(async (col: any, index: number) => {
        let newCol;
        newCol =
          newData.length > 0 ? setColumnSortingOption(col, index) : { ...col };
        newCol = await setColumnFilterOption(newCol);
        return newCol;
      })
    );
    setNewColumns(newColumns);
  };

  const tableHeader = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {typeof header?.title === "string" ? (
          <h1>{header?.title}</h1>
        ) : (
          header?.title
        )}
        <div style={{ display: "grid", gridAutoFlow: "column", gap: "1rem" }}>
          {header?.headerButtons?.map((btn: any, index: number) => {
            const { title, visibility } = btn;
            return (
              (visibility || visibility === undefined) && (
                <Button key={index} {...btn} type="primary">
                  {title}
                </Button>
              )
            );
          })}
        </div>
      </div>
    </>
  );

  const adjustTableHeight = () => {
    const availableHeight = window.innerHeight - 300;
    setTableHeight(availableHeight);
  };
  useLayoutEffect(() => {
    adjustTableHeight();
    adjustTableHeight();
    window.addEventListener("resize", adjustTableHeight);
    return () => {
      window.removeEventListener("resize", adjustTableHeight);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setNewData(data);
    }
  }, [data]);

  useEffect(() => {
    if (loading !== undefined) {
      setTableLoading(loading);
    }
  }, [loading]);

  useEffect(() => {
    setColumnOptions(columns);
  }, [newData, columns]);

  let tableProps = {
    columns: columnOptions ? newColumns : columns,
    onChange: handleTableChange,
    dataSource: newData,
    loading: tableLoading,
    sortDirections: columnOptions?.sorting?.sortingDirections || [
      "descend",
      "ascend",
    ],
    pagination: {
      ...pagination,
      hideOnSinglePage: true,
      pageSizeOptions: pagination?.pageSizeOptions
        ? pagination?.pageSizeOptions
        : [10, 20, 50, 100],
    },
    scroll: {
      ...scroll,
      y: tableHeight,
    },
    title: () => {
      return tableHeader;
    },
  };

  return (
    <div className="table-container">
      <Table className={className} {...tableProps} />
    </div>
  );
}
