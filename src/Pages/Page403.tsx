import { Link } from "react-router-dom";

const Page403 = () => {
  return (
    <div className="flex flex-col items-center mt-50  gap-3 mb-32">
      <h1 className="font-bold font-inter text-9xl text-bl-900">403</h1>
      <h2 className="font-bold font-inter text-xl text-bl-800">Forbidden</h2>
      <p className="font-light font-inter text-p1 text-bl-600">
        Looks like you lack the permission to access this page. Please Login or Create an Account and try
        again
      </p>
      <div className="flex gap-3">
        <div className="bg-bl-900 h-11 w-60 rounded-md cursor-pointer text-center text-w-900 content-center">
          <Link to={"/login"}>Log In</Link>
        </div>
        <div className="bg-bl-900 h-11 w-60 rounded-md cursor-pointer text-center text-w-900 content-center">
          <Link to={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Page403;
