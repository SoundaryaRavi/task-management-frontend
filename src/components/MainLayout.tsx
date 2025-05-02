import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-grow flex bg-gray-100 w-screen h-[calc(100vh-72px)]">
          <div className="flex-1 h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default MainLayout;
