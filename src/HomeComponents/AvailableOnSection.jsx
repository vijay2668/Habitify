import React from "react";
import webapp from "../assets/web-app.png"
import { Link } from "react-router-dom";

const AvailableOnSection = () => {
  return (
    <>
      <section className="max-w-4xl mx-auto p-4 space-y-12 text-center mt-28 text-base-100">
        <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight">
          Available On Web
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/signup">
              <img
                alt="Sign up on the web"
                width="512"
                height="162"
                decoding="async"
                data-nimg="1"
                className="w-48 object-contain text-transparent"
                srcSet={webapp}
                src={webapp}
              />
          </Link>
        </div>
      </section>
    </>
  );
};

export default AvailableOnSection;
