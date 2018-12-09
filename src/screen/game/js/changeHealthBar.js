/* eslint-disable no-param-reassign */
export default function moveHealth(npcElem, value) {
  npcElem.style.width = `${value / 2}%`;
  npcElem.innerHTML = `${value * 1}%`;
}
