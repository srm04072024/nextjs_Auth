"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data.data);
      setData(res.data.data._id);
      router.push(`/profile/${res.data.data._id}`);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error at Porfile : ", error.message);
        toast.error(error.message);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success.");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error at Porfile : ", error.message);
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl">Profile Page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "No User Details Found"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={getUserDetails}
        className="px-4 py-2 bg-green-600 text-white rounded-md"
      >
        Click to Get Details
      </button>
      <button
        onClick={logout}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
