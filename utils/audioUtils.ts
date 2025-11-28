
// Helper to write string to DataView
function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

// Convert AudioBuffer to WAV Blob
function bufferToWav(buffer: AudioBuffer): Blob {
  const numOfChan = 1; // Force Mono
  const length = buffer.length * numOfChan * 2 + 44;
  const bufferArray = new ArrayBuffer(length);
  const view = new DataView(bufferArray);
  const channels = [];
  let i;
  let sample;
  let offset = 0;
  let pos = 0;

  // Get channel data
  for (i = 0; i < buffer.numberOfChannels; i++)
    channels.push(buffer.getChannelData(i));

  // Write WAV Header
  writeString(view, pos, 'RIFF'); pos += 4;
  view.setUint32(pos, length - 8, true); pos += 4;
  writeString(view, pos, 'WAVE'); pos += 4;
  writeString(view, pos, 'fmt '); pos += 4;
  view.setUint32(pos, 16, true); pos += 4; // Subchunk1Size (16 for PCM)
  view.setUint16(pos, 1, true); pos += 2; // AudioFormat (1 for PCM)
  view.setUint16(pos, numOfChan, true); pos += 2; // NumChannels
  view.setUint32(pos, buffer.sampleRate, true); pos += 4; // SampleRate
  view.setUint32(pos, buffer.sampleRate * 2 * numOfChan, true); pos += 4; // ByteRate
  view.setUint16(pos, numOfChan * 2, true); pos += 2; // BlockAlign
  view.setUint16(pos, 16, true); pos += 2; // BitsPerSample
  writeString(view, pos, 'data'); pos += 4;
  view.setUint32(pos, length - pos - 4, true); pos += 4;

  // Interleave and write data (Processing for Mono)
  // If source was stereo, we mix down or just take left. 
  // Since we use OfflineAudioContext with 1 channel, input is already mixed down.
  const data = buffer.getChannelData(0); 
  
  while (pos < length) {
    // Clamp sample between -1 and 1
    sample = Math.max(-1, Math.min(1, data[offset])); 
    // Scale to 16-bit integer
    sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF; 
    view.setInt16(pos, sample, true); 
    pos += 2;
    offset++;
  }

  return new Blob([bufferArray], { type: 'audio/wav' });
}

export async function compressAudio(file: File): Promise<string> {
  // 1. Create Audio Context
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // 2. Read file
  const arrayBuffer = await file.arrayBuffer();
  
  // 3. Decode Audio
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  // 4. Offline Context for Resampling (Downsample to 16kHz Mono)
  const targetSampleRate = 16000;
  const offlineCtx = new OfflineAudioContext(1, audioBuffer.duration * targetSampleRate, targetSampleRate);
  
  // 5. Create Buffer Source
  const source = offlineCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineCtx.destination);
  source.start();
  
  // 6. Render
  const renderedBuffer = await offlineCtx.startRendering();
  
  // 7. Convert to WAV Blob
  const wavBlob = bufferToWav(renderedBuffer);
  
  // 8. Convert to Base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data URL prefix (e.g. "data:audio/wav;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(wavBlob);
  });
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
