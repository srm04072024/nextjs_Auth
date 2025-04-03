"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Signup Failed!", error.message);
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="h-full max-w-full w-full flex flex-col items-center justify-center">
      <div className="h-2/3 w-2/3 md:w-3/8  bg-neutral-500 rounded-2xl ">
        <div className="w-3/4 h-full mx-auto flex flex-col justify-evenly">
          <div className="text-center text-2xl">
            {loading ? "Processing..." : "Sign Up"}
          </div>
          <div className="h-1/9">
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })} //1st destructure 2nd Update
              className="h-full w-full bg-neutral-100 placeholder:text-neutral-500 px-2 text-neutral-800"
            />
          </div>
          <div className="h-1/9">
            <input
              type="email"
              placeholder="Emali"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="h-full w-full bg-neutral-100  placeholder:text-neutral-500  px-2 text-neutral-800"
            />
          </div>
          <div className="h-1/9">
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="h-full w-full bg-neutral-100  placeholder:text-neutral-500  px-2 text-neutral-800"
            />
          </div>
          <div className="h-1/9 w-1/2 mx-auto">
            <button
              className=" h-full w-full bg-neutral-900"
              disabled={buttonDisabled}
              onClick={onSignup}
            >
              {buttonDisabled ? "No Sign up" : "Sign up"}
            </button>
          </div>
          <p className="text-center text-white text-sm">
            Already Sign up ?{" "}
            <Link href="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
