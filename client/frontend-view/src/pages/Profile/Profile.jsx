import BannerSection from "../../components/mainBody/profileComponents/BannerSection"
import AboutDetails from "../../components/mainBody/profileComponents/AboutDetails"
import '../../assets/css/profile.scss'
const Profile = () => {
  return (
    <div className="profile-section">
      <BannerSection />
      <AboutDetails />
    </div>
  )
}

export default Profile