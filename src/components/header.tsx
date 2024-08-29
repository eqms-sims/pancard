"use client";
import React from "react";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import Image from "next/image";
import { cn, Tooltip, Button } from "@nextui-org/react";
import { getCookie } from "cookies-next";

const Header = () => {
  //   const pathName = usePathname();
  //const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const userName: any = getCookie("userEmail");
  const router = useRouter();

  function handleLogOut() {
    router.push("./login");
  }

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 bg-sky-500`,
        {
          "bg-sky-500": !selectedLayout,
          "bg-white/75 backdrop-blur-lg": selectedLayout,
          // "border-b border-gray-200 bg-blue": selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4 bg-sky-500">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            {/* <Image
              src="/PANCARDIMG.PNG"
              alt="PANCARDIMG.PNG"
              width={100}
              height={25}
            /> */}
          </Link>
        </div>
        <div className="flex flex-row space-x-3 items-center">
          <span className="font-semibold text-sm">{`${userName}`}</span>
          <Tooltip content="Log Out" style={{ margin: "2px" }}>
            <Button
              color="primary"
              //isIconOnly
              radius="full"
              //className="flex items-center justify-center w-20 h-10 rounded-full bg-white focus:outline-none transition-transform transform hover:scale-105"
              onClick={() => handleLogOut()}
            >
              Log out
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Header;
