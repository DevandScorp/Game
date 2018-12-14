/* eslint-disable no-undef */
const _ = require('lodash');

export default function dragAndDrop() {
  const taskName = 'Drag&Drop';
  const taskNote = 'Note: собрать из букв слово';
  const colors = fetch('./../../../src/components/dragAndDrop/colors.json')
    .then(res => res.json());

  const templateSource = `
                            <div id="sortable" class="ui-state-default">
                                <% for(let i = 0;i<letters.length;++i) {%>
                                    <div class="ui-state-default"><%=letters[i]%></div>
                                <% } %> 
                            </div>
                        `;
  const template = _.template(templateSource);
  return [taskNote, taskName, colors, template];
}
