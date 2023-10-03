const URL = 'https://api.github.com/';
const REPO_PER_PAGE = 5;

export class Api {
  async searchRepos(value) {
    return await fetch(
      `${URL}search/repositories?q=${value}&sort=stars&per_page=${REPO_PER_PAGE}`
    );
  }
}
