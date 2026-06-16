let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playHoverSound = () => {
  if (!audioCtx) initAudio();
  if (!audioCtx || audioCtx.state !== 'running') return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  // A very short, high frequency "tick" sound
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.05);

  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
};

export const playTransitionSound = () => {
  if (!audioCtx) initAudio();
  if (!audioCtx || audioCtx.state !== 'running') return;

  // A low sweeping "whoosh" sound
  const bufferSize = audioCtx.sampleRate * 0.5; // 0.5 seconds of noise
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = buffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(100, audioCtx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.2);
  filter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.5);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  noiseSource.start();
};
