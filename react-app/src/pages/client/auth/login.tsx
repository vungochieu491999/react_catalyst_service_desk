import { useEffect } from "react";
import { Link } from "react-router-dom";

// Declare global variables if needed
declare global {
  interface Window {
    catalyst: any; // Add type definition for `catalyst` if available
  }
}

const LoginPage: React.FC = () => {
  useEffect(() => {
    // Define configuration for sign-in
    const config = {
      css_url: "/app/embeddediframe.css", // Custom CSS for login page
      is_customize_forgot_password: false, // Whether to customize forgot password page
      forgot_password_id: "login", // ID where forgot password page will be rendered
      forgot_password_css_url: "/app/fpwd.css" // Custom CSS for forgot password page
    };

    console.log(window.catalyst);
    // Check if `catalyst` is available before using it
    if (window.catalyst && window.catalyst.auth) {
      window.catalyst.auth.signIn("login", config);
    } else {
      console.error("Zoho Catalyst SDK is not loaded.");
    }
  }, []);

  return (
    <div className="container">
      <img
        width={80}
        height={80}
        src="https://cdn2.iconfinder.com/data/icons/user-management/512/profile_settings-512.png"
        alt="User Icon"
      />
      <h1 className="title">User Profile Management</h1>
      <div id="login"></div>
      <p className="homepage">
        <b>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Sign-up
          </Link>{" "}
          now!
        </b>
      </p>
    </div>
  );
};

export default LoginPage;
