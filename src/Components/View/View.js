import React,{useEffect, useState, useContext} from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firestore } = useContext(FirebaseContext);
console.log(PostContext,'postContext')
  useEffect(() => {
    console.log("Post details:", postDetails); // Debugging postDetails
    console.log("Firestore instance:", firestore); // Debugging firestore
  
    if (!postDetails || !postDetails.userId) {
      console.warn("Post details or userId is missing");
      return;
    }
  
    console.log("Fetching user details..."); // Checking if effect runs
  
    const fetchUserDetails = async () => {
      try {
        console.log("Creating Firestore query...");
        const userQuery = query(
          collection(firestore, "users"),
          where("userId", "==", postDetails.userId)
        );
  
        console.log("Firestore query:", userQuery);
        const querySnapshot = await getDocs(userQuery);
        console.log("Query snapshot:", querySnapshot);
  
        if (!querySnapshot.empty) {
          setUserDetails(querySnapshot.docs[0].data());
          console.log("User data:", querySnapshot.docs[0].data());
        } else {
          console.warn("User not found");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserDetails();
  }, [firestore, postDetails]);
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src="../../../public//Images/R15V3.jpg"
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; 42423 </p>
          <span>YAMAHA R15</span>
          <p>vehicle</p>
          <span>12-02-2025</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
