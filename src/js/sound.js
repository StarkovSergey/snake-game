import { gameStatus } from './game-status.js';

export const soundButton = document.querySelector('.sound-button');

export const renderSoundButton = () => {
  soundButton.classList.toggle('sound-button--off', !gameStatus.sound);
};
