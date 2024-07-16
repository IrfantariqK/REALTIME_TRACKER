import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-token="));

    // Define the routes where you want to redirect if token is not present
    const protectedRoutes = ["/", "/Signup", "/Forget_password"];

    // Check if token is not present and current route is not a protected route
    if (!token && !protectedRoutes.includes(router.pathname)) {
      router.replace("/"); 
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
