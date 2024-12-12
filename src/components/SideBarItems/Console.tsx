"use client";
import { useResponse, useTiktokConnection } from "@/app/AppProvider";
import React, { useEffect, useRef, useState } from "react";

function Console() {
  const { arrConsole } = useResponse(); 
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]); 
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(consoleLogs.length > 20 ){
      consoleLogs.shift()
    }
    setConsoleLogs((prevLogs) => [...prevLogs, arrConsole]);
  }, [arrConsole]); 

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLogs]);
  return (
    <div
      ref={consoleRef}
      className="h-52 bg-black text-white text-xs  overflow-y-auto p-2 rounded"
    >
      <div>Console</div>
      {consoleLogs.map((log, index) => (
         <div key={index}>{String(log)}</div>
      ))}
    </div>
  );
}

export default Console;
