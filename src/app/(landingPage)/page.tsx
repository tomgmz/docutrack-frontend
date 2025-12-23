"use client"
import LoginForm from "./components/LoginFrom";
import { ModeToggle } from "@/components/theme/ModeToggle";
import GoogleButton from "../auth/google/page";

export default function LandingPage() {
  return (
    <div className="flex w-full min-h-screen flex-col">
      <header className="w-full h-16 flex items-center justify-end p-4 dark:bg-bgDark">
        <ModeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center w-full flex-col">
        <p className="font-league font-[700] text-[45px] text-[#000000] dark:text-white">
          WELCOME!
        </p>
        <div className="flex flex-col justify-center mt-6 w-[379px]">
          <LoginForm />

          <div className="flex items-center gap-4 w-full mt-6 mb-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm font-medium">Continue with</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
          <GoogleButton />
        </div>
      </main>
    </div>
  );
}
