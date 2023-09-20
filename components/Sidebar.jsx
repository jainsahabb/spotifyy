import { ChartBarIcon, ClockIcon, HomeIcon } from "@heroicons/react/24/solid";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiCompassFill } from "react-icons/ri";
import Image from "next/image";

function Sidebar() {
  return (
    <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black w-[80px] h-screen space-y-8">
      <Image
        src="/assets/spotifylogo.png"
        className="object-contain"
        width="56"
        height="56"
      />
      <div className="flex flex-col space-y-8">
        <HomeIcon className="sidebarIcon text-white opacity-[0.85]" />
        <RiCompassFill className="sidebarIcon text-2xl" />
        <FaMicrophoneAlt className="sidebarIcon ml-1" />
        <ChartBarIcon className="sidebarIcon" />
        <ClockIcon className="sidebarIcon" />
      </div>
    </section>
  );
}

export default Sidebar;
