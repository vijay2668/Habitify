import React, { useState, useEffect } from "react";
import FOMO from "../assets/FOMO.png"
import RANK from "../assets/RANK.png"

const icon = ['🏋️' , '🤸', '🥊', '🥋', '🧘', '🏃', '🏈', '🏉', '⚽️', '⚾', '🏀', '⛹️', '🎾', '🚴', '🏊', '🏂', '🤺', '🏄', '🏌️', '🧗', '🤽', '⛷️', '🤾', '🤼', '🚣', '🏇', '🏐', '🥏', '🎳', '🏏', '🏑', '🏓', '🤿', '🏸', '⛸️', '🛹', '🎮'];
const TutorialSection = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icon.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="px-4 py-24 m-28 text-base-100">
        <div className="max-w-4xl mx-auto space-y-24 md:space-y-36">
          <div className="flex flex-col gap-4 justify-center md:flex-row md:gap-12">
            <div className="space-y-4 md:space-y-6">
              <p className="uppercase font-semibold text-accent tracking-wide">
                GAMIFICATION
              </p>
              <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight">
                Enjoy your exercises
              </h2>
              <p className="text-base-100/80">
                Choose your workout avatars <span className="undefined">{icon[currentIconIndex]} </span>
                amongst 37 characters.
                <br />
                Keep track of your progress to level them up and earn XP!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            <img
              alt="3 workout avatars"
              loading="lazy"
              width="1000"
              height="1000"
              decoding="async"
              data-nimg="1"
              className="rounded-3xl aspect-square w-full sm:w-[24rem] border-2 text-transparent"
              srcSet={FOMO}
              src={FOMO}
            />
            <div className="space-y-4 md:space-y-6">
              <p className="uppercase font-semibold text-accent tracking-wide">
                FOMO
              </p>
              <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight">
                Never miss your goal
              </h2>
              <p className="text-base-100/80">
                If you don't stick to your goal, your avatar loses XP and
                shrinks... <br /> A good reason to put on your workout shoes!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            <img
              alt="workout leaderboards"
              loading="lazy"
              width="1050"
              height="597"
              decoding="async"
              data-nimg="1"
              className="rounded-3xl w-full sm:w-[24rem] border-2 text-transparent"
              srcSet={RANK}
              src={RANK}
            />
            <div className="space-y-4 md:space-y-6">
              <p className="uppercase font-semibold text-accent tracking-wide">
                social accountability
              </p>
              <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight">
                Climb leaderboards
              </h2>
              <p className="text-base-100/80">
                The more XP you earn, the higher you rank in your league. Get
                that 🥇 golden medal!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TutorialSection;
