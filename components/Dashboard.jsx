import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playingTrackState } from "../atoms/playerAtom";
import Body from "./Body";
import Player from "./Player";
import Right from "./Right";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { data: session } = useSession();

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };
  return (
    <main className="flex bg-black min-h-screen max-w-[1500px] lg:pb-24 ">
      <Sidebar />
      <Body chooseTrack={chooseTrack} />
      <Right chooseTrack={chooseTrack} />

      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
