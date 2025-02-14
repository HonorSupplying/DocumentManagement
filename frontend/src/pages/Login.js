import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const handleLoginSuccess = (response) => {
    // Here, you can send the Google token to your backend for verification
    console.log("Login Successful", response);
    // Redirect to the main page or another page
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed", error);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        useOneTap
      />
    </div>
  );
};

export default Login;
