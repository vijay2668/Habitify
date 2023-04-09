// import { deleteDoc, deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import Loader from "../assets/Loader";
// import { Link, useNavigate } from "react-router-dom";

// const icons = ["🏋️","🤸","🥊","🥋","🧘","🏃","🏈","🏉","⚽️","⚾","🏀","⛹️","🎾","🚴","🏊","🏂","🤺","🏄","🏌️","🧗","🤽","⛷️","🤾","🤼","🚣","🏇","🏐","🥏","🎳","🏏","🏑","🏓","🤿","🏸","⛸️","🛹","🎮"];
// const usernames = ["Metal Lifter", "Split", "Mike", "Teddy Rinner", "Yoga-to go!", "Rocket", "T. Brady", "Chabal", "Grass Fairy", "Mike Trout", "Air J.", "Air J.", "Federer", "Bike salmon", "Michael Phelps", "Travis Rice", "The Six Fence", "Kelly Slater", "Tiger Woods", "Spider Man", "Swimmer With Balls", "Candide Thovex", "Nikola Karabatić", "The Rock", "Boat-Tox", "Charlotte Dujardin", "Volley Baller", "MKBHD", "Lebowski", "Cricket", "Hockey Stick", "Ping Pong Pun", "Submarine", "Flying Bird", "Tonya", "Tony Hawk", "Pewdiepie"];

// const EditSport = () => {
//   // this will contains the username
//   const [inputValue, setInputValue] = useState("");
//   // this will contains the choosen icon index for username placeholder
//   const [iconIndex, setIconIndex] = useState();
//   // this saves classes to add in choosen icon
//   const [activeClasses, setActiveClasses] = useState([]);
//   // this contains user uid
//   const [value, setValue] = useState(null)
//   // this loading is helpfull for data receiving before component to render
//   const [loading, setLoading] = useState(true)
//   // this will contain user data
//   const [data, setData] = useState(null)

// // this part receives the user data
//   useEffect(()=>{
//     setValue(localStorage.getItem("userUID"));
//     const getData = async ()=>{
//       const docRef = doc(db, "users", value);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         // console.log("Document data:", docSnap.data());
//         setLoading(false);
//         setData(docSnap.data());
//       } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//       }
//     }
    
//     const timeoutId = setTimeout(() => {
//       getData();
//     }, 50); // add a delay of 1 second (1000 milliseconds)
    
//     return () => {
//       clearTimeout(timeoutId);
//     }
//   },[value]);

  
// // this is for username input
// const handleOnChange = (e) => {
//   setInputValue(e.target.value);
// };

// // this is for icon input
// const handleClickIcon = (e, key) => {
//     // remove active classes from all other divs
//     const elements = document.querySelectorAll('.icon');
//     elements.forEach((element) => element.classList.remove(...activeClasses));

//     // add new active classes to clicked div
//     const classNamesToAdd = ['ring-2', 'ring-accent', 'animate-popup'];
//     e.currentTarget.classList.add(...classNamesToAdd);
//     setActiveClasses(classNamesToAdd);
    
//     setIconIndex(key);
//   };

// // this is for editing the account of user
// const navigate = useNavigate();

//   const editData = async () => {
//     await updateDoc(doc(db, "users", value), {
//       username: inputValue,
//       logo: icons[iconIndex]
//     });
//     await updateDoc(doc(db, "hero-fit", "players"),{
//         [value]: {
//           uid: value,
//           level: data?.level,
//           total: data?.total,
//           email: data?.email,
//           photo: data?.photo,
//           username: inputValue
//         }
//       });
//     setInterval(()=>{
//         navigate('/app');
//     },500)
//   };

//   // this is for deleting the account of user
//   const deleteAccount = async () => {
//     const cityRef = doc(db, 'hero-fit', 'players');
//     // Remove the 'capital' field from the document
//     await updateDoc(cityRef, {
//         [value]: deleteField()
//     });
//     await deleteDoc(doc(db, "users", value));
//     localStorage.clear();
//     setInterval(()=>{
//         navigate('/signup');
//     },500)
// }

//   return (
//     <>
//       {loading? <Loader/> : <main className="overflow-y-auto text-base-100 bg-neutral">
//         <div className="max-w-xl mx-auto p-4 space-y-8 mb-24">
//           <div>
//             <Link className="btn btn-ghost" to="/app">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   className="w-5 h-5"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//                 back
//             </Link>
//             <h1 className="text-3xl font-black tracking-tight">
//               Edit sport avatar
//             </h1>
//           </div>
//           <div className="space-y-4">
//             <div className="grid grid-rows-3 grid-flow-col gap-2 overflow-auto p-2 px-4 -mx-4 -m-2">
//                 {icons.map((icon, index)=>(
//                   <div key={index} onClick={e => handleClickIcon(e, index)} className="icon relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-xl bg-cover cursor-pointer ">
//                   <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 transform animate-none justify-center text-4xl blur-xl">
//                     {icon}
//                   </p>
//                   <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-4xl">
//                     {icon}
//                   </p>
//                 </div>
//               ))}
//               </div>
//             <div className="form-control w-full">
//               <label className="label">
//                 <span className="label-text text-base">Avatar name</span>
//               </label>
//               <div className="relative">
//                 <input
//                   name="name"
//                   type="text"
//                   className="form-control w-full input placeholder:opacity-60 bg-neutral-100/10 text-base-100/80"
//                   placeholder={usernames[iconIndex]}
//                   required=""
//                   minLength="2"
//                   maxLength="15"
//                   value={inputValue}
//                   onChange={handleOnChange}
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <button
//                 onClick={editData}
//                 className="btn btn-accent btn-block text-base-100"
//                 type="submit"
//               >
//                 Save
//               </button>
//               <button onClick={deleteAccount} className="btn btn-accent btn-ghost btn-block">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>}
//     </>
//   );
// };

// export default EditSport;
