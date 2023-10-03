import { Search } from './src/modules/search.js';
import { View } from './src/modules/view.js';
import { Api } from './src/modules/api.js';
const api = new Api();
const app = new Search(new View(), api);
