/* eslint-disable no-param-reassign */
export default function moveHealth(npcElem, value) {
  npcElem.style.width = `${value}%`;
  npcElem.innerHTML = `${value * 1}%`;
}
