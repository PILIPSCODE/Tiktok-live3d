"use client"
import React, { useEffect, useState } from 'react'
import Input from '../Ui/input';
import { useCharacter } from '@/app/AppProvider';

function Voice() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [show, setShow] = useState(false)
  const [input, setInput] = useState("")
  const [Rate, setRate] = useState("1")
  const [Volume, setVolume] = useState("1")
  const [Pitch, setPitch] = useState("1")
  
  const {setVoiceSettings,voiceSettings} = useCharacter()

  useEffect(() => {
    if (typeof window !== "undefined" && speechSynthesis) {
      const loadVoices = () => setVoices(speechSynthesis.getVoices());
      loadVoices();

      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleClickVoice = (e:any) => {
    setInput(e.voiceURI)
    setVoiceSettings({...voiceSettings,voice:e.voiceURI})
    setShow(false) 
  }

  const handleChangeRate = (e:any) => {
    setRate(e.target.value)
    setVoiceSettings({...voiceSettings,rate:e.target.value})
  }
  const handleChangeVolume = (e:any) => {
    setVolume(e.target.value)
    setVoiceSettings({...voiceSettings,volume:e.target.value})
  }
  const handleChangePitch = (e:any) => {
    setPitch(e.target.value)
    setVoiceSettings({...voiceSettings,pitch:e.target.value})
  }
  return (
    <div className='p-4  text-base '>
      <div className='w-full relative '>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Selest Your Google TTs' onFocus={() => setShow(true)} Inputsize={"sm"} className='w-full max-md:w-full' />
        <div className={`${show ? "h-32 opacity-100" : "z-0 h-0 opacity-0"} w-full mt-2 p-2 bg-white border overflow-y-scroll duration-300 absolute z-50`}>
          {voices.filter((e) => e.voiceURI.includes(input)).map((e, index) => (
            <div onClick={() => handleClickVoice(e)} key={index}>{e.voiceURI}</div>
          ))}
        </div>
      </div>
      <div className='mt-5 text-sm'>
        <div className='flex gap-3 w-full'>
          <div className='w-full'>
            <input value={Rate} onChange={(e) => handleChangeRate(e)} type="range" min={0} max="2" className="range" step="0.1" />
            <h1>Rate</h1>
          </div>
          <p>{Rate}</p>
        </div>
        <div className='flex gap-3 w-full'>
          <div className='w-full'>
            <input value={Volume} onChange={(e) => handleChangeVolume(e)}  type="range" min={0} max="1" className="range" step="0.1" />
            <h1>Volume</h1>
          </div>
          <p>{Volume}</p>
        </div>
        <div className='flex gap-3 w-full'>
          <div className='w-full'>
            <input value={Pitch} onChange={(e) => handleChangePitch(e)}  type="range" min={0} max="1" className="range" step="0.1" />
            <h1>Pitch</h1>
          </div>
          <p>{Pitch}</p>
        </div>
      </div>



    </div>
  )
}

export default Voice