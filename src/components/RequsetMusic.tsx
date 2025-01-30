import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useMusic } from "@/hooks/useMusic";
import { MusicType, ReqMusic } from "../../interface";


type props = {
  in: string
}
function RequsetMusic(props: props) {
  const {
    QuequeMusic,
    MusicTitle,
    setIsPlay,
    setSkip,
    checkboxMusic,
  } = useMusic();

  const widthcustom = props.in === "sidebar" ? "w-96" : "w-80"
  const isvisible = MusicTitle.length > 0 || QuequeMusic.length > 0
  const oke = (
    <div className='bg-gray-300/15 rounded-md py-2 px-2'>
      <Marquee speed={60}>
        <div className={`flex flex-shrink-0 gap-2  mx-2 items-center`}>
          {QuequeMusic?.map((e: MusicType, index: number) => (
            <div
              key={index}
              className={`flex flex-shrink-0 gap-2 ${widthcustom}   p-2 bg-white relative  rounded-md items-center`}
            >
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                  className="object-fill"
                  fill
                  src={e.thumbnails || "/imgChar/PilKia.png"}
                  alt="thumbnails"
                />
              </div>
              <p
                onClick={() => {
                  setSkip(e.title);
                  setIsPlay(false);
                }}
                className="absolute text-red-500 w-6 h-6 flex justify-center items-center  right-2 top-2 border border-red-500 rounded-full"
              >
                X
              </p>
              <p className="text-xs text-gray-700 w-7/12">{index === 0 ? "Playing" : "Waiting"} : {e.title}</p>
              <p className="text-xs absolute bottom-0 left-0 w-full text-center bg-black text-white">Request from {e.uniqueId}</p>

            </div>
          ))}
          {MusicTitle.length !== 0 ? MusicTitle?.map((e: ReqMusic, i: number) => (
            <div
              key={i}
              className={`flex flex-shrink-0 gap-2 mx-2 w-96 ${widthcustom}    bg-white p-2 relative  rounded-md items-center`}
            >
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                  className="rounded-full object-fill"
                  fill
                  src={e.img}
                  alt="thumbnails"
                />
              </div>
              <div >
                <p className="text-xs mx-1 text-gray-700">{e.Title !== "" ? e.Title : `Menunggu Requset Dari ${e.uniqueId}`} </p>
                <p className="text-xs mt-1 bg-black text-white p-1">
                  !play `Music` || `Author`
                </p>
              </div>
            </div>
          )) :
            ""
          }


        </div>
      </Marquee>
    </div>

  );
  if (props.in === "sidebar" && isvisible) {
    return oke
  } else if (checkboxMusic.current?.checked && isvisible) {
    return oke
  }
}

export default RequsetMusic;
