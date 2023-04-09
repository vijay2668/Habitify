import React, { useState } from "react";
import confetti from 'canvas-confetti';
import webapp from "../assets/web-app.png";
import clickSound from "../assets/clickSound.mp3";
import { Link } from "react-router-dom";

const icon = ['🏋️' , '🤸', '🥊', '🥋', '🧘', '🏃', '🏈', '🏉', '⚽️', '⚾', '🏀', '⛹️', '🎾', '🚴', '🏊', '🏂', '🤺', '🏄', '🏌️', '🧗', '🤽', '⛷️', '🤾', '🤼', '🚣', '🏇', '🏐', '🥏', '🎳', '🏏', '🏑', '🏓', '🤿', '🏸', '⛸️', '🛹', '🎮'];
const usernames = ['PixelatedPenguin', 'ElectricLioness', 'CosmicChameleon', 'RadiantRobot', 'VelvetVampire', 'LunarLabyrinth', 'NeonNinja', 'GalacticGoddess', 'SparklingSphinx', 'ShadowShaman'];

const HomeSection = () => {
  
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [randomIcon, setRandomIcon] = useState("🏃");
  const [randomName, setRandomName] = useState("NeonNinja");


  let fontSize;
  let saturate;
  let max;
  let level;
  
  const randomNumber = Math.floor(Math.random() * icon.length);
  const randomNum = Math.floor(Math.random() * usernames.length);
  
  
  function incrementCount() {
    setCount(count + 1);
    setValue(value + 15);
  }
  // console.log(randomNumber)
  

  const confettiOptions = {
    particleCount: 50,
    spread: 70,
    shapes: ['circle', 'square'],
    duration: 3000,
    origin: {
      y: 1
    }
  };

  const confettiSound  = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  switch (true) {
    case (count === 100):
      fontSize = "text-[2.5rem]";
      setCount(0);
      level = 1;
      saturate = "saturate-[0.3]";
      max = 10;
      break;
    case (count > 59):
      fontSize = "text-[6rem]";
      level = 10;
      saturate = "saturate-[1.2]";
      max = 600;
      break;
    case (count > 39):
      fontSize = "text-[5.5rem]";
      level = 9;
      saturate = "saturate-[1.1]";
      max = 300;
      break;
      case (count > 25):
      fontSize = "text-[5rem]";
      level = 8;
      saturate = "saturate-[1.1]";
      max = 210;
      break;
    case (count > 18):
      fontSize = "text-[4.6rem]";
      level = 7;
      saturate = "saturate-[1.1]";
      max = 110;
      break;
      case (count > 13):
        fontSize = "text-[4.3rem]";
        level = 6;
      saturate = "saturate-[1]";
      max = 80;
      break;
    case (count > 8):
      fontSize = "text-[4rem]";
      level = 5;
      saturate = "saturate-[0.9]";
      max = 65;
      break;
    case (count > 5):
      fontSize = "text-[3.7rem]";
      level = 4;
      saturate = "saturate-[0.8]";
      max = 55;
      break;
    case (count > 2):
      fontSize = "text-[3.4rem]";
      level = 3;
      saturate = "saturate-[0.7]";
      max = 40;
      break;
    case (count > 0):
      fontSize = "text-[3rem]";
      level = 2;
      saturate = "saturate-[0.5]";
      max = 30;
      break;
      default:
        fontSize = "text-[2.5rem]";
        level = 1;
        saturate = "saturate-[0.3]";
        max = 10;
  }

  switch (true) {
    case (value === 600 && count === 100):
      setValue(0);
      setRandomIcon(icon[randomNumber]);
      setRandomName(usernames[randomNum]);
      confetti(confettiOptions);
      confettiSound();
      break;
    case (value === 300 && count === 60):
      setValue(0);
      confetti(confettiOptions);
      confettiSound();
      break;
    case (value === 210 && count === 40):
      setValue(0);
      confetti(confettiOptions);
      confettiSound();
      break;
    case (value === 110 && count === 26):
      setValue(0);
      confetti(confettiOptions);
      confettiSound();
      break;
    case (value === 85 && count === 19):
      setValue(5);
      confetti(confettiOptions);
      confettiSound();
      break;
    case (value === 75 && count === 14):
      setValue(10);
      confetti(confettiOptions);
      confettiSound();
      break;
    case (value === 55 && count === 9):
      setValue(0);
      confetti(confettiOptions);
      confettiSound();
      break;
    case (value === 50  && count === 6):
      setValue(10);
      confetti(confettiOptions);
      confettiSound();
      break;
    case (value === 35 && count === 3):
      setValue(5);
      confetti(confettiOptions);
      confettiSound();
      break;
    case (value === 15 && count === 1):
      setValue(5);
      confetti(confettiOptions);
      confettiSound();
      break;
      default:
  }

// console.log(value)
  return (
    <>
      <section className="max-w-6xl text-base-100 mx-auto p-4 space-y-16 md:flex md:items-start md:space-y-0 md:gap-12 md:pt-24">
        <div className="space-y-8 basis-1/2">
          <h1 className="text-5xl md:text-6xl font-black">
          Make exercise more fun.
          </h1>
          <p className="text-lg text-base-100/80">
            Keep track of your exercises to level up your avatars and move up leaderboards!
          </p>
          <div className="space-y-4 text-center">
            <div className="flex flex-wrap justify-start items-center gap-4">
              <Link to="/signup">
                  <img alt="Sign up on the web" width="512" height="162" decoding="async" data-nimg="1" className="w-40 object-contain text-transparent" srcSet={webapp} src={webapp}/>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-neutral-100/10 p-4 md:p-8 rounded-3xl select-none flex gap-4 items-center relative basis-1/2">
            <div className="relative">
                <span className="absolute -top-10 md:-top-14 left-8 md:left-10 text-sm flex gap-1">
                <svg className="w-8 -rotate-45 fill-accent" viewBox="0 0 511 464" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M483.437 266.664C487.339 234.818 466.778 204.669 443.695 184.849C418.138 162.805 386.514 148.904 353.207 143.402C285.833 131.931 218.727 153.479 158.478 182.049C120.963 199.817 85.3952 221.232 51.5793 245.474C48.4395 247.733 48.7276 253.503 51.0453 255.98C53.9667 259.179 58.4111 258.773 61.5508 256.514C90.2182 236.088 120.287 217.924 151.758 202.023C180.558 187.62 210.155 174.758 241.134 165.892C301.394 149.212 368.951 149.612 421.883 186.782C446.78 204.225 472.351 233.618 468.234 266.38C467.881 270.356 471.718 273.77 475.441 273.968C480.235 274.127 483.084 270.64 483.437 266.664Z"></path><path d="M66.8645 132.22C60.385 170.516 53.9054 208.812 47.4259 247.108C46.0557 255.001 42.8711 265.271 50.5076 271.027C54.2478 274.031 59.0426 274.191 63.8964 273.687C68.7501 273.184 73.3506 272.525 78.3604 271.768C97.6783 269.346 116.899 266.514 136.217 264.092C157.991 261.086 179.609 258.334 201.383 255.329C205.321 254.611 207.722 250.149 206.847 246.464C205.876 242.37 201.921 240.282 197.983 241C162.563 245.73 127.144 250.46 92.1336 255.093C83.0887 256.159 74.141 257.634 65.0962 258.699C64.0241 258.737 61.3735 258.502 60.2425 259.202C59.2676 259.65 60.1453 258.793 60.3397 259.612C60.6104 262.575 61.0995 260.08 61.0995 260.08C61.2556 259.827 61.6093 255.851 61.7654 255.598C62.2545 253.103 62.5875 250.862 63.0766 248.367C66.091 231.002 68.852 213.482 72.0225 195.864C75.5259 176.004 78.776 155.989 82.2795 136.13C83.0426 132.056 81.2522 128.157 77.0819 126.984C72.5993 126.318 67.4715 128.4 66.8645 132.22Z"></path></svg>
                    <p className="whitespace-nowrap text-sm text-base-100/80">Tap to grow!</p>
                </span>
                <div onClick={() => incrementCount()} className={`cursor-pointer duration-200 p-4 hover:drop-shadow ${fontSize} ${saturate}`}>{randomIcon}</div>
            </div>
            <div className="flex-1">
                <div className="flex justify-start gap-2 items-center text-sm">
                    <span className="text-base-100/80">Level {level}</span>
                    <p className="flex items-center gap-0.5 bg-accent/20 py-1 px-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5 inline text-accent fill-accent"><path fillRule="evenodd" d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z" clipRule="evenodd"></path></svg>
                        <span>{count}</span>
                    </p>
                </div>
                <div className="font-semibold mb-4">{randomName}</div>
                <div className="relative h-5">
                    <progress className="progress progress-accent h-full bg-neutral" value={value} max={max}></progress>
                    <p className="absolute left-2 top-1/2 -translate-y-1/2 text-xs">XP {value} / {max}</p>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default HomeSection;
