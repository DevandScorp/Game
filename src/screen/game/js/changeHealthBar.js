/* eslint-disable no-param-reassign */
export default function moveHealth(npcElem, value) {
  npcElem.css('width', `${value}%`);
  npcElem.html(`${value}%`);
}
