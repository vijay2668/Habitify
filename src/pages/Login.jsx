import React,{useState, useEffect} from "react";
import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const icons = ["🏋️","🤸","🥊","🥋","🧘","🏃","🏈","🏉","⚽️","⚾","🏀","⛹️","🎾","🚴","🏊","🏂","🤺","🏄","🏌️","🧗","🤽","⛷️","🤾","🤼","🚣","🏇","🏐","🥏","🎳","🏏","🏑","🏓","🤿","🏸","⛸️","🛹","🎮"];

const Login = () => {
  // email input
  const [inputValue1, setInputValue1] = useState('');
  // password input
  const [inputValue2, setInputValue2] = useState('');
  
  // email input
  const handleOnChange1 = (e) => {
    setInputValue1(e.target.value);
  }
  // password input
  const handleOnChange2 = (e) => {
    setInputValue2(e.target.value);
  }


  // this will contain choosen icon index
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  
  
  // this saves current icon index
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);


  // for saving user uid in localStorage that we can know user is already signup or not
  const [value, setValue] = useState(null);
  // it is for redirecting the page to another
  const [condition, setCondition] = useState(false);
  // it is for displaying the error if disruption in login
  const [err, setErr] = useState(false);
  
  // this function will log in the user in website and set the condition true on click
  const googleClick = () => {
    try {
      signInWithPopup( auth, provider).then( (data) => {
        localStorage.setItem("userUID", data.user.uid);
        setCondition(true);
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
  },[value,condition])

  // this part receives the value of inputs and login the user if user is logging in with email & password
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = inputValue1;
    const password = inputValue2;

      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("userUID", res.user.uid);
        setCondition(true);
      } catch (err) {
        setErr(true);
      }
  };

  return (
    <>
      <main className="overflow-y-auto bg-neutral text-base-100">
        <div className="max-w-xl mx-auto p-4 space-y-8 mb-24">
          <div className="flex justify-center">
            <div className="p-4 bg-neutral-100/10 rounded-xl">
              <span className="text-5xl">{icons[currentIconIndex]}</span>
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-center">
            Welcome back!
          </h1>
          <button onClick={googleClick} className="btn btn-block bg-neutral-100/10 text-base-100/80 font-bold hover:bg-gray-100 hover:text-black !border-base-content/20">
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
            Log in with Google
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            {err && <p className="text-error">Something went wrong!</p>}
            <button onClick={handleSubmit} type="submit" className="btn bg-accent hover:bg-[#cf3415] btn-block border-0 text-base-100">
              Log in
            </button>
          </form>
          <div className="text-center">
            <Link className="link" to="/signup">
                Signup instead?
            </Link>
          </div>
          <div>
            <div className="divider"></div>
            <div className="text-center mb-4">
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

export default Login;
