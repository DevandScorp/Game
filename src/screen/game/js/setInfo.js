/* eslint-disable no-undef */
/** функция для заполнения полей условия задания и дополнительной информации */
export default function setInfo(taskName, result, taskNote) {
  document.getElementById('taskModelLabel').innerHTML = taskName;
  document.getElementById('hidden-result').value = result;
  document.getElementById('note').innerHTML = taskNote;
}
