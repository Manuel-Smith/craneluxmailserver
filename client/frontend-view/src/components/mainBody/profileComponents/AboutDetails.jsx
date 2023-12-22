import React, {useState, useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons'
import axios from "axios";
const AboutDetails = () => {
    const [userNameDetails, setUserNameDetails] = useState([]);
    const [userSocialMedia, setUserSocialMedia] = useState([]);
    const [userCountry, setUserCountry] = useState([]);
    const [userState, setUserState] = useState([]);
    const [userGeneralDetails, setUserGeneralDetails] = useState([]);
    

    // Fetching usernames from the database
    useEffect(()=>{
      try {
        (async ()=>{
          const response = await axios.get("http://192.168.100.18:5000/profile/1")
          const userInfo = response.data.names;
          setUserNameDetails(userInfo)
      })() 
      } catch (error) {
        console.log(error)
      }
    }, [userNameDetails.firstName, userNameDetails.lastName, userNameDetails.userName])
    
    // Fetching social media details from the database
    useEffect(()=>{
      try {
        (async ()=>{
          const response = await axios.get("http://192.168.100.18:5000/profile/1")
          const socialMediaAccounts = response.data.socialMedia
          setUserSocialMedia(socialMediaAccounts)
        })()

      } catch (error) {
        console.log(error)
      }
    }, [userSocialMedia.facebook, userSocialMedia.linkedin, userSocialMedia.twitter])


      // Fetching location details from the database
      useEffect(()=>{
        try {
          (async ()=>{
            const response = await axios.get("http://192.168.100.18:5000/profile/1");
            const userCountry = response.data.location.country;
            const userState = response.data.location.state
            setUserCountry(userCountry);
            setUserState(userState);
          })()
        } catch (error) {
          console.log(error);
        }
      }, [userCountry.countryName, userCountry.countryCode, userState.stateCode, userState.stateName])

      // Fetching data about user details like age, occupation, phonenumber, etc
      useEffect(()=>{
        try {
          (async ()=>{
            const response = await axios.get("http://192.168.100.18:5000/profile/1");
            const userBioAndDetails = response.data;
            setUserGeneralDetails(userBioAndDetails);
          })()
        } catch (error) {
          console.log(error);
        }
      }, [userGeneralDetails.age, userGeneralDetails.occupation, userGeneralDetails.phoneNumber, userGeneralDetails.email, userGeneralDetails.userBio])

  return (
    <div className="user-names">
      <div className="user-name-details">
        <div></div>
        <div>
          <div>
            <h1>{userNameDetails.firstName} {userNameDetails.lastName}</h1>
            <p>{userGeneralDetails.occupation}</p>
          </div>
          <div className="user-social-media">
            <p><a href={userSocialMedia.facebook} target="_blank"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon> facebook</a></p>
            <p><a href={userSocialMedia.twitter} target="_blank"><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon> twitter</a></p>
            <p><a href={userSocialMedia.linkedin} target="_blank"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon> linkedin</a></p>
          </div>
        </div>
        <div></div>
      </div>
      <div className="profile-general-info">
        <div className="user-location">
          <p className="country">{`Country: ${userCountry.countryName}, ${userCountry.countryCode}`}</p>
          <p className="state">{`State: ${userState.stateName}, ${userState.stateCode}`}</p>
        </div>
        <div className="user-contacts">
          <p>Phone Number: {userGeneralDetails.phoneNumber}</p>
          <p>Email: {userGeneralDetails.email}</p>
        </div>
        <div className="user-bio">
          <p>{userGeneralDetails.userBio}</p>
        </div>
      </div>
    </div>
  )
}

export default AboutDetails