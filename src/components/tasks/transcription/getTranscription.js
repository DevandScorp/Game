export default function getTranscription() {
  const taskName = 'Transcription';
  const taskNote = 'Note: записать слово по его транскрипции';
  const transcriptions = fetch('./../../../src/components/tasks/transcription/transcription.json')
    .then(res => res.json());
  return [taskNote, taskName, transcriptions];
}
