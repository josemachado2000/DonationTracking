import { useState, useEffect } from "react";
import axios from "axios";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
    const [profiles, setProfiles] = useState([]);
  
    useEffect(() => {
      const getProfiles = async () => {
        const profiles = await fetchProfiles();
        setProfiles(profiles);
      };
      getProfiles();
    }, []);
  
    const fetchProfiles = async () => {
      //const benefId = { benefId: benef.id };
      const id = { id: "462109f7-d76e-46bf-9bed-7e0e67a0f774" };
      const response = await axios.post("http://localhost:8080/get_USER_by_Id", id);
      return response.data;
    };
  
    return (
      <>
          <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Profile</h3>
          {profiles.map((profile) => (
            <ProfileDetails key={profile.id} profile={profile} />
          ))}
      </>
    );
  };
  
  export default Profile;

