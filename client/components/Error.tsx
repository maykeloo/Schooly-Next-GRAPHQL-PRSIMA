import React from "react";
import { Loader } from "./Loader";

export default function Error() {
  return (
    <div className="w-full h-screen flex justify-center flex-col gap-4 items-center">
      <h1 className="text-xl font-bold">Something went wrong...</h1>
      <Loader />
    </div>
  );
}
