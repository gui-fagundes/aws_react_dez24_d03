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
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  async function create(e: FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

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
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                placeholder="Your New Password"
                className=" border-1 border-bl-100 rounded-md px-2 h-11"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="passwordRepeat">Repeat Password</label>
              <input
                type="password"
                id="passwordRepeat"
                placeholder="Repeat Your Password"
                className="border-1 border-bl-100 rounded-md px-2 h-11"
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                placeholder="Code"
                className="border-1 border-bl-100 rounded-md px-2 h-11"
                onChange={(e) => setCode(e.target.value)}
              />
            </>
          )}
          {!verifying && (
            <>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className=" border-1 border-bl-100 rounded-md px-2 h-11"
                onChange={(e) => setEmail(e.target.value)}
              />
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
