/* eslint-disable require-jsdoc */

import {Card} from './card.js';

export class Cura extends Card {
  static nom = 'cura';
  constructor(color, nom) {
    super(color, nom);
    this.nom = nom;
  }

  curar(card) {
    return 'curada';
  }
}
