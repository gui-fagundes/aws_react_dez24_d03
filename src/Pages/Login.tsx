import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import { FormEvent, useEffect, useState } from "react";
import { useSignIn, useUser } from "@clerk/clerk-react";
import CustomGoogleOneTap from "../components/CustomGoogleOneTap";

const Login = () => {
  const { signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const emailAddress = userEmail;
    const password = userPassword;

    if (emailAddress.length <= 0) {
      setErrorEmail("Enter your email");
      return;
    }

    if (!validateEmail(emailAddress)) {
      setErrorEmail("Invalid email address");
      return;
    }

    setErrorEmail("");
    try {
      const signInResource = await signIn?.create({
        identifier: emailAddress,
        password,
      });

      if (signInResource?.status === "complete") {
        await setActive?.({ session: signInResource.createdSessionId });
        navigate("/");
      }
    } catch (error: any) {
      if (error?.errors?.[0]?.code === "session_exists") {
        navigate("/");
      } else {
        setErrorPassword(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex flex-col items-center max-w-screen">
      <BreadCrumbs currentPage={"Login"} />
      <div className="w-80 h-111 flex flex-col gap-3 my-10">
        <CustomGoogleOneTap sign={"signin"} />
        <div className="flex gap-3 items-center justify-center w-80">
          <hr className="w-30 text-bl-100" />
          <div className="font-inter text-l1 font-medium text-bl-500">OR</div>
          <hr className="w-30 text-bl-100" />
        </div>
        <form
          onSubmit={(e) => handleLogin(e)}
          action=""
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-inter text-bl-600 text-p1 font-medium"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Your Email"
              className=" border-1 border-bl-100 rounded-md px-2 h-11 outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorEmail("");
              }}
            />
            {errorEmail && (
              <p className="font-inter text-l1 text-r-900 text-center">
                {errorEmail}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="font-inter text-bl-600 text-p1 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className=" border-1 border-bl-100 rounded-md px-2 h-11 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorPassword && (
              <p className="text-red-500 text-sm mt-1">{errorPassword}</p>
            )}
          </div>
          <Link to={"/recover"} className="self-end">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="bg-bl-900 h-11 rounded-md cursor-pointer text-center text-w-900"
          >
            Login
          </button>
        </form>
        <Link to={"/register"} className="text-center">
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
