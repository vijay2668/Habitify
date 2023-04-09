import React, { useEffect, useState } from "react";
import { auth, provider, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const icons = ["🏋️","🤸","🥊","🥋","🧘","🏃","🏈","🏉","⚽️","⚾","🏀","⛹️","🎾","🚴","🏊","🏂","🤺","🏄","🏌️","🧗","🤽","⛷️","🤾","🤼","🚣","🏇","🏐","🥏","🎳","🏏","🏑","🏓","🤿","🏸","⛸️","🛹","🎮"];
const numbers = [1, 2, 3, 4, 5, 6, 7];
const xp = [100, 50, 33, 25, 20, 17, 14];
const usernames = ["Metal Lifter", "Split", "Mike", "Teddy Rinner", "Yoga-to go!", "Rocket", "T. Brady", "Chabal", "Grass Fairy", "Mike Trout", "Air J.", "Air J.", "Federer", "Bike salmon", "Michael Phelps", "Travis Rice", "The Six Fence", "Kelly Slater", "Tiger Woods", "Spider Man", "Swimmer With Balls", "Candide Thovex", "Nikola Karabatić", "The Rock", "Boat-Tox", "Charlotte Dujardin", "Volley Baller", "MKBHD", "Lebowski", "Cricket", "Hockey Stick", "Ping Pong Pun", "Submarine", "Flying Bird", "Tonya", "Tony Hawk", "Pewdiepie"];

const SignUp = () => {
  // for saving user uid in localStorage & getting from localStorage
  const [value, setValue] = useState(null);
  // this saves user email
  const [userEmail, setUserEmail] = useState(null);
  // it is for redirecting the page to another
  const [condition, setCondition] = useState(false);
  // this saves user uid if user is signing up with only email
  const [userUID, setUserUID] = useState(null);
  // this saves the user email photo
  const [userPhoto, setUserPhoto] = useState(null);
  
// // it is for displaying the error if disruption in signup
  const [err, setErr] = useState(false);

  // this function will sign up the user in website and set the condition true on click
  const googleClick = () => {
    try {
      signInWithPopup( auth, provider).then( (data) => {
        setUserEmail(data.user.email);
        localStorage.setItem("userUID", data.user.uid);
        setCondition(true);
        setUserPhoto(data.user.photoURL);
      })
    } catch (err) {
      setErr(true);
    }
  }
  
  // this function get and save user uid, it requires to redirect to app page.
  // if both condition becomes true then set condition will be false for redirect only once
  const navigate = useNavigate();

  useEffect(() => {
    setValue(localStorage.getItem("userUID"));  
    if(condition && value!==null){
      setCondition(false)
      setInterval(() => {
        navigate('/app');
      }, 1000);
    }
  },[condition,value])
  
  // console.log(condition)
  
  // it saves username of user
  const [inputValue, setInputValue] = useState('');

  // for closeBtn
  const [check, setCheck] = useState(false);
  // for login with only email btn
  const [check1, setCheck1] = useState(false);
  // this saves classes to add in choosen icon
  const [activeClasses, setActiveClasses] = useState([]);
  // this saves icon index
  const [iconIndex, setIconIndex] = useState()
  // this saves number index of 1x,2x,3x,etc
  const [numberIndex, setNumberIndex] = useState(0)
  // this saves email 
  const [inputValue1, setInputValue1] = useState('');
  // this saves password 
  const [inputValue2, setInputValue2] = useState('');
  
  // for username input
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  }
  
  // this part add the classes in choosen icon & saves icon index
  const handleClickIcon = (e, key) => {
    // remove active classes from all other divs
    const elements = document.querySelectorAll('.icon');
    elements.forEach((element) => element.classList.remove(...activeClasses));
    
    // add new active classes to clicked div
    const classNamesToAdd = ['ring-2', 'ring-accent', 'animate-popup'];
    e.currentTarget.classList.add(...classNamesToAdd);
    setActiveClasses(classNamesToAdd);
    setIconIndex(key);
  };
  
  

  // this part add the classes in choosen goal per week & saves numbers index
  const handleClickNumber = (e, key) => {
    // remove active classes from all other divs
    const elements = document.querySelectorAll('.number');
    elements.forEach((element) => element.classList.remove(...activeClasses));
    
    // add new active classes to clicked div
    const classNamesToAdd = ['ring-2', 'ring-accent', 'animate-popup'];
    e.currentTarget.classList.add(...classNamesToAdd);
    setActiveClasses(classNamesToAdd);
    setNumberIndex(key)
  };
  
  // this changes the classname using hidden or block with below function
  const closeBtn = () => {
    if(iconIndex!==undefined && inputValue.length > 0){
      !check ? setCheck(true) : setCheck(false);
    } else {
      setErr(true)
    }
  };
  
  // this changes the classname using hidden or block with below function
  const loginWithEmail = () => {
    !check1 ? setCheck1(true) : setCheck1(false);
  };
  
  // it contains all properties 
  const data = {
    uid: userUID || value,
    email: userEmail || inputValue1,
    photo: userPhoto,
    logo: icons[iconIndex],
    username: inputValue,
    xp_per_completion: xp[numberIndex],
    goal_per_week: numbers[numberIndex],
  }
  
  // this is for saving data to backend in two category
  // that is users and game
  // user will show how many users are there
  // game includes different levels which will help to rank the users
      if(value!==null || userUID!==null && condition){
         setDoc(doc(db, "users", data.uid), {
          uid: data.uid,
          email: data.email,
          photo: data.photo,
          logo: data.logo,
          username: data.username,
          xp_per_completion: data.xp_per_completion,
          goal_per_week: data.goal_per_week,
          level: 1,
          count: 0,
          counts: 0,
          total: 0,
          levelIndex: 0
        });

        updateDoc(doc(db, "hero-fit", "players"), {
          [data.uid]: {
            uid: data.uid,
            email: data.email,
            photo: data.photo,
            username: data.username,
            total: 0,
            level: 1
          }
        });

      }


  // this is for saving current icon index
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  // console.log(data);

  // this function get and save user uid, it requires to redirect to app page. 
  // if both condition becomes true then set condition will be false for redirect only once
  // if user is signing up with only email
  useEffect(() => {
    setUserUID(localStorage.getItem("userUID"));  
    if(condition && userUID!==null){
      setCondition(false)
      setInterval(() => {
        navigate('/app');
      }, 1000);
    }
  },[condition,userUID])

  // console.log(userUID)

// for email input
const handleOnChange1 = (e) => {
  setInputValue1(e.target.value);
}

// for password input
  const handleOnChange2 = (e) => {
    setInputValue2(e.target.value);
  }

 // this part receives the value of inputs and sign up the user if user is logging in with email & password
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = inputValue1;
    const password = inputValue2;
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userUID", res.user.uid);
      setCondition(true);
      setUserPhoto(res.user.photoURL);
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    }

  return (
    <>
      <main className="overflow-y-auto text-base-100 bg-neutral">
        <div
          className={`max-w-xl mx-auto p-4 mb-24 animate-opacity ${check ? "hidden" : "block"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-black tracking-tight">
              Create a sport avatar
            </h1>
            <button onClick={closeBtn} className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-rows-3 grid-flow-col gap-2 overflow-auto p-2 px-4 -mx-4 -m-2">
              {icons.map((icon, key) => (
                <div key={key} onClick={e => handleClickIcon(e, key)} className="icon relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-xl bg-cover cursor-pointer">
                  <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 transform animate-none justify-center text-4xl blur-xl">
                    {icon}
                  </p>
                  <p className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 transform text-4xl">
                    {icon}
                  </p>
                </div>
              ))}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base-100">Avatar name</span>
              </label>
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  className="form-control w-full input placeholder:opacity-60 bg-neutral-100/10"
                  placeholder={usernames[iconIndex]}
                  required=""
                  minLength="2"
                  maxLength="15"
                  autoCapitalize="on"
                  value={inputValue}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-base-100">Goal per week</span>
              </label>
              <div className="flex gap-2 justify-center">
                {numbers.map((number, key) => (
                  <span key={key} onClick={e => handleClickNumber(e, key)}
                    value={number}
                    className="number bg-neutral-100/10 rounded-full aspect-square flex-1 flex items-center justify-center font-medium cursor-pointer duration-300 "
                  >
                    {number}x
                  </span>
                ))}
              </div>
              <label className="label">
                <span className="label-text-alt text-base-100">
                  <span className="font-semibold">{xp[numberIndex]}</span> XP per completion.
                  Up to 100 XP a week
                </span>
              </label>
            </div>
            <div>
              {err && <p className="text-error">Please fill Create Sport Avatar form</p>}
              <button
                onClick={closeBtn}
                className="btn border-0 text-base-100 bg-accent hover:bg-[#cf3415] btn-block"
              >
                Create avatar
              </button>
            </div>
          </div>
        </div>

        <div
          className={`h-[100vh] max-w-xl mx-auto p-4 space-y-8 mb-24 text-base-100 ${check ? "block" : "hidden"}`}
        >
          <div className="flex justify-center">
            <div className="rounded-2xl cursor-pointer">
              <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-cover cursor-pointer">
                <p className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 scale-125 transform animate-none justify-center text-5xl blur-xl">
                {data.logo === undefined ? icons[currentIconIndex] : data.logo}
                </p>
                <p className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform text-5xl">
                  {data.logo === undefined ? icons[currentIconIndex] : data.logo}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-black tracking-tight ">
              Sign up to level up running
            </h1>
            <div className="text-base-100/80">
            {data.logo === undefined ? "Sign up now!" : <span dangerouslySetInnerHTML={{ __html: `Exercise <span class="text-base-100 font-semibold">${numbers[numberIndex]}x</span> per week for max XP!` }}></span>}
            </div>
          </div>
          <div className="space-y-8">
            <button onClick={googleClick} className="btn btn-block bg-neutral-100/10 text-base-100 hover:bg-gray-100 hover:text-black !border-base-content/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-4"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
                <path d="M1 1h22v22H1z" fill="none"></path>
              </svg>
              Sign up with Google
            </button>
            <button onClick={loginWithEmail} className={`${check1 ? "hidden" : "btn-block"} btn border-0 text-base-100 bg-accent hover:bg-[#cf3415]`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-4"
              >
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"></path>
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"></path>
              </svg>
              Sign up with email
            </button>
            <form onSubmit={handleSubmit} className={`${check1 ? "block" : "hidden"} space-y-4`}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base-100">Email</span>
              </label>
              <input
                name="email"
                type="email"
                autoComplete="username"
                autoCapitalize="none"
                className="form-control w-full input bg-neutral-100/10"
                placeholder="luke@skywalker.com"
                required=""
                value={inputValue1}
                onChange={handleOnChange1}
                data-temp-mail-org="0"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base-100">Password</span>
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="form-control w-full input bg-neutral-100/10"
                required=""
                value={inputValue2}
                onChange={handleOnChange2}
              />
            </div>
            {err && <p>Something went wrong!</p>}
            <button onClick={handleSubmit} type="submit" className="btn bg-accent hover:bg-[#cf3415] btn-block border-0 text-base-100">
              Sign up
            </button>
          </form>
          </div>
          <div className="text-center">
            <Link className="link" to="/login">
                Login instead?
            </Link>
          </div>
          <div className="text-center">
            <div className="divider"></div>
            <div className="mb-4 text-base-100">
              Having issues?
              <Link className="link" target="_blank" to="mailto:vijay.rathod2668@gmail.com?subject=Issue%20with%20Habitify">
                  Email us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
