import { FormEvent, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import { useSignIn, useUser } from "@clerk/clerk-react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const { isLoaded, signIn } = useSignIn();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required.");
      return false;
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setPasswordError(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 number and 1 special character."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = (
    password: string,
    repeatPassword: string
  ) => {
    if (password !== repeatPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  async function create(e: FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    if (!validateEmail(email)) {
      e.preventDefault();
      setEmailError("Please Provide a valid email")
      return;
    }
    setEmailError("")

    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(() => {
        setVerifying(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  async function reset(e: FormEvent) {
    e.preventDefault();

    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result?.status === "complete") {
        // setActive!({ session: result.createdSessionId });
        setError("");
        navigate("/");
      } else {
        setError("Invalid code. Please check the code and try again.");
      }
    } catch (err) {
      console.error("error", err.errors[0].longMessage);
      setError(err.errors[0].longMessage);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <BreadCrumbs currentPage={"Forgot Password"} />
      <div className="w-80 h-111 flex flex-col gap-3 mt-20">
        <form
          onSubmit={verifying ? reset : create}
          action=""
          className="flex flex-col gap-3"
        >
          {verifying && (
            <>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="font-inter text-bl-600 text-p1 font-medium"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Your New Password"
                  className=" border-1 border-bl-100 rounded-md px-2 h-11 outline-none"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                />
                {passwordError && (
                  <p className="font-inter text-l1 text-r-900 text-center">
                    {passwordError}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="passwordRepeat"
                  className="font-inter text-bl-600 text-p1 font-medium"
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="passwordRepeat"
                  placeholder="Repeat Your Password"
                  className="border-1 border-bl-100 rounded-md px-2 h-11 outline-none"
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                    validateConfirmPassword(password, e.target.value);
                  }}
                />
                {confirmPasswordError && (
                  <p className="font-inter text-l1 text-r-900 text-center">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="code"
                  className="font-inter text-bl-600 text-p1 font-medium"
                >
                  Code
                </label>
                <input
                  type="text"
                  id="code"
                  placeholder="Code"
                  className="border-1 border-bl-100 rounded-md px-2 h-11 outline-none"
                  onChange={(e) => setCode(e.target.value)}
                />
                {error && (
                  <p className="font-inter text-l1 text-r-900 text-center">
                    {error}
                  </p>
                )}
              </div>
            </>
          )}
          {!verifying && (
            <>
            <div className="flex flex-col gap-1">
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
                  validateEmail(e.target.value);
                }}
              />
              {emailError && <p className="font-inter text-l1 text-r-900 text-center">{emailError}</p>}
            </div>
            </>
          )}
          <button
            type="submit"
            className="bg-bl-900 h-11 rounded-md cursor-pointer text-center text-w-900"
          >
            {verifying ? "Reset Password" : "Send Reset Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
