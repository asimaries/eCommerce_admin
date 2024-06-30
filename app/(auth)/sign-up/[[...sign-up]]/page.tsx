import { SignUp } from "@clerk/nextjs";
export const runtime = 'edge'

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignUp />
    </div>
  );
}
