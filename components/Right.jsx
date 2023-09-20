import React from "react";
import Dropdown from "./Dropdown";
import { HiOutlineShieldCheck, HiViewGrid } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RecentlyPlayed from "./RecentlyPlayed";
import useSpotify from "../hooks/useSpotify";

const Right = ({ chooseTrack }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  //   const { accessToken } = session;
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [MyPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    let cancel = false;

    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
        if (cancel) return;
        setRecentlyPlayed(
          res.body.items.map(({ track }) => {
            return {
              id: track.id,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[0].url,
            };
          })
        );
      });
    }
    return () => (cancel = true);
  }, [session, spotifyApi]);

  useEffect(() => {
    let cancel = false;

    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedTracks().then((res) => {
        if (cancel) return;
        setMyPlaylist(
          res.body.items.map(({ track }) => {
            return {
              id: track.id,
              artist: track.artists.name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[0].url,
            };
          })
        );
      });
    }
    return () => (cancel = true);
  }, [session, spotifyApi]);

  return (
    <section>
      <div className="flex space-x-7 items-center py-4">
        <div className="flex items-center space-x-4 border-2 text-white border-[#262626] rounded-full h-8 py-4 px-4">
          <h2>{session?.user.name}</h2>
        </div>
        <Dropdown />
        {/* Profile */}
      </div>
      {/* Recently played Track */}
      <div className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm">Recently Played</h4>
          <HiViewGrid className="text-[#686868] h-6" />
        </div>

        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[320px] scrollbar-hide">
          {recentlyPlayed.map((track, index) => (
            <RecentlyPlayed
              key={index}
              track={track}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
        <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
          View All
        </button>
      </div>

      {/* my Playlist */}
      <div className="bg-[#0D0D0D] border-2 border-[#262626] p-4 mt-4 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm">MY Playlist</h4>
          <HiViewGrid className="text-[#686868] h-6" />
        </div>

        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[350px] scrollbar-hide">
          {MyPlaylist.map((track, index) => (
            <RecentlyPlayed
              key={index}
              track={track}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
        <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
          View All
        </button>
      </div>
    </section>
  );
};

export default Right;
