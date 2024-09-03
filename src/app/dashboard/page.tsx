"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardBody,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function dashboard() {
  const [panList, setPanList] = useState<any>();
  const [panDetails, setPanDetails] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const pages = useMemo(
    () => Math.ceil(panDetails?.length / rowsPerPage),
    [panDetails?.length, rowsPerPage]
  );
  
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return panDetails?.slice(start, end);
  }, [page, rowsPerPage, panDetails]);

  const onRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };
  async function getPanDetailsCount() {
    try {
      const readPancardResponse = await fetch(
        "http://localhost:8000/read_pan_details",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (readPancardResponse) {
        const response = await fetch("http://localhost:8000/get/pan_status", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responeData = await response.json();
        // const response = await getAllDocumentsAPI();
        if (responeData.status_counts?.length > 0) {
          setPanList(responeData?.status_counts);
          setPanDetails(responeData?.stored_pans);
          let index = 0;
          setPanDetails(
            responeData?.stored_pans?.map((item: any) => {
              index = index + 1;
              return {
                SNo: index,
                PanNumber: item?.Pan_Number,
                AccountHolderName: item?.Name,
                FatherName: item?.Father_Name,
                DOB: item?.DOB,
                Status: item?.Status,
              };
            })
          );
        }
      }
    } catch (err) {
      setPanList("");
    }
  }

  useEffect(() => {
    getPanDetailsCount();
  }, []);
  console.log("panList", panList);
  console.log("panDetails",panDetails)
  return (
    <>
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <div style={{ textAlign: "left", marginTop: "3%", fontSize: "20px" }}>
          <h2>
            <b>Application Details</b>
          </h2>
        </div>
        <div  className="flex gap-4"
          style={{
            margin: "5% auto",
            width: "1100px",
            alignItems: "center",
            height: "100ph",
          }}>
          <Table
            className="pt-2"
            aria-label="Example static collection table"
            bottomContent={
              <div className="flex w-full justify-end">
                <div className="flex justify-end items-center w-full pr-4">
                  <label className="flex items-center text-small pr-3">
                    Rows per page:
                  </label>
                  <select
                    className="bg-transparent outline-none text-small"
                    onChange={onRowsPerPageChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </div> 
               <Pagination
                  isCompact
                  showControls
                  showShadow
                  page={page}
                  initialPage={1}
                  total={pages}
                  onChange={(page) => setPage(page)}
                  size={"sm"}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>S.No</TableColumn>
              <TableColumn>PAN Number</TableColumn>
              <TableColumn>Account Holder Name</TableColumn>
              <TableColumn>Father Name</TableColumn>
              <TableColumn>DOB</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={"No rows to display."}
              // isLoading={isTableLoading}
              // loadingContent={<Spinner />}
              items={items}
            >
              {items?.map((item: any) => (
                <TableRow key={item?.PanNumber}>
                  <TableCell>{item?.SNo}</TableCell>
                  <TableCell>{item?.PanNumber}</TableCell>
                  <TableCell>{item?.AccountHolderName}</TableCell>
                  <TableCell>{item?.FatherName}</TableCell>
                  <TableCell>{item?.DOB}</TableCell>
                  <TableCell>{item?.Status}</TableCell>
                  {/* <TableCell>{document?.document_data.updated_on}</TableCell>
              <TableCell>{document?.document_data.updated_by}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div
          className="flex gap-4"
          style={{
            margin: "5% auto",
            width: "1100px",
            alignItems: "center",
            height: "100ph",
          }}
        >
          {panList?.map((item: any, index: any) => {
            return (
              <div
                style={{
                  margin: "20px;",
                  width: "250px",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  padding: "5vh 24px",
                  fontSize: "20px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                }}
              >
                <Card shadow="sm" className="flex gap-4">
                  <CardBody className="flex flex-cols-4">
                    <div className="flex" key={index}>
                      {item?.title}: <b>{item?.count}</b>
                    </div>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
