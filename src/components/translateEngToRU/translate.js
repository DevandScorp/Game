/* eslint-disable no-undef */
export default function getDictionary() {
  const taskName = 'Translate: ';
  const taskNote = 'Note: несколько вариантов перевода';
  const dictionary = fetch('./../../../src/components/translateEngToRU/dictionary.json')
    .then(res => res.json());
  return [taskNote, taskName, dictionary];
}
