const _ = require('lodash');

export default function getArticles() {
  const taskName = 'Put the correct article: ';
  const taskNote = 'Note: выбрать нужный предлог/слово';
  const articles = fetch('./../../../src/components/articles/articles.json')
    .then(res => res.json());

  const templateSource = `
                            <div class="form-group">
                                <select class="form-control" id="getArticles">
                                    <% for(let i = 0;i<words.articles.length;++i) {%>
                                        <option><%=words.articles[i]%></option>
                                    <% } %>
                                </select>
                            </div>
                        `;
  const template = _.template(templateSource);
  return [taskNote, taskName, articles, template];
}
