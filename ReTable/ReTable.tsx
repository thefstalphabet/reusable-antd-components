/* eslint-disable react-hooks/exhaustive-deps */
import "./Styles.css";
import { Table, Button, Select, Space, Tag, Badge } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { UniviewService } from "../../Classes/Uniview";
import { ReNotification } from "../ReNotification";
import { headerOptions, headerStyles } from "./Constant";
import moment from "moment";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { replaceUndefinedOrNull } from "../../Methods/Methods";
import { SecureDataService } from "../../Classes/SecureData";
import {
  IHeaderButtons,
  IHeaderDropdowns,
  IHeaderTags,
  IProps,
  IUniView,
} from "./Interface";

function ReTable(props: IProps) {
  const {
    columns,
    data,
    loading,
    showHeader,
    name,
    headerTags,
    headerButtons,
    headerDropdowns,
    bordered,
    pagination,
    rowSelection,
    scroll,
    className,
    styles,
    columnOptions,
    expandable,
    showTableStats,
    uniView,
    exportOption,
    flag,
    preventInitialLoad,
  } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const urlQuery = new URLSearchParams(location.search);

  const [newColumns, setNewColumns] = useState<any>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [newData, setNewData] = useState<any>([]);
  const [isCsvBtnLoading, setIsCsvLoading] = useState(false);
  const [tableHeight, setTableHeight] = useState<number>(400);
  const [paginationPageCount, setPaginationPageCount] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [paginationCurrentChangesProps, setPaginationCurrentChangesProps] =
    useState<any>({});

  const adjustTableHeight = () => {
    // Calculate the available height for the table (e.g., window height minus some offset)
    const availableHeight = window.innerHeight - 300;
    setTableHeight(availableHeight);
  };

  const fetchDataFromUniview = async (uniViewProps: IUniView) => {
    let { uniView, viewName, apiUrl, filter, endPoint, option } = uniViewProps;
    const dataFetcher = new UniviewService(uniView, viewName, apiUrl);

    let newOrderBy;
    if (option?.orderBy) {
      newOrderBy = {
        [`${option?.orderBy?.key}`]: option?.orderBy?.order,
      };
    }

    const res = await dataFetcher.fetchData(
      filter || {},
      { ...option, orderBy: newOrderBy || {} } || {},
      endPoint
    );
    if (res.status) {
      return res?.data;
    }
  };
  const fetchTableDataFromUniview = async (uniViewProps: IUniView) => {
    setTableLoading(true);
    let { uniView, viewName, apiUrl, filter, endPoint, option, extra } =
      uniViewProps;
    const dataFetcher = new UniviewService(uniView, viewName, apiUrl);

    // updating option
    let newOrderBy;
    if (option?.orderBy) {
      newOrderBy = {
        [`${option?.orderBy?.key}`]: option?.orderBy?.order,
      };
    }
    if (option?.limit) {
      option.limit =
        paginationCurrentChangesProps?.pagination?.pageSize || option?.limit;
    }

    const res = await dataFetcher.fetchData(
      filter || {},
      {
        ...option,
        orderBy: newOrderBy || {},
        offset:
          (paginationCurrentChangesProps?.pagination?.current - 1) *
          paginationCurrentChangesProps?.pagination?.pageSize,
      } || {},
      endPoint,
      extra || {}
    );
    if (res.status) {
      const newData = replaceUndefinedOrNull(res.data);
      if (uniViewProps?.returnResponse) {
        uniViewProps.returnResponse({
          ...res,
          data: newData,
        });
      } else {
        setNewData(newData);
      }
      setPaginationPageCount(res.count);
    }
    setTableLoading(false);
  };

  const handleTableSingleRowSelect = (
    record: any,
    selected: boolean,
    selectedRows: any[],
    nativeEvent: any
  ) => {
    const key = rowSelection?.rowKey ? rowSelection?.rowKey : "id";
    const storeRowType = rowSelection?.selectRowtype;

    if (selected) {
      rowSelection?.setSelectedRowKeys([
        ...rowSelection.selectedRowKeys,
        record[`${key}`],
      ]);
      if (
        storeRowType === "allData" &&
        rowSelection?.selectedRowValues &&
        rowSelection?.setSelectedRowValues
      ) {
        rowSelection?.setSelectedRowValues([
          ...rowSelection.selectedRowValues,
          record,
        ]);
      }
    } else {
      let newItems: any = [];
      rowSelection?.selectedRowKeys.forEach((item: any) => {
        if (item !== record[`${key}`]) {
          newItems.push(item);
        }
      });
      rowSelection?.setSelectedRowKeys(newItems);
      newItems = [];
      if (
        storeRowType === "allData" &&
        rowSelection?.selectedRowValues &&
        rowSelection?.setSelectedRowValues
      ) {
        rowSelection?.selectedRowValues.forEach((item: any) => {
          if (item[`${key}`] !== record[`${key}`]) {
            newItems.push(item);
          }
        });
        rowSelection?.setSelectedRowValues(newItems);
      }
    }
  };

  const handleTableAllRowSelect = async (
    selected: boolean,
    selectedRows: any,
    changeRows: any
  ) => {
    const key = rowSelection?.rowKey ? rowSelection?.rowKey : "id";
    const storeRowType = rowSelection?.selectRowtype;

    if (selected) {
      if (uniView) {
        delete uniView?.option?.limit;
        const allTableData = await fetchDataFromUniview({
          ...uniView,
          option: {
            ...uniView?.option,
            selectFields: storeRowType === "allData" ? [] : [`${key}`],
          },
        });
        rowSelection?.setSelectedRowKeys(
          allTableData.map((ele: any) => ele[`${key}`])
        );

        if (storeRowType === "allData" && rowSelection?.setSelectedRowValues) {
          rowSelection?.setSelectedRowValues(allTableData);
        }
      } else {
        rowSelection?.setSelectedRowKeys(
          newData.map((row: any) => row[`${key}`])
        );
        if (storeRowType === "allData" && rowSelection?.setSelectedRowValues) {
          rowSelection?.setSelectedRowValues(newData);
        }
      }
    } else {
      rowSelection?.setSelectedRowKeys([]);
      if (storeRowType === "allData" && rowSelection?.setSelectedRowValues) {
        rowSelection?.setSelectedRowValues([]);
      }
    }
  };

  const setColumnSortingOption = (col: any, index: number) => {
    let newCol;
    const columnKey = col.key;
    if (
      columnOptions?.sorting &&
      columnOptions?.sorting?.columns.includes(columnKey)
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

  const getFilterOptionItemsFromUniview = async (
    tableName: string,
    viewName: string,
    apiUrl: string,
    columnKey: string
  ) => {
    let option: any = {
      orderBy: {},
      selectFields: [columnKey],
      groupBy: [columnKey],
      filters: true,
    };

    const dataFetcher = new UniviewService(tableName, viewName, apiUrl);
    const res = await dataFetcher.fetchData({}, option);
    if (res.status) {
      // changing the filter object
      return res.data.map((item: any) => {
        return {
          text: item[columnKey],
          value: item[columnKey],
        };
      });
    } else {
      return [];
    }
  };

  const setColumnFilterOption = async (col: any) => {
    let newCol;
    const columnKey = col.key;
    let isFilterItemGiven = false;
    let filterItems;
    let isMapperIsGiven = false;
    let mapper: any;

    // here we are check weather current column key is present or not in the requested columns array
    let isColumnKeyPresent = false;
    if (columnOptions?.filter) {
      if (columnOptions?.filter?.columns.includes(columnKey)) {
        isColumnKeyPresent = true;
      } else {
        columnOptions?.filter?.columns.forEach((element: any) => {
          if (typeof element === "object" && element.key === columnKey) {
            isColumnKeyPresent = true;
            if (Object.keys(element).includes("items")) {
              isFilterItemGiven = true;
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
      if (uniView && !isFilterItemGiven) {
        // calling the uniview if its provided to get filter items
        filterItems = await getFilterOptionItemsFromUniview(
          uniView.uniView,
          uniView.viewName,
          uniView.apiUrl,
          columnKey
        );
      } else if (!isFilterItemGiven) {
        filterItems = getFilterOptionItems(newData, columnKey);
      }

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

  function ArrayToCSV(headers: any, data: any, filename: any) {
    let csv = '"' + headers.join('","') + '"\n';
    data.forEach((row: any) => {
      if (!row.length) return;
      for (let i in row) row[i] = String(row[i]).replace(/"/g, '""');
      csv += '"' + row.join('","') + '"';
      csv += "\n";
    });
    const anchor = document.createElement("a");
    anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    anchor.target = "_blank";
    anchor.download = filename;
    anchor.click();
  }
  const formatTableData = (filterdata: any, columnData: any, i: number) => {
    if (columnData?.render) {
      const returnValue = columnData?.render(
        filterdata[i][columnData.dataIndex],
        filterdata[i]
      );
      return React.isValidElement(returnValue)
        ? filterdata[i][columnData.dataIndex]
        : returnValue;
    } else {
      return filterdata[i][columnData.dataIndex] || "";
    }
  };
  const generateCSVWithoutUniview = () => {
    const filterdata = rowSelection?.selectedRowKeys
      ? rowSelection?.selectedRowKeys.length > 0
        ? newData.filter((ele: any) => {
            return rowSelection?.selectedRowKeys.includes(
              ele[rowSelection.rowKey || "id"] as never
            );
          })
        : newData
      : newData;

    let finalData: string[][] = [],
      existingColumnKey: string[] = [],
      finalColumns: string[] = [];
    let temp: number = 0;
    for (let idx = 0; idx < filterdata.length; idx++) {
      newColumns.forEach((columnData: any) => {
        if (
          columnData?.dataIndex &&
          !existingColumnKey.includes(columnData?.dataIndex)
        ) {
          existingColumnKey.push(columnData?.dataIndex);
          idx === 0 && finalColumns.push(columnData?.title);
          if (!finalData?.[idx]) {
            finalData.push([formatTableData(filterdata, columnData, idx)]);
          } else {
            finalData[idx][temp] = formatTableData(filterdata, columnData, idx);
          }
          temp++;
        }
      });
      temp = 0;
      existingColumnKey = [""];
    }

    const fileName = name || "Table Data";
    ArrayToCSV(
      finalColumns,
      finalData,
      `${fileName + moment().format(" DD-MM-YY hh-mm-ss A")}.csv`
    );
    ReNotification({
      header: "Downloaded Successfully",
      description: "File Download Successful!",
      type: "success",
    });
  };

  const generateCSV = async (fileName: string | undefined) => {
    if (!uniView && !exportOption?.csv?.params?.uniView) {
      generateCSVWithoutUniview();
      return;
    }

    setIsCsvLoading(true);
    if (pagination?.total && pagination?.total > 300) {
      ReNotification({
        header: "Downloading......",
        description: "Large file size, expect longer download time.",
        type: "info",
      });
    }
    const dataFetcher = new UniviewService(
      uniView?.uniView || exportOption?.csv?.params?.uniView || "",
      uniView?.viewName || exportOption?.csv?.params?.viewName || "",
      uniView?.apiUrl || exportOption?.csv?.params?.apiUrl || ""
    );
    const orderByKey = uniView?.option?.orderBy?.key || "";
    const res = await dataFetcher.generateCSV(
      exportOption?.csv?.selectRowtype === "id" ||
        !exportOption?.csv?.selectRowtype
        ? rowSelection?.selectedRowKeys
        : rowSelection?.selectedRowValues,
      {
        orderBy: { [orderByKey]: uniView?.option?.orderBy?.order },
      },
      uniView?.filter || exportOption?.csv?.params?.filter || {},
      fileName ? fileName : exportOption?.csv?.fileName || "Data",
      rowSelection?.rowKey,
      exportOption?.csv?.columns,
      exportOption?.csv?.endPoint,
      exportOption?.csv?.params?.extra
    );
    setIsCsvLoading(false);
    if (res) {
      ReNotification({
        header: "Downloaded Successfully.",
        description: "File Download Successful! ",
        type: "success",
      });
      rowSelection?.setSelectedRowKeys([]);
      if (rowSelection?.setSelectedRowValues) {
        rowSelection?.setSelectedRowValues([]);
      }
    } else {
      ReNotification({
        header: "File Download Failed",
        description: "Please Try Again Later.",
        type: "error",
      });
    }
  };

  const handleTableChange = async (
    pagination: any,
    filters: any,
    sorter: any
  ) => {
    if (uniView) {
      const paginationLabel = `${name
        ?.replace(/\s+/g, "")
        ?.toLocaleLowerCase()}PaginationData`;
      const secureDataService = new SecureDataService();
      const paginationData = await secureDataService.encrypt({
        pagination,
        filters,
        sorter,
      });
      urlQuery.set(paginationLabel, paginationData);
      const urlSearchParams = "?" + decodeURIComponent(urlQuery.toString());
      const decrypted = await secureDataService.decrypt(
        urlQuery.get(
          `${name?.replace(/\s+/g, "")?.toLocaleLowerCase()}PaginationData`
        )
      );
      setPaginationCurrentChangesProps(JSON.parse(decrypted));
      navigate(`${location.pathname}${urlSearchParams}`);
    }
  };

  useEffect(() => {
    if (data) {
      setNewData(data);
    }
  }, [data]);

  useEffect(() => {
    let count;
    if (uniView && pagination?.total) {
      count = pagination?.total;
    } else if (!uniView) {
      if (pagination?.total || pagination?.total === 0) {
        count = pagination?.total;
      } else {
        count = newData.length;
      }
    }
    setPaginationPageCount(count);
  }, [pagination?.total]);

  useEffect(() => {
    setColumnOptions(columns);
  }, [newData, columns]);

  useEffect(() => {
    if (uniView && Object.keys(paginationCurrentChangesProps)?.length) {
      let newfilter: any = { ...uniView.filter };
      Object.keys(paginationCurrentChangesProps?.filters).forEach(
        (key: string) => {
          if (paginationCurrentChangesProps?.filters[key]) {
            newfilter[`${key}`] = {
              "=": paginationCurrentChangesProps?.filters[key]
                .map((value: any) => (value === null ? "null" : value))
                .join(","),
            };
          }
        }
      );
      fetchTableDataFromUniview({
        ...uniView,
        filter: newfilter,
      });
    }
  }, [
    paginationCurrentChangesProps?.pagination?.current,
    paginationCurrentChangesProps?.pagination?.pageSize,
  ]);

  useEffect(() => {
    if (uniView && !preventInitialLoad) {
      fetchTableDataFromUniview(uniView);
    }
  }, [flag, preventInitialLoad]);

  useEffect(() => {
    if (loading !== undefined) {
      setTableLoading(loading);
    }
  }, [loading]);

  useLayoutEffect(() => {
    adjustTableHeight();
    adjustTableHeight();
    window.addEventListener("resize", adjustTableHeight);
    return () => {
      window.removeEventListener("resize", adjustTableHeight);
    };
  }, []);

  const tableTitle = (
    <>
      <div style={headerStyles}>
        <div>
          {typeof name === "string" ? <h2>{name}</h2> : name}
          {headerTags?.map((tag: IHeaderTags) => {
            const { color, title } = tag;
            return (
              <Tag key={title} color={color}>
                {title}
              </Tag>
            );
          })}
        </div>
        <div style={headerOptions}>
          {headerDropdowns?.map((select: IHeaderDropdowns, index: number) => {
            const { styles, setSelectedValue, hide } = select;
            return (
              !hide && (
                <Select
                  key={index}
                  style={styles}
                  {...select}
                  onChange={(value: string | number, option: any) => {
                    setSelectedValue(value);
                  }}
                />
              )
            );
          })}
          {headerButtons?.map((btn: IHeaderButtons, index: number) => {
            const { title, visibility } = btn;
            return (
              (visibility || visibility === undefined) && (
                <Button key={index} {...btn}>
                  {title}
                </Button>
              )
            );
          })}
          {exportOption?.pdf && (
            <Button
              onClick={exportOption.pdf.onClick}
              type="primary"
              loading={exportOption.pdf?.loading}
              size="middle"
              icon={<FilePdfOutlined />}
              disabled={exportOption.pdf.disabled || !newData.length}
            >
              Export to PDF
            </Button>
          )}
          {exportOption?.csv && (
            <Button
              onClick={() => {
                generateCSV(name);
              }}
              type="primary"
              loading={isCsvBtnLoading}
              size="middle"
              icon={<FileExcelOutlined />}
              disabled={exportOption.csv.disabled || !newData.length}
            >
              Export to CSV
            </Button>
          )}
        </div>
      </div>
      {showTableStats && (
        <Space direction="horizontal">
          <span>
            <strong>Total Rows: </strong>
            <Badge count={paginationPageCount || 0} showZero overflowCount={9999} />
          </span>
          {rowSelection && (
            <span>
              <strong>Selected Rows: </strong>
              <Badge
                count={rowSelection?.selectedRowKeys.length}
                showZero
                overflowCount={9999}
              />
            </span>
          )}
        </Space>
      )}
    </>
  );

  const componentProps = {
    columns: columnOptions ? newColumns : columns,
    onChange: handleTableChange,
    dataSource: newData,
    loading: tableLoading,
    rowKey: rowSelection?.rowKey,
    showHeader: showHeader,
    sortDirections: columnOptions?.sorting?.sortingDirections,
    bordered: bordered,
    pagination: {
      ...pagination,
      current:
        paginationCurrentChangesProps?.pagination?.current ||
        pagination?.current,
      total: paginationPageCount,
      hideOnSinglePage: true,
      pageSizeOptions: pagination?.pageSizeOptions
        ? pagination?.pageSizeOptions
        : [10, 20, 50, 100],
    },
    scroll: {
      ...scroll,
      y: tableHeight,
    },
    expandable: {
      ...expandable,
      expandedRowKeys: expandedRows,
      onExpandedRowsChange: (expandedRows: any) => {
        setExpandedRows(expandedRows);
      },
    },
    rowSelection: rowSelection
      ? {
          ...rowSelection,
          onSelect: handleTableSingleRowSelect,
          onSelectAll: handleTableAllRowSelect,
        }
      : undefined,
    title: () => {
      return tableTitle;
    },
  };
  return (
    <div className="table">
      <Table style={styles} className={className} {...componentProps} />
    </div>
  );
}

export default ReTable;
