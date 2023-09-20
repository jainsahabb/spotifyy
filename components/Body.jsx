import { unstable_getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import useSpotify from "../hooks/useSpotify";
import Dropdown from "./Dropdown";
import Poster from "./Poster";
import Search from "./Search";
import Track from "./Track";

const Body = ({ chooseTrack }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  // const { accessToken } = session.user;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  //searching
  useEffect(() => {
    if (!search) return setSearchResults([]);

    let cancel = false;

    if (spotifyApi.getAccessToken()) {
      spotifyApi.searchTracks(search).then((res) => {
        if (cancel) return;
        setSearchResults(
          res.body.tracks.items.map((track) => {
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
  }, [session, spotifyApi, search]);

  // //New Relaeases...

  useEffect(() => {
    let cancel = false;

    if (spotifyApi.getAccessToken()) {
      spotifyApi.getNewReleases().then((res) => {
        if (cancel) return;
        setNewReleases(
          res.body.albums.items.map((track) => {
            return {
              id: track.id,
              artist: track.artists.name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.images[0].url,
            };
          })
        );
      });
    }
    return () => (cancel = true);
  }, [session, spotifyApi]);

  // useEffect(() => {
  //   if (!search) return setSearchResults([]);
  //   if (!accessToken) return;
  //   spotifyApi.searchTracks(search).then((res) => {
  //     setSearchResults(res);
  //   });
  // }, [search, accessToken]);

  // console.log(searchResults);

  return (
    <section className="lg:max-w-[1100px] bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0
          ? newReleases
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResults
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
      </div>

      {/* tracks */}
      <div className="w-full pr-8">
        <h2 className="text-white font-bold mb-3">
          {searchResults.length === 0 ? "New Releases" : "Tracks"}
        </h2>
        <div className="lg:max-w-[1000px] space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-hide">
          {searchResults.length === 0
            ? newReleases
                .slice(4, newReleases.length)
                .map((track) => (
                  <Track
                    key={track.id}
                    track={track}
                    chooseTrack={chooseTrack}
                  />
                ))
            : searchResults
                .slice(4, searchResults.length)
                .map((track) => (
                  <Track
                    key={track.id}
                    track={track}
                    chooseTrack={chooseTrack}
                  />
                ))}
        </div>
      </div>
    </section>
  );
};

export default Body;
