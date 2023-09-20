import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  return (
    <>
      <Head>
        <title>Spotify App</title>
        <link rel="icon" href="/assets/spotifylogo.png" />
      </Head>
      <main>
        <Dashboard />
      </main>
    </>
  );
};

export default Home;
