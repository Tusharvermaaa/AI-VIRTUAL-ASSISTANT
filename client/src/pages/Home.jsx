import React, { useContext, useEffect, useState } from "react";
import { userdatacontext } from "../context/usercontext";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { geminiresponse } from "../../../server/gemini";

const Home = () => {
  const [GeminiOutput, setGeminiOutput] = useState(null);
  const [listen, setlisten] = useState("hello");
  const { serverurl, getTextresponse, userdata } = useContext(userdatacontext);
  const navigate = useNavigate();
  // const {selectedname , selectedimg} = useContext(userdatacontext);
  const handlelogout = async () => {
    try {
      const result = await axios.get(`${serverurl}/user/logout`, {
        withCredentials: true,
      });
      console.log(result.data, "after deletion");
      window.location.href = "/signin";
      // navigate("/signin");
    } catch (error) {
      console.log("logout error ", error);
    }
  };

  ////
  useEffect(() => {
    const fetchGeminiResponse = async () => {
      console.log("taking", listen);
      const res = await getTextresponse(listen);
      if (res?.data?.response) {
        speak(res.data.response);
        setGeminiOutput(res.data.response); // ✅ Save the assistant's voice-style response
      }
    };
    if (userdata) {
      fetchGeminiResponse();
    }
  }, [userdata, listen]);
  // setting up speech recognition with webspeech api
useEffect(() => {
  const SpeechRecognize = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognize || !userdata?.assistantname) return;

  const recognition = new SpeechRecognize();
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  let stoppedManually = false;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    if (transcript.toLowerCase().includes(userdata.assistantname.toLowerCase())) {
      setlisten(transcript);
    }
  };

  recognition.onend = () => {
    if (!stoppedManually) {
      console.log("Speech recognition stopped. Restarting...");
      recognition.start(); // auto-restart
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recognition.start();

  // cleanup
  return () => {
    stoppedManually = true;
    recognition.stop();
  };
}, [userdata]);

  // useEffect(() => {
  //   const SpeechRecognize =
  //     window.SpeechRecognition || window.webkitSpeechRecognition;
  //   const recognition = new SpeechRecognize();
  //   recognition.continuous = true;
  //   recognition.lang = "en-US";
  //   recognition.interimResults = false;
  //   // recognition.maxAlternatives = 1;

  //   recognition.start();

  //   recognition.onresult = function (event) {
  //     const transcript =
  //       event.results[event.results.length - 1][0].transcript.trim();
  //     console.log(
  //       "this is transcript :",
  //       transcript,
  //       " asistant is:",
  //       userdata.assistantname.toLowerCase()
  //     );
  //     if (
  //       userdata?.assistantname &&
  //       transcript.toLowerCase().includes(userdata.assistantname.toLowerCase())
  //     ) {
  //       console.log(transcript , " selected only ")
  //       setlisten(transcript);
  //     }
  //     // output.textContent = 'You said: ' + transcript;
  //   };

  //   recognition.onerror = function (event) {
  //     const errormsg = "Error occurred: " + event.error;
  //     //  setoutput(errormsg);
  //     console.log(errormsg);
  //   };
  // }, [listen]);
// sepak function for ai assitant 
 const speak=(text)=>{

     if (!window.speechSynthesis) {
    console.error("Speech synthesis not supported in this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US'; // You can change to 'hi-IN', 'en-UK', etc.
  utterance.rate = 1;       // Speed (0.1 to 10)
  utterance.pitch = 1;      // Pitch (0 to 2)
  utterance.volume = 1;     // Volume (0 to 1)

  // Optional: Choose a specific voice
//   const voices = window.speechSynthesis.getVoices();
//   console.log(voices,"are voices");
//    let selectedvoice = voices.find(voice => voice.name.includes("Heera")); // example
// if(selectedvoice){
//   utterance.voice=selectedvoice;
// }


  window.speechSynthesis.speak(utterance); 
 }
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[#070707] to-[#070752] flex items-center justify-center flex-col">
      <div
        onClick={() => navigate("/customize")}
        className="font-bold text-2xl text-[white]  cursor-pointer absolute top-15  right-15 w-[100px]"
      >
        {/* <MdOutlineArrowBackIosNew className="font-bold text-2xl text-[white] cursor-pointer "/> */}
        Customize
      </div>
      <div
        onClick={handlelogout}
        className="font-bold text-2xl text-[white]  cursor-pointer absolute top-39  right-15 w-[100px]"
      >
        {/* <RiLogoutCircleLine className="font-bold text-2xl text-[white] cursor-pointer "/>  */}
        Logout
      </div>
      {/* <MdOutlineArrowBackIosNew className="font-bold text-2xl text-[white]  cursor-pointer absolute top-15  left-15  "  onClick={()=>navigate("/customize")} /> */}

      <h1 className="text-[white] m-[22px] text-3xl text-[#5656f3] ">{`${userdata.assistantname}`}</h1>
      <div className="minw-[300px] h-[300px] w-[300px] bg-blue-500 border-2 border-[#070765] rounded-full overflow-hidden hover:shadow-2xl hover:shadow-blue-900 hover:border-2 hover:border-b-blue-300 cursor-pointer flex items-center justify-center">
        <img
          src={`${userdata.assistantimage}`}
          className="object-cover h-full w-full min-h-[300px] "
        />
      </div>
      <div className="text-3xl text-indigo-200 m-[23px]">{`${GeminiOutput}`}</div>
      <div className="text-3xl text-indigo-200 m-[23px]">{`${listen}`}</div>
    </div>
  );
};

export default Home;
