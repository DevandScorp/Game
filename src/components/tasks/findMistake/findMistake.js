const _ = require('lodash');

export default function findMistake() {
  const taskName = 'Find mistake';
  const taskNote = 'Note: кликнуть на часть предложения,где была допущена ошибка';
  const sentences = fetch('./../../../src/components/tasks/findMistake/sentences.json')
    .then(res => res.json());

  const templateSource = `
                            <% for(let i = 0;i<sentence.parts.length;++i) {%>
                                <span><%=sentence.parts[i]%></span>
                            <% } %> 
                        `;
  const template = _.template(templateSource);
  return [taskNote, taskName, sentences, template];
}
