export default function createWords() {
  const taskName = 'Create appropriate word from ';
  const taskNote = 'Note: образовать подходящее слово';
  const words = fetch('./../../../src/components/tasks/createWords/createWords.json')
    .then(res => res.json());
  return [taskNote, taskName, words];
}
