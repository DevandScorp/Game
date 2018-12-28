/* eslint-disable no-undef */
export default function listen() {
  const synth = window.speechSynthesis;
  const taskName = 'Translate';
  const taskNote = 'Note: прослушать и записать слово';
  const dictionary = fetch('./../../../src/components/tasks/listening/dictionary.json')
    .then(res => res.json());
  return [taskNote, taskName, dictionary, synth];
}
