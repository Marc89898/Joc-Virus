import Vista from './Classes/vista.js';
import Controlador from './Classes/controlador.js';
import Game from './Classes/subclasses/game.js';
/* eslint-disable require-jsdoc */

const vista = new Vista();
const game = new Game();
new Controlador(game, vista);
