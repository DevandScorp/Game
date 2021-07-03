const _ = require('lodash');

export default function findRedundant() {
  const taskName = 'Определите ряд,в котором не все слова относятся к тематике: ';
  const taskNote = '';
  const variants = fetch('./../../../src/components/tasks/findRedundant/redundant.json')
    .then(res => res.json());

  const templateSource = `
                            <div class="form-group">
                                <select class="form-control" id="getRedundant">
                                    <% for(let i = 0;i<words.groups.length;++i) {%>
                                        <option><%=words.groups[i]%></option>
                                    <% } %>
                                </select>
                            </div>
                        `;
  const template = _.template(templateSource);
  return [taskNote, taskName, variants, template];
}
