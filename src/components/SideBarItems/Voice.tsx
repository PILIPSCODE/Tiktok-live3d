"use client"
import React, { useEffect, useState } from 'react'
import Input from '../Ui/input';
import { useCharacter } from '@/hooks/useCharacter';
import CustomSelect from '../Ui/select';
import { VoiceSettings } from '../../../interface';

function Voice() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { setVoiceSettings, voiceSettings } = useCharacter()
  const [voiceSettingsLocal, setVoiceSettingsLocal] = useState<VoiceSettings>({ voice: "", rate: "1", pitch: "1", volume: "1" })


  useEffect(() => {
    setVoiceSettingsLocal(voiceSettings)
  }, [voiceSettings])

  useEffect(() => {
    if (typeof window !== "undefined" && speechSynthesis) {
      const loadVoices = () => setVoices(speechSynthesis.getVoices());
      loadVoices();

      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);


  const handleSelectVoice = (e: any) => {
    setVoiceSettings({ ...voiceSettings, voice: e.voiceURI })
  }

  const handleChangeRate = (e: any) => {
    setVoiceSettings({ ...voiceSettings, rate: e.target.value })
  }
  const handleChangeVolume = (e: any) => {
    setVoiceSettings({ ...voiceSettings, volume: e.target.value })
  }
  const handleChangePitch = (e: any) => {
    setVoiceSettings({ ...voiceSettings, pitch: e.target.value })
  }
  return (
    <div className='p-4  text-base '>
      <CustomSelect
        placeholder="Select TTS Browsher Voice"
        options={voices}
        defaultValue={`${voiceSettings.voice}`}
        displayKey="voiceURI"
        className='text-sm'
        onSelect={handleSelectVoice}
      />
      <div className='mt-5 text-sm'>
        <div className='flex gap-3 w-full'>
          <div className='w-full'>
            <input defaultValue={voiceSettingsLocal?.rate} onChange={(e) => handleChangeRate(e)} type="range" min={0} max="2" className="range w-full" step="0.1" />
            <h1>Rate</h1>
          </div>
          <p>{voiceSettingsLocal?.rate}</p>
        </div>
        <div className='flex gap-3 w-full'>
          <div className='w-full'>
            <input defaultValue={voiceSettingsLocal?.volume} onChange={(e) => handleChangeVolume(e)} type="range" min={0} max="1" className="range w-full" step="0.1" />
            <h1>Volume</h1>
          </div>
          <p>{voiceSettingsLocal?.volume}</p>
        </div>
        <div className='flex gap-3 w-full'>
          <div className='w-full'>
            <input defaultValue={voiceSettingsLocal?.pitch} onChange={(e) => handleChangePitch(e)} type="range" min={0} max="1" className="range w-full" step="0.1" />
            <h1>Pitch</h1>
          </div>
          <p>{voiceSettingsLocal?.pitch}</p>
        </div>
      </div>



    </div>
  )
}

export default Voice