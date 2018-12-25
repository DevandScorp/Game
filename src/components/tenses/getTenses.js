const _ = require('lodash');

export default function getTenses() {
  const taskName = 'Put the correct preposition: ';
  const taskNote = 'Note: выбрать нужную форму глагола';
  const tenses = fetch('./../../../src/components/tenses/tenseTests.json')
    .then(res => res.json());

  const templateSource = `
                            <div class="form-group">
                                <select class="form-control" id="getTenses">
                                    <% for(let i = 0;i<words.verbs.length;++i) {%>
                                        <option><%=words.verbs[i]%></option>
                                    <% } %>
                                </select>
                            </div>
                        `;
  const template = _.template(templateSource);
  return [taskNote, taskName, tenses, template];
}
