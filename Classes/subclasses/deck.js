import {Organ} from './organ.js';
import {Virus} from './virus.js';
import {Cura} from './cura.js';
import {Card} from './card.js';


/* eslint-disable require-jsdoc */
export default class Deck {
  deck = [];
  constructor() {
    this.crear();
    this.barrejar();
  }
  crear() {
    // Creació de baralla
    for (const color of Card.colors) {
      for (let i = 0; i < 4; i++) {
        this.deck.push(new Virus(color, Virus.nom));
        this.deck.push(new Organ(color, Organ.nom));
        this.deck.push(new Cura(color, Cura.nom));
      }
    }
  }
  barrejar() {
    this.deck.sort(() => Math.random() - 0.5);
  }
}
