/* eslint-disable no-undef */
/** функция для заполнения полей условия задания и дополнительной информации */
export default function setInfo(taskName, result, taskNote) {
  $('#taskModelLabel').html(taskName);
  $('#hidden-result').val(result);
  $('#note').html(taskNote);
}
