/* eslint-disable no-undef */
const _ = require('lodash');

export default function getScoreTable() {
  const scoreTableData = JSON.parse(sessionStorage.getItem('players'));
  const templateSource = `
                                <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nickname</th>
                                    <th scope="col">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <% for(let i = 0;i<Object.keys(scoreTable).length;++i) {%>
                                        <tr>
                                            <th scope="row"><%= i+1 %></th>
                                            <td><%= Object.keys(scoreTable)[i] %></td>
                                            <td><%= scoreTable[Object.keys(scoreTable)[i]] %></td>
                                        </tr>
                                    <% } %>
                                </tbody>
                                </table>
                        `;
  const template = _.template(templateSource)({ scoreTable: scoreTableData });
  return template;
}
