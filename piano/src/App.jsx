import { useState, useEffect } from "react";

const VirtualPiano = () => {
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
  }, []);

  const playNote = (frequency) => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.5
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const keys = [
    { note: "C", frequency: 261.63, color: "white" },
    { note: "C#", frequency: 277.18, color: "black" },
    { note: "D", frequency: 293.66, color: "white" },
    { note: "D#", frequency: 311.13, color: "black" },
    { note: "E", frequency: 329.63, color: "white" },
    { note: "F", frequency: 349.23, color: "white" },
    { note: "F#", frequency: 369.99, color: "black" },
    { note: "G", frequency: 392.0, color: "white" },
    { note: "G#", frequency: 415.3, color: "black" },
    { note: "A", frequency: 440.0, color: "white" },
    { note: "A#", frequency: 466.16, color: "black" },
    { note: "B", frequency: 493.88, color: "white" },
    { note: "C2", frequency: 523.25, color: "white" },
    { note: "C#2", frequency: 554.37, color: "black" },
    { note: "D2", frequency: 587.33, color: "white" },
    { note: "D#2", frequency: 622.25, color: "black" },
    { note: "E2", frequency: 659.25, color: "white" },
    { note: "F2", frequency: 698.46, color: "white" },
    { note: "F#2", frequency: 739.99, color: "black" },
    { note: "G2", frequency: 783.99, color: "white" },
    { note: "G#2", frequency: 830.61, color: "black" },
    { note: "A2", frequency: 880.0, color: "white" },
    { note: "A#2", frequency: 932.33, color: "black" },
    { note: "B2", frequency: 987.77, color: "white" },
    { note: "C3", frequency: 1046.5, color: "white" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 to-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Virtual Piano Synthesizer
      </h1>
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl">
        <div className="flex">
          {keys.map((key, index) => (
            <div key={index} className="relative">
              <button
                className={`
                  ${
                    key.color === "white"
                      ? "bg-white hover:bg-gray-100 active:bg-gray-200 w-12 h-48"
                      : "bg-black hover:bg-gray-800 active:bg-gray-700 text-white w-8 h-32 absolute top-0 z-10"
                  } 
                  rounded-b-md focus:outline-none transition-colors duration-150 ease-in-out shadow-md
                `}
                style={{
                  marginLeft: key.color === "black" ? "-1rem" : "0",
                  marginRight: key.color === "black" ? "-1rem" : "0",
                }}
                onClick={() => playNote(key.frequency)}
              >
                <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs">
                  {key.note}
                </span>
              </button>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-b-lg"></div>
      </div>
    </div>
  );
};

export default VirtualPiano;
