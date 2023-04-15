import React,{useState, useEffect} from "react";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../assets/Loader";
import switchCaseFunctionFor1x from '../SwitchCaseFunctions/switchCaseFunctionFor1x';
import switchCaseFunctionFor2x from '../SwitchCaseFunctions/switchCaseFunctionFor2x';
import switchCaseFunctionFor3x from '../SwitchCaseFunctions/switchCaseFunctionFor3x';
import switchCaseFunctionFor4x from '../SwitchCaseFunctions/switchCaseFunctionFor4x';
import switchCaseFunctionFor5x from '../SwitchCaseFunctions/switchCaseFunctionFor5x';
import switchCaseFunctionFor6x from '../SwitchCaseFunctions/switchCaseFunctionFor6x';
import switchCaseFunctionFor7x from '../SwitchCaseFunctions/switchCaseFunctionFor7x';
import { Link } from "react-router-dom";

const medal = ["🥇", "🥈", "🥉", 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
const Work = () => {
  // this will contain user uid which is saved in local storage
  const [value, setValue] = useState(null)
  // this loading is helpfull for data receiving before component to render
  const [loading, setLoading] = useState(true)
  // this will contain user data
  const [data, setData] = useState(null)
  // this will contain users datas
  const [datas, setDatas] = useState(null)
  
  // this part receives the user data
  useEffect(() => {
    setValue(localStorage.getItem("userUID"));
    const getData = async ()=>{
      const docRef = doc(db, "users", value);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setLoading(false);
        setData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    
    const timeoutId = setTimeout(() => {
      getData();
    }, 50);
    
    return () => {
      clearTimeout(timeoutId);
    }
  }, [value]);
  
  // this is a counter function for increament & decreament
  const [count, setCount] = useState();
  // this is for progress value
  const [counts, setCounts] = useState();
  // this is for total xp
  const [total, setTotal] = useState();
  // this is for after level up changes
  const [levelIndex, setLevelIndex] = useState();
  
  // this part set's the variables after receiving data
  useEffect(()=>{
    setCount(data?.count);
    setCounts(data?.counts);
    setTotal(data?.total);
    setLevelIndex(data?.levelIndex);
  },[data])
  
  
  // this part receives the users datas
  useEffect(() => {
    const getDatas = async ()=>{
      const docRef = doc(db, "hero-fit", "players");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // console.log("Document datas:", docSnap.data());
        // this is for to see array in depth
        let d = Object.entries(docSnap.data())
        // this part rank's the users on based on total & highest XP
        d.sort((a, b) => b[1].total - a[1].total)
        // this part filter out the users with the same user level
        const array = d.filter(obj => {
          return obj[1].level === data?.level;
        });
        setDatas(array);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    
    const timeoutId = setTimeout(() => {
      getDatas();
    }, 50); // add a delay of 1 second (1000 milliseconds)
    
    return () => {
      clearTimeout(timeoutId);
    }
  }, [datas]);
  
  // this is a increament function
  function incrementCount() {
    setCount(count + 1);
    setCounts(counts + data?.xp_per_completion)
    setTotal(total  + data?.xp_per_completion)
  }

  // it helps to check the btn is disabled or not 
  const [isDisabled, setIsDisabled] = useState(false);
  // it saves the btn clicked date to make btn clikable and unclikable for 1 day
  const [btnDisableDate, setBtnDisableDate] = useState(undefined);
  // it saves the btn clicked last time to call decreament function and decreament according to weeks missed out
  const [lastClickTime , setLastClickTime ] = useState(undefined);
  
  // this is a decreament function
  const decrementCount = (weeks) => {
    setCount(count - weeks);
    setCounts(counts - data?.xp_per_completion * weeks);
    setTotal(total  - data?.xp_per_completion * weeks);
  }

  // this part sets the btn clickable & unclickable
  // and also to call decreament if user has not clicked the btn atleast once in a week 
  useEffect(() => {
    const disableDateStr = data?.disableDate;
    const lastClickTime = data?.lastClickTime;
    if (disableDateStr) {
      const disableDate = disableDateStr?.toDate();
      if (disableDate > new Date()) {
        setIsDisabled(true);
      } else {
        updateDoc(doc(db, "users", value),{
          disableDate: deleteField()
        });
      }
    }
    if(lastClickTime){
      const diff = Date.now() - lastClickTime;
      const diffInWeeks = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)); // Round down to nearest week
      const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      if (!lastClickTime || lastClickTime < weekAgo) {
        // Call the decrementCount function
        decrementCount(diffInWeeks);
      }
    }
  }, [data?.disableDate,data?.lastClickTime]);
  // console.log(data?.lastClickTime < weekAgo)

  // this is for setting the variables
  const handleClick = () => {
    setIsDisabled(true);
    const now = new Date();
    setBtnDisableDate(new Date(now.getTime() + 24 * 60 * 60 * 1000));
    setLastClickTime(Date.now());
  };
            
            
  // this function triggers modal btn with complete btn
  function modalButton() {
    const hiddenButton = document.querySelector('#my-modal-3');
    hiddenButton.click();
    incrementCount();
    handleClick();
  }

  // this will contains the fontsizes, saturate, levels,max,etc
  const [variables, setVariables] = useState()
  // this part calls the function based on their users choosen goal per week
  useEffect(()=>{
      switch(true){
        case data?.goal_per_week === 1:
          setVariables(switchCaseFunctionFor1x(count,setCount,counts,setCounts,levelIndex,setLevelIndex,total))
          break;
        case data?.goal_per_week === 2:
          setVariables(switchCaseFunctionFor2x(count,setCount,counts,setCounts,levelIndex,setLevelIndex,total))
          break;
        case data?.goal_per_week === 3:
          setVariables(switchCaseFunctionFor3x(count,setCount,counts,setCounts,levelIndex,setLevelIndex,total))
          break;
        case data?.goal_per_week === 4:
          setVariables(switchCaseFunctionFor4x(count,setCount,counts,setCounts,levelIndex,setLevelIndex,total))
          break;
        case data?.goal_per_week === 5:
          setVariables(switchCaseFunctionFor5x(count,setCount,counts,setCounts,levelIndex,setLevelIndex,total))
          break;
        case data?.goal_per_week === 6:
          setVariables(switchCaseFunctionFor6x(count,setCount,counts,setCounts,levelIndex,setLevelIndex,total))
          break;
        case data?.goal_per_week === 7:
          setVariables(switchCaseFunctionFor7x(count,setCount,counts,setCounts,levelIndex,setLevelIndex,total))
          break;
        default:
      }
  },[count,total,levelIndex,counts])


// this part saves the data of user for receiving it
if(data!==null && btnDisableDate!==undefined && lastClickTime!==undefined && variables!==undefined){
  updateDoc(doc(db, "users", value),{
    level:variables?.level,
    total:variables?.total,
    count: variables?.count,
    counts:variables?.counts,
    disableDate:btnDisableDate,
    levelIndex:variables?.levelIndex,
    lastClickTime : lastClickTime 
  });
  // this part saves the data of user in all users section for receiving it
    updateDoc(doc(db, "hero-fit", "players"),{
      [value]: {
        uid: value,
        level:variables?.level,
        total:total,
        email: data?.email,
        photo: data?.photo,
        username: data?.username
      }
    });
  }
  
  // this function returns the greeting according to time
  const getGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greeting;
    
    if (currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }
    
    return greeting;
  }
  


  return (
    <>
    {loading? <Loader/> : <main className="overflow-y-auto text-base-100 bg-neutral h-[100vh]">
      {/* The button to open modal */}
      <label htmlFor="my-modal-3" className="btn hidden ">open modal</label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="bg-transparent text-base-100 modal absolute bottom-[470px] md:left-[450px] lg:left-[700px] left-[260px] overflow-y-visible">
        <div className="modal-box bg-neutral border-white border relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-base-100/10">✕</label>
          <h3 className="text-lg font-bold">{data?.username} gained {data?.xp_per_completion} XP and leveled up 🌟</h3>
          <p className="py-4">⚠️ If you don't exercise at least once a week, your avatar will lose XP!</p>
        </div>
      </div>
         
        <div className="max-w-xl mx-auto space-y-8 p-4 mb-24">
          <div className="space-y-4">
            <div className="flex justify-between py-4">
              <div>
                <p className="text-base-100/80 capitalize">{getGreeting()} {data?.username}</p>
                <h1 className="text-lg font-semibold">You're a hero!</h1>
                <svg
                  width="126"
                  height="14"
                  viewBox="0 0 126 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-accent"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M112.637 4.59492C113.22 4.59418 113.804 4.59344 114.388 4.59344C114.441 4.79681 114.52 4.98176 114.624 5.1306C114.398 5.15492 114.172 5.17776 113.946 5.19176C113.52 5.21608 113.095 5.24113 112.669 5.26544C110.812 5.37597 108.954 5.48576 107.096 5.59408C106.246 5.64418 105.395 5.71713 104.545 5.7385C103.216 5.77092 101.886 5.80481 100.558 5.83797C97.5204 5.91313 94.4832 5.98755 91.4464 6.06345C85.5509 6.21376 79.6544 6.35744 73.7594 6.50334C69.5372 6.60871 65.3164 6.81576 61.0962 6.98966C54.7366 7.25492 48.3761 7.51944 42.0166 7.78323C40.7415 7.83629 39.4664 7.9645 38.1927 8.05955C34.583 8.33144 30.9728 8.6026 27.364 8.87523C23.8195 9.14123 20.276 9.40723 16.732 9.67397C16.4037 9.69902 16.0759 9.72334 15.7476 9.74839C16.7029 9.62755 17.6582 9.50818 18.6134 9.39397C21.9484 8.9946 25.2843 8.59376 28.6193 8.19366C29.7845 8.05366 30.9488 7.91439 32.1145 7.77513C32.7152 7.70292 33.3173 7.65723 33.9189 7.59976C37.3868 7.27039 40.8556 6.94102 44.324 6.61018C45.0017 6.5446 45.6808 6.45987 46.359 6.41934C47.3363 6.35892 48.3132 6.29923 49.2905 6.23955C52.8665 6.02218 56.4433 5.80481 60.0193 5.58744C60.8064 5.53955 61.5926 5.49166 62.3797 5.44229C62.5873 5.43123 62.7944 5.42976 63.0015 5.42313C63.5543 5.40692 64.1071 5.3885 64.6594 5.37081C68.2433 5.25513 71.8267 5.14092 75.4102 5.02671C77.0615 4.97366 78.7128 4.9125 80.3636 4.89113C85.6927 4.82408 91.0204 4.73639 96.3491 4.69955C101.778 4.6605 107.207 4.60155 112.637 4.59492ZM2.73544 6.95947C3.73391 6.97495 4.73239 6.88284 5.72993 6.83421C6.13571 6.81432 6.54243 6.78042 6.94774 6.748C8.73617 6.60726 10.5251 6.46947 12.3144 6.32947C14.4532 6.16295 16.5925 5.98389 18.7317 5.79747C21.7868 5.53074 24.8414 5.26253 27.896 4.99505C28.5972 4.9339 29.2975 4.89116 29.9977 4.84032C31.7782 4.70842 33.5577 4.578 35.3377 4.44684C37.1181 4.31568 38.8981 4.18453 40.6785 4.05411C41.375 4.00253 42.0725 3.93547 42.7694 3.90084C45.6094 3.75937 48.4503 3.62084 51.2908 3.47937C53.0369 3.39389 54.7836 3.30768 56.5302 3.22147C57.2135 3.18758 57.8983 3.13674 58.5826 3.12126C61.3281 3.05863 64.0737 2.99084 66.8193 2.92674C69.5287 2.86337 72.2386 2.8 74.948 2.73589C75.6633 2.71895 76.3795 2.72705 77.0938 2.72263C78.863 2.71232 80.6317 2.702 82.4009 2.69021C85.1512 2.674 87.9014 2.66147 90.6522 2.64084C91.5516 2.63347 92.4514 2.65042 93.3513 2.65484C95.2336 2.66516 97.1174 2.67621 99.0012 2.68579C99.1566 2.68653 99.3126 2.68874 99.4685 2.68947C95.2289 2.77937 90.9894 2.86926 86.7494 2.96874C84.9793 3.01 83.2092 3.05053 81.4386 3.09179C80.6749 3.10947 79.9099 3.11389 79.1467 3.14484C76.5852 3.24947 74.0237 3.36221 71.4632 3.472C68.503 3.59726 65.5428 3.72179 62.5821 3.84779C62.0843 3.86916 61.5874 3.91337 61.0905 3.95021C59.5143 4.06368 57.9373 4.17789 56.3611 4.29211C53.1637 4.52274 49.9663 4.75632 46.768 4.98547C46.2946 5.02011 45.8217 5.07168 45.3492 5.12326C43.7876 5.292 42.2251 5.46074 40.664 5.63021C37.8663 5.93305 35.0686 6.23442 32.2713 6.54021C31.5001 6.62421 30.7299 6.74284 29.9592 6.84526C28.168 7.08179 26.3767 7.31758 24.5855 7.55484C22.3081 7.85547 20.0303 8.14579 17.7544 8.45821C14.5861 8.89074 11.4179 9.32474 8.25008 9.76021C7.49018 9.86411 6.73029 9.968 5.97086 10.0726C4.6084 10.2591 3.25064 10.5287 1.89147 10.7638C1.74776 10.7881 1.62565 10.9347 1.62565 11.1808C1.62565 11.4166 1.74635 11.5883 1.89147 11.5986C2.3879 11.6325 2.88526 11.6672 3.38168 11.6996C3.32015 11.9022 3.28446 12.1233 3.28446 12.3502C3.28446 13.1453 3.72781 13.9315 4.25851 13.8806C8.14347 13.5004 12.0265 13.0871 15.9148 12.7967C19.2897 12.5447 22.6655 12.2927 26.0405 12.0407C29.7723 11.7622 33.5041 11.4829 37.2355 11.2037C38.4106 11.116 39.5852 11.0283 40.7598 10.9392C41.0989 10.9148 41.4384 10.8802 41.7775 10.8677C47.789 10.6164 53.8006 10.3725 59.8116 10.1249C63.0245 9.99232 66.2374 9.86042 69.4493 9.72853C70.6108 9.68063 71.7704 9.64011 72.9313 9.61137C79.0805 9.46032 85.2291 9.30926 91.3773 9.15747C94.0121 9.09263 96.6468 9.02484 99.2811 8.95926C101.531 8.90253 103.781 8.87747 106.029 8.74632C107.886 8.63579 109.744 8.52526 111.602 8.41547C112.529 8.36021 113.458 8.32484 114.384 8.23421C116.493 8.02568 118.602 7.81421 120.71 7.59316C120.708 7.59758 120.708 7.60126 120.706 7.60568C120.587 7.92474 120.554 8.31232 120.617 8.66674C120.677 9.01084 120.824 9.30926 121.021 9.48979C121.205 9.65926 121.489 9.75874 121.697 9.62832C122.157 9.34168 122.614 9.04842 123.07 8.74926C123.061 8.75516 123.052 8.76179 123.042 8.76842C123.076 8.74632 123.109 8.72421 123.143 8.70063C123.182 8.67558 123.222 8.64979 123.261 8.624L123.218 8.652C123.461 8.49063 123.704 8.33 123.947 8.16937C124.202 8.00284 124.457 7.83484 124.709 7.66021C124.986 7.47158 125.249 7.24168 125.516 7.01842C125.816 6.76789 126 6.21674 126 5.69284C126 5.41579 125.955 5.15863 125.867 4.91768C125.749 4.60232 125.52 4.27737 125.282 4.21179C125.047 4.14842 124.811 4.09905 124.575 4.05189C124.523 4.04158 124.469 4.03716 124.416 4.03716C124.256 4.03716 124.089 4.07253 123.936 4.08874C123.578 4.12926 123.222 4.21179 122.864 4.25305C122.572 4.28695 122.28 4.32011 121.988 4.35253C121.202 4.44242 120.415 4.53158 119.63 4.62074C119.426 4.64358 119.222 4.66274 119.02 4.68411C119.093 4.55147 119.146 4.40116 119.177 4.23095C119.214 4.09537 119.235 3.95316 119.24 3.80579C119.248 3.70116 119.257 3.59579 119.266 3.49116C119.266 3.35484 119.251 3.22516 119.222 3.10063C119.243 3.08589 119.263 3.07263 119.284 3.05789C119.432 2.92011 119.55 2.73516 119.638 2.50158C119.728 2.25989 119.772 1.99905 119.773 1.71905C119.772 1.43905 119.728 1.17895 119.638 0.937263C119.587 0.833368 119.535 0.728737 119.484 0.623368C119.36 0.431789 119.215 0.299158 119.047 0.224737C118.744 0.042 118.426 0 118.106 0C117.843 0 117.578 0.0287368 117.318 0.0331579C116.94 0.0383158 116.562 0.0449474 116.184 0.0508421C115.649 0.0596842 115.114 0.0714737 114.579 0.0758947C113.166 0.0869474 111.753 0.0972632 110.339 0.109053C109.01 0.121579 107.68 0.119368 106.351 0.118632C105.143 0.116421 103.934 0.114947 102.726 0.123053C97.9092 0.156211 93.093 0.168 88.2762 0.245368C84.6641 0.301368 81.053 0.358842 77.4409 0.415579C75.8263 0.442105 74.2125 0.481158 72.5974 0.534211C68.9783 0.654316 65.3591 0.775158 61.74 0.895263C60.7077 0.929158 59.675 0.963789 58.6436 0.998421C58.0453 1.01832 57.4465 1.06768 56.8477 1.10305C53.2713 1.316 49.6935 1.52895 46.1166 1.74116C45.0251 1.80674 43.9332 1.87158 42.8417 1.93716C42.2298 1.97179 41.6174 2.03663 41.0054 2.08747C37.453 2.38737 33.8996 2.68726 30.3467 2.98568C28.5122 3.13968 26.6796 3.31358 24.8461 3.49558C21.7075 3.80653 18.5688 4.11821 15.4296 4.42695C12.7104 4.69516 9.99013 4.92726 7.26992 5.17705C6.83831 5.2161 6.40764 5.25516 5.97744 5.29421C5.28141 5.35905 4.58398 5.40253 3.88655 5.45116C3.26849 5.49463 2.64714 5.52189 2.0272 5.49611C1.96521 5.24411 1.80835 5.03853 1.62988 5.06063C1.22974 5.11 0.830533 5.17779 0.4318 5.24632C0.237834 5.278 0.0696988 5.42905 0.0147497 5.74368C-0.046305 6.09074 0.0875455 6.49084 0.317205 6.57779C0.490506 6.64337 0.662868 6.71116 0.837108 6.77305C1.00759 6.83421 1.18794 6.85116 1.3603 6.87547C1.81774 6.93884 2.27706 6.95284 2.73544 6.95947Z"
                  ></path>
                </svg>
              </div>
              <Link className="btn btn-square btn-ghost" to="/settings">
                  <img src={data?.photo} className="w-full h-full rounded-2xl" alt="User Profile Picture" referrerPolicy="no-referrer"/>
              </Link>
            </div>
            <div className="p-4 bg-neutral-100/10 rounded-3xl flex flex-col gap-4">
              <div className="flex gap-4">
                <p className={`${variables ? variables?.fontSize : "text-[2.5rem]"} ${variables ? variables?.saturate : "saturate-[0.3]"} duration-1000 mb-auto p-4 hover:animate-wiggle`}>
                  {data?.logo}
                </p>
                <div className="flex-1">
                  <div className="flex justify-start gap-2 items-center text-sm ">
                    <span className="text-base-100/80">Level {variables ? variables?.level : 1}</span>
                    <p className="flex items-center gap-0.5 bg-accent/20 py-1 px-1.5 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 inline text-accent"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>{variables ? variables?.count : 0}</span>
                    </p>
                    <Link className="btn btn-square btn-ghost btn-sm ml-auto" to="/edit-sport">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                    </Link>
                  </div>
                  <div className="font-semibold mb-4 ">{data?.username}</div>
                  <div className="relative h-5">
                    <progress
                      className="text-base-100 progress progress-accent h-full"
                      value={variables ? variables?.counts : 0}
                      max={variables ? variables?.max : 10}
                    ></progress>
                    <p className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-accent-100">
                      XP {variables ? variables?.counts : 0} / {variables ? variables?.max : 10}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-sm flex gap-2">
                  <span>League level {variables ? variables?.level : 1}</span>
                </p>
                <div className="space-y-1 max-h-32 overflow-auto">
                  {/* list of user */}
                  {datas?.map((user, index) => (
                  <div key={user[0]} className="flex gap-4 items-center text-sm">
                    <p className="w-8 text-center">
                      <span className="text-base">{medal[index]}</span>
                    </p>
                    <div className="flex items-center gap-2 flex-1 truncate">
                      <img
                        src={user[1]?.photo}
                        className="w-6 h-6 rounded-full"
                        alt="User Profile Picture"
                        referrerPolicy="no-referrer"
                      />
                      <p className="truncate">{user[1]?.username}</p>
                    </div>
                    <p>{user[0] === value? variables ? variables?.total : 0 : user[1]?.total} XP</p>
                  </div>
                  ))}
                  
                </div>
              </div>
              <div className="-mx-4">
                <svg
                  viewBox="0 0 328 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full stroke-neutral"
                >
                  <path
                    d="M1 1.5H327"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="6"
                  ></path>
                </svg>
              </div>
              <div className="relative w-full">
                <div className="relative w-full">
                  <button style={isDisabled? {background:"#191D24", color:"#66cc8a"} : {background:"#EA5234"}} disabled={isDisabled} onClick={modalButton} className="btn btn-block btn-accent text-base-100">{isDisabled ? "Completed!" : "Complete"}</button>
                  <p className={`${isDisabled? "hidden" : "block"} text-center text-xs text-base-100/60 mt-1`}><span className="font-semibold">{data?.xp_per_completion}</span> XP per completion. Up to 100 XP a week</p>
                  <div className={`${isDisabled? "hidden" : "block"} absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs flex gap-1 items-end`}>
                    <p className="text-xs leading-none text-base-100/60">Did you workout today?</p><svg viewBox="0 0 201 182" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 -rotate-6 mb-0.5"><path d="M25.8586 180.336C42.9872 181.338 58.5656 172.872 71.8841 162.958C83.4613 154.198 94.0831 144.178 103.7 133.416C122.577 112.072 137.322 87.0084 146.948 60.1606C152.338 45.0545 156.223 29.2807 158.161 13.2888C158.703 9.25026 152.342 8.54602 151.925 12.5658C148.516 40.0117 139.64 66.747 126.156 90.8552C112.778 114.82 94.9553 136.388 73.5487 153.644C60.3427 164.308 44.3528 175.134 26.5813 174.101C24.9022 173.97 23.2857 175.106 23.0302 176.804C22.8995 178.483 24.1795 180.206 25.8586 180.336Z" fill="#D95D40"></path><path d="M105.237 49.3194C117.713 38.8933 130.333 28.5734 142.808 18.1474C144.281 16.905 145.648 15.8062 147.121 14.5638C148.488 13.465 149.798 11.9917 151.471 11.2299C153.605 10.1435 155.104 12.4714 156.009 14.2502C159.844 21.0781 163.216 28.2307 166.838 35.3458C171.003 43.5282 175.293 51.6918 179.459 59.8742C181.27 63.4318 187.143 60.8904 185.207 57.3515C181.223 49.5249 177.239 41.6983 173.13 33.8904C169.327 26.4196 165.754 18.7864 161.596 11.4966C159.878 8.56319 157.643 5.57999 154.21 4.81907C149.99 3.92095 146.582 6.73039 143.636 9.21515C137.052 14.6717 130.468 20.1282 123.884 25.5847C116.27 31.8341 108.781 38.0647 101.185 44.4389C98.1147 46.9424 102.042 51.8416 105.237 49.3194Z" fill="#D95D40"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link className="link text-sm" target="_blank" to="mailto:vijay.rathod2668@gmail.com?subject=Feedback%20for%Habitify">
                Feedback?
            </Link>
          </div>
        </div>
      </main>}
    </>
  );
};

export default Work;
