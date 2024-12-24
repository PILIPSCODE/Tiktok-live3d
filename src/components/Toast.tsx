import { useInteraction } from '@/hooks/useInteraction'
import React, { useEffect, useState } from 'react'
import { FaPlusCircle, FaShare } from 'react-icons/fa'

const Toast = () => {
   const {Toast,SetToast} = useInteraction()
   const [visible, setVisible] = useState(false)
   
   useEffect(() => {

    if (Toast.text !== "") {
       setVisible(true)

       const timer = setTimeout(() => {

          setVisible(false)
          SetToast({text:"",uniqueId:""})

       }, 3000) 
       return () => clearTimeout(timer)

    }
 }, [Toast])
   
  return (
    <div className={`bg-white top-10 z-50 flex items-center duration-300 text-xl gap-3 p-3 text-black absolute ${visible? "scale-100":"-top-4 scale-0"}`}>
        {Toast.text === "Follow"?
        <FaPlusCircle/>
        :
        <FaShare/>
        }
        <span>{Toast.uniqueId} Thanks For {Toast.text}</span>
    </div>
  )
}

export default Toast