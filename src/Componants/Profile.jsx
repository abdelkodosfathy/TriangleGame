import React, { useEffect, useState } from 'react'
import {auth, db} from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { ref, onValue} from 'firebase/database';
const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async()=> {
        auth.onAuthStateChanged(async(user) => {
            console.log(user);
            const docRef = doc(db, "Users", user.uid)
            // const myRef = ref(db, "Users")
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
                console.log(docSnap.data());
            } else {
                console.log("user not loged in");
            }
        })
    }
    useEffect(()=> {
        fetchUserData()
    },[])
  return (
    <div>
        {userDetails ? (
            <>
            {/* <h1>welcome</h1> */}
            <h3>welcome {userDetails.name}</h3>
            </>
        ) : <p>
            Loading ...
            </p>}
    </div>
  )
}

export default Profile