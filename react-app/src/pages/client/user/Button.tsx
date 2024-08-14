import React, { useCallback } from "react";
import "./Button.css";

// Define the type for the btnvalue prop
interface ButtonProps {
  btnvalue: {
    title: string;
  };
}

const Button: React.FC<ButtonProps> = ({ btnvalue }) => {
  const logout = useCallback(() => {
    // Check if `window.catalyst` is available before calling `signOut`
    if (window.catalyst && window.catalyst.auth) {
      window.catalyst.auth.signOut('/');
    } else {
      console.error("Zoho Catalyst SDK is not loaded.");
    }
  }, []);

  return (
    <div id="logoutbtn">
      <button onClick={logout} id="logout">
        {btnvalue.title}
      </button>
    </div>
  );
};

export default Button;
