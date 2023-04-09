import confetti from 'canvas-confetti';
import clickSound from "../assets/clickSound.mp3";

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const saturateValues = ["saturate-[0.3]", "saturate-[0.5]", "saturate-[0.7]", "saturate-[0.8]", "saturate-[0.9]","saturate-[1]", "saturate-[1.1]", "saturate-[1.1]", "saturate-[1.2]", "saturate-[1.2]", "saturate-[1.2]"];
const max = [10,30,40,55,65,80,110,210,300,600,1000];
const fontSizes = ["text-[2.5rem]","text-[3rem]","text-[3.4rem]","text-[3.7rem]","text-[4rem]","text-[4.3rem]","text-[4.6rem]","text-[5rem]","text-[5.5rem]","text-[6rem]","text-[6.2rem]"];

const confettiOptions = {
  particleCount: 50,
  spread: 70,
  shapes: ["circle", "square"],
  duration: 3000,
  origin: {
    y: 1
  }
};

const confettiSound  = () => {
  const audio = new Audio(clickSound);
  audio.play();
};


let variables;
// user has choose 25xp per completion that means 4x or 4 days in a weeek
// below condition is based on above information
function switchCaseFunctionFor4x(count, setCount, counts, setCounts, levelIndex, setLevelIndex, total) {
  if (counts >= max[levelIndex]) {
    if (levelIndex === max.length) {
      setCounts(0);
      setCount(0);
      levelIndex = 0;
      confetti(confettiOptions);
      confettiSound();
      // set other variables here based on condition
    } else {
      setCounts(counts - max[levelIndex]);
      setLevelIndex(levelIndex + 1);
      confetti(confettiOptions);
      confettiSound();
    }
  }

  return variables = {
    fontSize: fontSizes[levelIndex],
    max: max[levelIndex],
    saturate: saturateValues[levelIndex],
    level: levels[levelIndex],
    levelIndex: levelIndex,
    count: count,
    counts: counts,
    total: total
  }
}

export default switchCaseFunctionFor4x;