import React, {useState, useEffect} from "react"
import '../../../assets/css/banner.scss'
import axios from 'axios';
const BannerSection = () => {
  const [profileUrls, setProfileUrls] = useState([])


  useEffect(()=>{
    (async ()=>{
      try {
        const response = await axios.get('http://192.168.100.18:5000/profile/1');
        const urlData = response.data.images
        setProfileUrls(urlData);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])
  
  return (
    <div>
        <div className="banner-section">
            <div className="banner-image">
              <div className="banner-overlay"></div>
              <div className="img">
                <img src={profileUrls.bannerImage} alt="Banner Image" />
              </div>
              <div className="profile-image">
                <img src={profileUrls.profileImage} alt="Profile Image" />
              </div>
            </div>
        </div>
    </div>
  )
}

export default BannerSection