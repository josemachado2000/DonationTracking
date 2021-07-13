import { useState, useEffect } from "react";
import axios from "axios";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem("loggedUser")));

  useEffect(() => {
    const getProfile = async () => {
      const profile = await fetchProfile();
      setProfile(profile);
    };
    getProfile();
  }, []);

  const fetchProfile = async () => {
    //const benefId = { benefId: benef.id };
    const id = { id: user.id };
    const response = await axios.post(
      "http://localhost:8080/get_USER_by_Id",
      id
    );
    return response.data;
  };

  return (
    <>
      <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Profile</h3>
      {profile.map((user) => (
        <ProfileDetails key={user.id} user={user} />
      ))}
    </>
  );
};

export default Profile;
