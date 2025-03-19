import { useSignUp } from "@clerk/clerk-react";
import BreadCrumbs from "../components/BreadCrumbs";
import { FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import CustomGoogleOneTap from "../components/CustomGoogleOneTap";

const Register = () => {
  const [userFullName, setFullName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const { isLoaded, signUp } = useSignUp();

  const [registerErrors, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    switch (name) {
      case "name":
        errorMessage =
          value.trim().split(" ").length < 2
            ? "Enter first and last name."
            : "";
        break;

      case "email":
        errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Enter a valid email.";
        break;

      case "password":
        errorMessage =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
            ? ""
            : "Password must be at least 8 characters long, including: 1 capital letter, 1 number and a special character.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const newErrors: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
      } = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

      if (!form.name.trim()) {
        newErrors.name = "Name is required.";
      } else if (form.name.split(" ").length < 2) {
        newErrors.name = "Enter first and last name.";
      }

      if (!form.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = "Enter a valid email";
      }

      if (!form.password.trim()) {
        newErrors.password = "Password is required.";
      } else if (
        !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          form.password
        )
      ) {
        newErrors.password =
          "Password must be at least 8 characters long, including: 1 capital letter, 1 number and a special character.";
      }

      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error !== "")) {
        return;
      }

      const [firstName, lastName] = form.name.split(" ");
      try {
        if (!isLoaded) return;
        await signUp?.create({
          firstName: firstName,
          lastName: lastName,
          emailAddress: userEmail,
          password: userPassword,
        });
        setFullName("");
        setEmail("");
        setPassword("");
        await signUp.prepareEmailAddressVerification({
          strategy: "email_link",
          redirectUrl: "http://localhost:5173/",
        });
        setVerifying(true);
        await signUp.attemptVerification;
      } catch (error: any) {
        if (error.errors[0].code === "form_identifier_exists") {
          setErrors((prev) => ({
            ...prev,
            email: "Email already in use. Please use a different email.",
          }));
        } else {
          setError("An error occurred during registration. Please try again.");
        }
        console.log(registerErrors);
      }
    },
    [form, errors, userFullName, signUp]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "name") {
      formattedValue = value.toUpperCase();
    } else if (name === "email") {
      formattedValue = value.toLowerCase();
    }

    setForm((prev) => ({ ...prev, [name]: formattedValue }));
    validateField(name, formattedValue);

    if (name === "name") {
      setFullName(formattedValue);
    } else if (name === "email") {
      setEmail(formattedValue);
    } else if (name === "password") {
      setPassword(formattedValue);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <BreadCrumbs currentPage={"Sign Up"} />
      {verifying ? <div>Check Your Email</div> : <h1></h1>}
      <div className="w-80 h-111 flex flex-col  gap-3 my-10">
        <CustomGoogleOneTap sign={"signup"} />
        <div className="flex gap-3 items-center justify-center w-80">
          <hr className="w-30 text-bl-100" />
          <div className="font-inter text-l1 font-medium text-bl-500">OR</div>
          <hr className="w-30 text-bl-100" />
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          action=""
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="font-inter text-bl-600 text-p1 font-medium"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              className=" border-1 border-bl-100 rounded-md px-2 h-11 outline-none"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="font-inter text-l1 text-r-900 text-center">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-inter text-bl-600 text-p1 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              className=" border-1 border-bl-100 rounded-md px-2 h-11 outline-none"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="font-inter text-l1 text-r-900 text-center">
                {errors.email}
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
              placeholder="password"
              name="password"
              className=" border-1 border-bl-100 rounded-md px-2 h-11 outline-none"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="font-inter text-l1 text-r-900 text-center">
                {errors.password}
              </p>
            )}
          </div>
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
