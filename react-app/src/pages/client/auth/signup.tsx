import "./Signup.css";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
}

const Signup: React.FC = () => {
  const [displayText, setDisplayText] = useState<string>("");
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [showForm, setShowForm] = useState<boolean>(true);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowForm(false);
    setDisplayText(
      "An account verification email has been sent to your email address"
    );

    const data = {
      first_name: form.firstName,
      last_name: form.lastName,
      email_id: form.email,
      platform_type: "web",
    };

    console.log((window as any).catalyst);

    const auth = (window as any).catalyst.auth;
    try {
      const signupResponse = await auth.signUp(data);
      if (signupResponse.status === 200) {
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      } else {
        alert(signupResponse.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div id="signup" className="signup">
      {showForm ? (
        <div>
            <img
              width={80}
              height={80}
              src="https://cdn2.iconfinder.com/data/icons/user-management/512/profile_settings-512.png"
              alt="User Icon"
            />
            <h1>User Profile Management</h1>
          <form onSubmit={handleSubmit} className="modal-content">
              <h1>Sign Up</h1>
              <p>Please fill this form to sign up for a new account.</p>
            <label htmlFor="firstName">
              <b>First Name</b>
              <input
                name="firstName"
                className="inputs"
                placeholder="Enter First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="lastName">
              <b>Last Name</b>
              <input
                name="lastName"
                className="inputs"
                placeholder="Enter Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="email">
              <b>Email</b>
              <input
                name="email"
                className="inputs"
                placeholder="Enter email address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <p>
              By creating an account, you agree to our{" "}
              <a
                href="https://www.zoho.com/catalyst/terms.html"
                target="_blank"
                rel="noopener noreferrer"
                id="link"
              >
                Terms & Conditions
              </a>
              .
            </p>
              <input type="submit" value="Sign Up" className="signupfnbtn" />
          </form>{" "}
        </div>
      ) : (
        <p>{displayText}</p>
      )}
    </div>
  );
};

export default Signup;
