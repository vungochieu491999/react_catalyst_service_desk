import Button from "./Button";
import "./UserProfile.css";
import { useEffect, useState } from "react";

// Define the type for userDetails
interface UserDetails {
  firstName: string;
  lastName: string;
  mailid: string;
  timeZone: string;
  createdTime: string;
}

// Define the type for the API result
interface AuthResult {
  content: {
    first_name: string;
    last_name: string;
    email_id: string;
    time_zone: string;
    created_time: string;
  };
}

const UserProfile: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    mailid: "",
    timeZone: "",
    createdTime: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await window.catalyst.auth.isUserAuthenticated() as AuthResult;
        setUserDetails({
          firstName: result.content.first_name,
          lastName: result.content.last_name,
          mailid: result.content.email_id,
          timeZone: result.content.time_zone,
          createdTime: result.content.created_time,
        });
        setIsUserAuthenticated(true);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Render loading state or user profile
  if (isFetching) {
    return <div className="card">Loading...</div>;
  }

  return (
    <div className="card">
      <br />
      <h1 className="title">User Profile Information</h1>
      <img
        id="userimg"
        width={200}
        height={450}
        src="https://cdn2.iconfinder.com/data/icons/user-management/512/profile_settings-512.png"
        alt="User Profile"
      />
      <p className="title" id="fname">
        {"First Name: " + userDetails.firstName}
      </p>
      <p className="title" id="lname">
        {"Last Name: " + userDetails.lastName}
      </p>
      <p className="title" id="mailid">
        {"Email Address: " + userDetails.mailid}
      </p>
      <p className="title" id="tzone">
        {"Time Zone: " + userDetails.timeZone}
      </p>
      <p className="title" id="ctime">
        {"Joined On: " + userDetails.createdTime}
      </p>
      <Button btnvalue={{ title: "Logout" }} />
    </div>
  );
};

export default UserProfile;
