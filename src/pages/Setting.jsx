import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc, deleteField, deleteDoc, getDoc } from "firebase/firestore";
import Loader from "../assets/Loader";
import { Link, useNavigate } from "react-router-dom";

const Setting = () => {
  // this will contain user uid
  const [value, setValue] = useState(null);
  // this loading is helpfull for data receiving before component to render
  const [loading, setLoading] = useState(true)
  // this will contain user data
  const [data, setData] = useState(null)

  // this part receives the user data
    useEffect(()=>{
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
        }, 50); // add a delay of 1 second (1000 milliseconds)
        
        return () => {
          clearTimeout(timeoutId);
        }
    },[value])


// this is for deleting the account of user
const navigate = useNavigate();

    const deleteAccount = async () => {
        const cityRef = doc(db, 'hero-fit', 'players');
        // Remove the 'capital' field from the document
        await updateDoc(cityRef, {
            [value]: deleteField()
        });
        await deleteDoc(doc(db, "users", value));
        localStorage.clear();
        setInterval(()=>{
            navigate('/signup');
        },500)

    }

    // this part logout the user
    const logOut = () => {
      localStorage.clear();
      setInterval(()=>{
        navigate('/login');
      },500)
    }

  return (
    <>
      {loading? <Loader/> : <main className="overflow-y-auto text-base-100 bg-neutral h-[100vh]">
        <div className="max-w-xl mx-auto space-y-8 p-4 mb-24">
          <div>
            <Link className="btn btn-ghost" to="/app">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                back
            </Link>
            <h1 className="text-3xl font-black tracking-tight">Settings</h1>
          </div>
          <p>You are signed in as {data?.email}</p>
          <button onClick={logOut} className="btn btn-ghost">Log out</button>
          <button onClick={deleteAccount} className="btn btn-ghost">Delete account</button>
          <div className="divider"></div>
          <div className="space-y-4">
            <div className="text-center">
              Having issues?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link className="link" target="_blank" to="mailto:vijay.rathod2668@gmail.com?subject=Issue%20with%20Habitify">
                  Connent Me
              </Link>
            </div>
            <div className="flex flex-row justify-center items-center text-center gap-1 mt-4">
              Built with
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                ></path>
              </svg>
              by
              <Link className="link link-accent" to="https://twitter.com/rathodvijay2410">
                  Vijay
              </Link>
            </div>
          </div>
        </div>
      </main>}
    </>
  );
};

export default Setting;
