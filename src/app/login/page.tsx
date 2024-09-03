"use client";
import React, { useEffect, useState } from "react";

import { Input, Button, Card, CardBody } from "@nextui-org/react";

import { redirect } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { start } from "repl";
import { getCookie, setCookie } from "cookies-next";
import PageSpinner from "@/components/spinner/PageSpinner";
//import { cookies } from "next/headers";

export default function login() {
  const [loginemail, setLoginEmail] = useState("");
  const [loginpassword, setLoginPassword] = useState("");
  const [loginerrors, setLoginErrors] = useState<any>({});
  const router = useRouter();
  const [loadSpinner, setLoadSpinner] = useState(false);

  const validateForm = () => {
    let loginerrors = { loginemail: "", loginpassword: "" };
    let isFormValid = true;
    if (!loginemail) {
      loginerrors.loginemail = "Email is required.";
      isFormValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginemail)) {
      loginerrors.loginemail = "Email is invalid.";
      isFormValid = false;
    }

    if (!loginpassword) {
      loginerrors.loginpassword = "Password is required.";
      isFormValid = false;
    } else if (loginpassword.length < 6) {
      loginerrors.loginpassword = "Password must be at least 6 characters.";
      isFormValid = false;
    }
    setLoginErrors(loginerrors);
    return isFormValid;
  };

  const loginSubmit = async () => {
    if (validateForm()) {
      //cookies().set("userName", loginemail);

      try {
        setLoadSpinner(true)
        const loginResponse = await fetch(
          "http://localhost:8000/users/login_api",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: loginemail,
              password: loginpassword,
            }),
          }
        );
        const data = await loginResponse.json();
        setCookie("userEmail", loginemail);
        setLoadSpinner(false)
        router.push("./dashboard");
      } catch (error: any) {
        //toast.error("Error encoutered at login!", error.message);
      }
    } else {
      //toast.error("Form has errors. Please correct them.");
    }
  };
  return (
    <>
      {loadSpinner && <PageSpinner />}
      <main
        className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-sky-200"
        style={{ height: "100vh", alignItems: "center" }}
      >
        <Card className="max-w-full w-[740px] h-[360px]">
          <CardBody className="overflow-hidden">
            <div className="bg-white rounded-2xl shadow-2xl flex align-center gap-4">
              <img width="350" height={600} alt="" src="/PANCARDIMG.PNG" />
              <div
                className="bg-white flex-wrap md:flex-nowrap  "
                style={{
                  //padding: "24px",
                  fontSize: "16px",
                }}
              >
                <div className="bg-white">
                  <div className="flex flex-col w-full">
                    <h4>
                      <b>Log in</b>
                    </h4>
                    <br />
                    <form className="flex flex-col gap-3">
                      <p className="text-left">Email:</p>
                      <Input
                        isRequired
                        value={loginemail}
                        placeholder="Enter your email"
                        onChange={(e: any) => setLoginEmail(e.target.value)}
                        type="email"
                        variant="bordered"
                      />
                      {loginerrors.loginemail && (
                        <p className="text-sm text-red-500 ">
                          {loginerrors.loginemail}
                        </p>
                      )}
                      <p className="text-left">Password:</p>
                      <Input
                        isRequired
                        placeholder="Enter your password"
                        value={loginpassword}
                        type="password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                        variant="bordered"
                      />
                      {loginerrors.loginpassword && (
                        <p className="text-sm text-red-500 ">
                          {loginerrors.loginpassword}
                        </p>
                      )}
                      <div className="flex gap-2 justify-end pt-4 pb-2">
                        <Button fullWidth color="primary" onClick={loginSubmit}>
                          Login
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </main>
    </>
  );
}
