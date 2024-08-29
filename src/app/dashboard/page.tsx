"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";

export default function dashboard() {
  const [panList, setPanList] = useState<any>();
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
        if (responeData.length > 0) {
          setPanList(responeData);
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
  return (
    <>
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <div style={{ textAlign: "left", marginTop: "3%", fontSize: "20px" }}>
          <h2>
            <b>Application Details</b>
          </h2>
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
