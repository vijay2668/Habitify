import React, { useState } from "react";

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [display, setDisplay] = useState(false);

  

  const handleHover = () => {
    setIsHovered(!isHovered);
    setDisplay(true);
  };

  return (
    <>
      <section className="max-w-6xl mx-auto p-4 text-base-100 mt-28">
        <div className="md:text-center relative">
          <div className={`${isHovered ? 'hidden' : 'block'} ${display? "hidden" : "block"} w-14 absolute right-40 -top-24 text-base-100/80`}>
            <svg className="rotate-90" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 43.1 85.9" style={{ enableBackground: 'new 0 0 43.1 85.9' }} xmlSpace="preserve">
            <path strokeLinecap="round" strokeLinejoin="round" className="st0 draw-arrow" d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1" />
            <path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-1" d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58" />
            <path strokeLinecap="round" strokeLinejoin="round" className="draw-arrow tail-2" d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9" />
            </svg>
            <div className="absolute top-12 -right-16 text-xl font-bold">Hover&nbsp;Me</div>
          </div>
          <div className="flex flex-col">
            <h2 onMouseEnter={handleHover} onMouseLeave={handleHover} className="font-extrabold flex gap-3 mx-auto items-center text-4xl md:text-5xl mb-4 md:mb-6 text-shadow text-neutral">
              Exercise regularly is <p className={`${display? "block" : "hidden"} font-normal uppercase text-base-100/80 child`}>not so</p>challenging
            </h2>
            <p className="md:text-lg text-base-100/80 opacity-80 mb-12 md:mb-20">
              80% of New Year's resolutions fail in 2 months...
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full p-4 md:p-8 rounded-3xl bg-neutral-100/10 text-left">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-8 ">
              <span className="text-5xl md:text-6xl">🎯</span>
              <div>
                <div className="card-title pb-2">Decide on a goal</div>
                <div className=" opacity-80">
                  <div>"I'd like to get thinner"</div>
                  <div>"I want to work out 3x a week"</div>
                </div>
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 opacity-30 rotate-90 md:rotate-0"
          >
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="flex-1 w-full rounded-3xl p-4 md:p-8 bg-neutral-100/10 text-left">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-8">
              <span className="text-5xl md:text-6xl -scale-x-1">🏃</span>
              <div>
                <div className="card-title pb-2">Do your best</div>
                <div className="opacity-80">
                  <div>Invest on some fresh footwear</div>
                  <div>Consider joining a gym</div>
                </div>
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 opacity-30 rotate-90 md:rotate-0"
          >
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="flex-1 w-full rounded-3xl p-4 md:p-8 bg-neutral-100/10 text-left">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-8">
              <span className="text-5xl md:text-6xl">🤦</span>
              <div>
                <div className="card-title pb-2">Yet life goes on as usual...</div>
                <div className=" opacity-80">
                  <div>I lack motivation</div>
                  <div>I forget my new routine</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
