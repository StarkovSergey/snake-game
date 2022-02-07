import { gameStatus } from './game-status.js';

const form = document.querySelector('.form__form');
const input = form.querySelector('.form__input');
const tableModal = document.querySelector('.modal__table');
const modalForm = document.querySelector('.form');
const lastGamesTable = document.querySelector('.table__body--last-games');
const topPlayersTable = document.querySelector('.table--top-players');

const ls = window.localStorage;

const setValue = (key, value) => {
  ls.setItem(key, JSON.stringify(value));
};

const getValue = (key) => JSON.parse(ls.getItem(key));

if (!getValue('results')) {
  setValue('results', []);
}

const results = getValue('results');

export const showModal = (element) => {
  element.classList.add('modal--open');
};

export const closeModal = (element) => {
  element.classList.remove('modal--open');
};

const renderLastGamesTable = () => {
  lastGamesTable.innerHTML = '';

  for (let i = results.length - 1; i > (results.length - 11); i--) {
    if (i < 0) break;

    const tableCell = `
    <tr>
      <td>${results[i].name}</td>
      <td>${results[i].score}</td>
    </tr>
    `;
    lastGamesTable.innerHTML += tableCell;
  }
};

const renderTopPlayersTable = () => {
  topPlayersTable.innerHTML = '';

  const sortedResults = results.slice().sort((prev, next) => next.score - prev.score);
  sortedResults.forEach((item, index) => {
    if (index < 10) {
      const tableCell = `
        <tr>
          <td>${item.name}</td>
          <td>${item.score}</td>
        </tr>
    `;

      topPlayersTable.innerHTML += tableCell;
    }
  });
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!input.value) {
    input.value = 'Unknown';
  }
  const result = { name: input.value, score: gameStatus.score };
  results.push(result);
  setValue('results', results);
  closeModal(modalForm);
  showModal(tableModal);
  renderLastGamesTable();
  renderTopPlayersTable();
});

// const isPlayerTop = (score) => {
//   ls.getValue('topPlayers')
// }

// isPlayerBest => true/false
// show modalForSaveName
// save name and score
