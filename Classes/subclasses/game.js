/* eslint-disable require-jsdoc */
import Player from './player.js';
import Deck from './deck.js';

export default class Game {
  jugador1 = new Player(1, 'jugador1');
  jugador2 = new Player(2, 'jugador2');
  baralla = new Deck();
  torn = 'jugador1';
  partida = 'en curs';

  constructor() {
  }
  cambiarTornModel() {
    if (this.torn === 'jugador1') {
      this.torn = 'jugador2';
    } else {
      this.torn = 'jugador1';
    }
  }
}
