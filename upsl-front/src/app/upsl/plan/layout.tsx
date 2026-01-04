"use client";

import CustomIcon from "@/app/components/CustomIcon";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectActiveDirection } from "@/features/directions/directionsSelectors";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const major = useSelector(selectActiveDirection)?.direction;
  const year = useSelector(selectActiveDirection)?.year;

  return (
    <div className="pl-5 pr-5 flex-1 flex flex-col  justify-between ">
      <div>
        <Header>
          <Link href="/" className="set-blue text-base">
            <CustomIcon id="icon-search" className="w-5 h-5 set-fill " />
          </Link>
        </Header>
        <h1 className="set-primary-color text-2xl font-semibold mt-4">
          {major} {year}
        </h1>
      </div>
      <div className="my-2">{children}</div>
      <Footer />
    </div>
  );
}
