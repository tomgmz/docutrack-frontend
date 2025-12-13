import { ModeToggle } from "@/components/darkMode/ModeToggle";

export default function LandingPage(){
  return (
    <div>
      <p className="font-didact">
        Welcome to DocuTrack
      </p>
      <div>
        <ModeToggle/>
      </div>
    </div>
  );
}