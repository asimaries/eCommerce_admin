import { SignIn } from "@clerk/nextjs";
export const runtime = 'experimental-edge'

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}
