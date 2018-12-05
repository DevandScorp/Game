/** Load and play music file */
export default function makeASound(path) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createBufferSource();
  fetch(path)
    .then(response => response.arrayBuffer())
    .then((buffer) => {
      audioCtx.decodeAudioData(buffer, (decodedData) => {
        source.buffer = decodedData;
        source.connect(audioCtx.destination);
      });
    })
    .then(() => source.start(0))
    .catch(error => console.log(error));
}
