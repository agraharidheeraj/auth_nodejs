import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-full">
        <Navbar/>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between bg-white py-16 px-8 lg:px-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
            Welcome ! <span className="text-indigo-600">{user?.name}</span>
          </h2>
          <p className="mt-4 text-sm text-gray-500 lg:text-base">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
            doloribus, facilis rerum, reprehenderit eos aliquid consequatur
            saepe explicabo ratione minus suscipit sequi. Voluptas corporis
            distinctio ut incidunt iste quibusdam odio!
          </p>
          <div className="mt-6 flex justify-center lg:justify-start space-x-4">
            <button className="px-4 py-2 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-700">
              Create Todos
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400">
              List Todos
            </button>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 flex items-center justify-center">
            <img
             src="https://img.freepik.com/free-vector/tiny-man-woman-standing-near-list-couple-ticking-off-items-check-list-flat-vector-illustration-daily-routine-busy-lifestyle-concept-banner-website-design-landing-web-page_74855-22067.jpg?size=626&ext=jpg"
             alt='todos'
             className="w-full h-full object-cover rounded-lg "
            />
        </div>
      </div>
    </div>
  );
};

export default Home;
