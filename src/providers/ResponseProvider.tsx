import React, { useState } from "react";
import { ResponseContext } from "@/hooks/useResponse";
import useLocalStorage from "@/hooks/LocalStorage";
import { BubbleSettings, ResponseAi } from "../../interface";


export const ResponseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [BubbleChat, setBubbleChat] = useLocalStorage<BubbleSettings>(
    "BubbleSettings",
    {
      TypeBorder: "Border3",
      CommentPosition: "text-center",
      ResponsePosition: "text-justify",
      usernamePosition: "text-left",
      TextSpeed: "5",
    }
  );
  const [Airesponse, SetAiResponse] = useState<ResponseAi[]>([]);
  const [arrConsole, SetarrConsole] = useState("");
  const [showBubble, setShowBubble] = useState(false);




  return (
    <ResponseContext.Provider
      value={{
        Airesponse,
        arrConsole,
        BubbleChat,
        showBubble,
        SetAiResponse,
        setBubbleChat,
        SetarrConsole,
        setShowBubble,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};
