import { authMiddleware } from "@clerk/nextjs";
export const runtime = 'experimental-edge'

export default authMiddleware({
  publicRoutes: ["/api/:path*"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};