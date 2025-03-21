import { useUser } from "@clerk/clerk-react";

const AccountDetails = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userFullName = `${
    user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : `${user?.firstName}`
  }`;
  const userImage = `${user?.imageUrl}`;

  return (
    <div className="flex flex-col gap-5 px-10">
      <div className="flex flex-col">
        <h1 className="font-inter font-semibold text-h5 text-bl-900">
          Account Details
        </h1>
      </div>
      <div className="flex flex-col">
        <div>
          <img
            src={userImage}
            alt="userImage"
            className="rounded-full max-w-12 max-h-12 border-1 border-bl-800"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="userFullName"
          className="font-inter text-p1 font-medium text-bl-600"
        >
          Full Name
        </label>
        <input
          id="userFullName"
          name="userFullName"
          type="text"
          value={userFullName}
          disabled={true}
          className="border-1 border-bl-200 rounded-md px-2 h-11 max-w-80 text-center font-inter text-l1 font-medium text-bl-400"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="userEmail"
          className="font-inter text-p1 font-medium text-bl-600"
        >
          Email
        </label>
        <input
          id="userEmail"
          name="userEmail"
          type="text"
          value={userEmail}
          disabled={true}
          className="border-1 border-bl-200 rounded-md px-2 h-11 max-w-80 text-center font-inter text-l1 font-medium text-bl-400"
        />
      </div>
    </div>
  );
};

export default AccountDetails;
