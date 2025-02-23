import { useCharacter } from '@/hooks/useCharacter';
import { useState, useEffect, useRef } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import Image from 'next/image';
import { ResorceType } from '../../../interface';
import { FaCircleXmark } from 'react-icons/fa6';
import { useInteraction } from '@/hooks/useInteraction';

export default function UploadToLocalStorage(): JSX.Element {
    const [message, setMessage] = useState<string>('');
    const { SetInteraction, Intercation } = useInteraction();
    const [ResourceMap, setResourceMap] = useState<ResorceType[]>([]);
    const { Resource, setResource } = useCharacter()
    const [currentTrack, setCurrentTrack] = useState<ResorceType>({ type: "", Base64: "", name: "" });
    const audioRef = useRef<HTMLAudioElement | null>(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];

        if (!file) {
            setMessage('Please select a file.');
            return;
        }


        if (!(file.type === "audio/mpeg" || file.type === "audio/wav" || file.type === "image/gif")) {
            setMessage('Please select a valid audio file (mp3, mp4, wav, gif).');
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                const base64String = reader.result.split(',')[1];
                setResource((prev: any) => [...prev, { name: file.name, type: file.type, Base64: base64String }])
                setMessage('File saved to local storage as Base64.');
            } else {
                setMessage('Failed to convert file to Base64.');
            }
        };

        reader.onerror = () => {
            setMessage('Error reading file.');
        };

        reader.readAsDataURL(file);
    };

    const handleDelete = (e: ResorceType) => {

        SetInteraction((prev: any) =>
            prev.map((el: any) =>
                el.audio === e.name ? { ...el, audio: "" } : el
            )
        );
        setResource((prev: any) => prev.filter((el: any) => el.name !== e.name));
    };

    useEffect(() => {
        setResourceMap(Resource)
    }, [Resource])

    useEffect(() => {
        if (currentTrack.type !== "") {
            const audio = new Audio(`data:${currentTrack.type};base64,` + currentTrack.Base64);
            audio.volume = 1;
            audioRef.current = audio;
            audio.play();
        }
    }, [currentTrack])


    return (
        <div className='p-6 relative flex flex-wrap items-center gap-10'>
            {ResourceMap.map((e: ResorceType, index: number) => (
                <div key={index} className='relative'>
                    <FaCircleXmark onClick={() => handleDelete(e)} className='absolute z-50 -right-1 -top-2' />
                    <div onClick={() => setCurrentTrack(e)} data-tip={`${e.name.slice(0, 7)}...`} className='tooltip-bottom text-sm tooltip-open tooltip h-14 w-14 relative bg-slate-500'>
                        <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={e.type === "audio/mpeg" ? "/mp3.avif" : (e.type === "image/gif" ? "/gifico.jpeg" : "/wav.png")} fill alt={'img'} />
                    </div>
                </div>

            ))}


            <div className=' h-16 w-16 my-2 '>

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-xl bg-white flex h-full justify-center items-center text-black rounded"
                >
                    <FaPlusSquare />
                </label>
            </div>

            <div></div>


        </div>
    );
}
