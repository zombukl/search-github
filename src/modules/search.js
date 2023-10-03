export class Search {
  constructor(view, api) {
    this.view = view;
    this.api = api;

    this.view.searchInput.addEventListener(
      'keyup',
      this.debounce(this.searchRepos.bind(this), 500)
    );
  }

  searchRepos() {
    const searchValue = this.view.searchInput.value;
    if (searchValue) {
      this.clearRepos();
      this.reposRequest(searchValue);
    } else {
      this.clearRepos();
    }
  }

  async reposRequest(searchValue) {
    try {
      await this.api.searchRepos(searchValue).then((res) => {
        res.json().then((res) => {
          res.items.forEach((repo) => this.view.createRepo(repo));
        });
      });
    } catch (e) {
      console.error('ERROR: ' + e);
    }
  }

  clearRepos() {
    this.view.reposList.innerHTML = '';
  }
  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
