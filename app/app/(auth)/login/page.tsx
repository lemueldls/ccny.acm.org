import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="mx-5 border border-stone-200 py-10 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md dark:border-stone-700">
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
        Continue with an account
      </h1>

      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginButton provider="anonymous">Login Anonymously</LoginButton>

          <p className="mt-4 text-center text-stone-600 dark:text-stone-400">
            If you login anonymously, your data will be stored locally until you
            create an account.
          </p>
        </Suspense>
      </div>
    </div>
  );
}
