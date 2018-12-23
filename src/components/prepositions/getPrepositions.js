const _ = require('lodash');

export default function getPrepositions() {
  const taskName = 'Put the correct preposition: ';
  const taskNote = 'Note: выбрать нужный предлог/слово';
  const prepositions = fetch('./../../../src/components/prepositions/prepositions.json')
    .then(res => res.json());

  const templateSource = `
                            <div class="form-group">
                                <select class="form-control" id="getPrepositions">
                                    <% for(let i = 0;i<words.prepositions.length;++i) {%>
                                        <option><%=words.prepositions[i]%></option>
                                    <% } %>
                                </select>
                            </div>
                        `;
  const template = _.template(templateSource);
  return [taskNote, taskName, prepositions, template];
}
