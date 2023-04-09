import React from "react";
import { Link } from "react-router-dom";

const PriceSection = () => {
  return (
    <>
      <section className="max-w-4xl mx-auto p-4 space-y-12 mt-28 text-base-100">
        <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight md:text-center">
          Level up workout avatars!
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-12">
          <div className="p-8 bg-neutral-100/10 rounded-3xl space-y-4 border-2 hover:border-accent transition-colors duration-300 basis-1/2">
            <p className="text-lg font-semibold">Discover</p>
            <p className="text-base-100/80">
              Start free and see how it works for you
            </p>
            <div className="text-4xl font-extrabold tracking-tight">Free</div>
            <Link className="btn text-accent hover:text-base-100 bg-neutral-100/10 hover:bg-accent btn-block btn-outline border-accent hover:border-accent" to="/signup">
                Get started
            </Link>
            <ul className="space-y-4 text-base-100/80">
              <li className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 inline text-accent"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                1 workout avatar
              </li>
              <li className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 inline text-accent"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                Compete on 1 leaderboard
              </li>
              <li className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 inline text-accent"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                Sync on Web
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PriceSection;
