import { useState, useRef } from "react";

function MicRecorder({ onRecordingStop }) {  // CHANGE: accept onRecordingStop prop
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const chunksRef = useRef([]);
  const animationRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      chunksRef.current = [];

      // CHANGE: tell StressManagement that recording has stopped
      if (onRecordingStop) onRecordingStop();
    };

    mediaRecorder.start();

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);

    analyser.fftSize = 2048;
    microphone.connect(analyser);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    setRecording(true);
    drawWaveform();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();       // this triggers mediaRecorder.onstop above
    cancelAnimationFrame(animationRef.current);
    audioContextRef.current.close();
    setRecording(false);

    // NOTE: do NOT call onRecordingStop() here
    // it's already called inside mediaRecorder.onstop above
    // calling it here too would trigger it twice
  };

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;

    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00ffcc";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  const clearRecording = () => {
    setAudioURL(null);
  };

  return (
    <div className="card p-4 mt-4 text-center">
      <h5 className="mb-3">Live Voice Stress Analyzer</h5>

      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        style={{
          width: "100%",
          background: "#0f172a",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      />

      {!recording ? (
        <button className="btn btn-danger me-2" onClick={startRecording}>
          🎤 Start Recording
        </button>
      ) : (
        <button className="btn btn-secondary me-2" onClick={stopRecording}>
          ⏹ Stop Recording
        </button>
      )}

      {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL}></audio>

          <div className="mt-2">
            <button className="btn btn-outline-danger btn-sm" onClick={clearRecording}>
              Clear Recording
            </button>
          </div>

          <p className="text-muted mt-2" style={{ fontSize: "12px" }}>
            🔒 Privacy Safe: Audio remains only on your device and is not uploaded.
          </p>
        </div>
      )}
    </div>
  );
}

export default MicRecorder;