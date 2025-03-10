import { GoogleOneTap, useSignUp } from "@clerk/clerk-react";
import BreadCrumbs from "../components/BreadCrumbs";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [userFullName, setFullName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [verifying, setVerifying] = useState(false)
    const { isLoaded, signUp } = useSignUp();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const [firstName, lastName] = userFullName.split(' ')
    if (!isLoaded) return
    await signUp?.create({
      firstName: firstName,
      lastName: lastName,
      emailAddress : userEmail,
      password : userPassword
    })
    await signUp.prepareEmailAddressVerification({
      strategy:'email_link',
      redirectUrl: 'http://localhost:5173/'
    })
    setVerifying(true)
    await signUp.attemptVerification

  }

  



  return (
    <div className="flex flex-col items-center">
      <BreadCrumbs currentPage={"Sign Up"} />
      {verifying ? <div>Check Your Email</div> : <h1></h1>};
      <div className="w-80 h-111 flex flex-col gap-3">
        <button className="h-11 w-80 cursor-pointer">
          <GoogleOneTap />
        </button>
        <form
          onSubmit={(e) => handleSignUp(e)}
          action=""
          className="flex flex-col gap-3"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            className=" border-1 border-bl-100 rounded-md px-2 h-11"
            onChange={(e) => setFullName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            className=" border-1 border-bl-100 rounded-md px-2 h-11"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            className=" border-1 border-bl-100 rounded-md px-2 h-11"
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1>
            By creating an account you agree with our Terms of Service, Privacy
            Policy.
          </h1>
          <button
            type="submit"
            className="bg-bl-900 h-11 rounded-md cursor-pointer text-center text-w-900"
          >
            Create account
          </button>
        </form>
        <Link to={"/login"} className="text-center">
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
};

export default Register;
