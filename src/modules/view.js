export class View {
  constructor() {
    this.app = document.getElementById('app');

    this.title = this.createElement('h1', 'title');
    this.title.textContent = 'Github Search Repositories';

    this.searchLine = this.createElement('div', 'search-line');
    this.searchInput = this.createElement('input', 'search-input');
    this.searchLine.append(this.searchInput);

    this.reposWrapper = this.createElement('div', 'repos-wrapper');
    this.reposList = this.createElement('ul', 'repos');
    this.reposWrapper.append(this.reposList);

    this.selectedList = this.createElement('ul', 'selected-list');

    this.main = this.createElement('div', 'main');
    this.main.append(this.reposWrapper);
    this.main.append(this.selectedList);

    this.app.append(this.title);
    this.app.append(this.searchLine);
    this.app.append(this.main);
  }
  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) element.classList.add(elementClass);
    return element;
  }

  createRepo(repoData) {
    const repoElement = this.createElement('li', 'repo');
    const selectedElement = this.createElement('li', 'selected-repo');
    repoElement.innerHTML = `${repoData.name}`;
    selectedElement.innerHTML = `<span class="repo-name">Name: ${repoData.name}</span><span class="repo-owner"> Owner: ${repoData.owner.login}</span><span class="repos-stars"> Stars: ${repoData.stargazers_count}</span><div id="close-btn"></div>`;
    this.reposList.append(repoElement);
    repoElement.addEventListener('click', (e) => {
      this.selectedList.insertAdjacentElement('afterBegin', selectedElement);
      this.closeBtn = document.getElementById('close-btn');
      this.closeBtn.addEventListener('click', (e) => {
        selectedElement.remove();
      });
      this.clearRepos();
    });
  }

  clearRepos() {
    this.searchInput.value = '';
    this.reposList.innerHTML = '';
  }
}
