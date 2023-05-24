/* eslint-disable require-jsdoc */
import {Card} from './card.js';

export class Virus extends Card {
  static nom = 'virus';
  constructor(color, nom) {
    super(color, nom);
    this.nom = nom;
  }
  enverinar(card) {
    return 'enverinada';
  }
}
