import { ModeToggle } from "@/components/theme/ModeToggle";

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