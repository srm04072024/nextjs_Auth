"use client";

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  //   const router = useRouter(); // Using Next js Router
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    // setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // Using Next js Router
    // const { query } = router;
    // const urlTokenTwo = query.token;
  }, []);
  useEffect(() => {
    // setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-3">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-1 bg-cyan-300 text-neutral-600">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div className=" flex gap-3">
          <h2>User Verified</h2>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div className="text-red-600 bg-amber-200">
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
}
