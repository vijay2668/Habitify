import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-neutral max-w-6xl mx-auto p-4 flex justify-between mb-0 text-base-100">
        <div className="flex gap-2 items-center">
            <p className="text-4xl bg-gray-700 p-1 pb-2 rounded-2xl shadow-lg hover:animate-popup">
              🚴
            </p>
          <p className="font-bold text-lg">Habitify</p>
        </div>
        <Link className="btn btn-ghost hover:text-base-100/80 font-bold hover:bg-accent" to="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default Navbar;
