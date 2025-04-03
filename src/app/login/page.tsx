"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      router.push("/profile");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Signup Failed", error.message);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="h-full max-w-full w-full flex flex-col items-center justify-center">
      <div className="h-2/3  w-2/3 md:w-3/8 bg-neutral-500 p-4 rounded-2xl ">
        <div className="w-3/4 h-full mx-auto flex flex-col justify-evenly">
          <div className="text-center text-2xl">
            {loading ? "Processing..." : "Login"}
          </div>

          <div className="h-1/8">
            <input
              type="email"
              placeholder="Emali"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="h-full w-full bg-neutral-100 placeholder:text-neutral-500 px-2 text-neutral-800"
            />
          </div>
          <div className="h-1/8">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="h-full w-full bg-neutral-100 placeholder:text-neutral-500 px-2 text-neutral-800"
            />
          </div>
          <div className="h-1/8 w-1/2 mx-auto">
            <button
              className=" h-full w-full bg-neutral-900"
              disabled={buttonDisabled}
              onClick={onLogin}
            >
              {buttonDisabled ? "No Login " : "Login"}
            </button>
          </div>
          <p className="text-center text-white text-sm">
            Don&apos;t have an account ?{" "}
            <Link href="/signup" className="text-blue-400">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
