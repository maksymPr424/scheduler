"use client";
import { store } from "../lib/store";
import { Provider } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomIcon from "./components/CustomIcon";
import FormSearchPlan from "./components/FormSearchPlan";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="pl-5 pr-5 flex-1 flex flex-col max-w-80 ">
        <Header />
        <main className="flex-1 mt-9">
          <div>
            <div className="flex justify-between items-center ">
              <h1 className="w-35 text-xl font-medium">
                Tu znajdziesz <span className="set-blue">swój plan</span> zajęć
              </h1>
              {/* <CustomIcon
                id="icon-logo-upsl"
                className="w-26 h-11 set-stroke set-fill"
              /> */}
              <span className="text-4xl text-indigo-400">UPSL</span>
            </div>
            <FormSearchPlan />
          </div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
