/* eslint-disable require-jsdoc */
import {Card} from './card.js';

export class Organ extends Card {
  static nom = 'organ';
  constructor(color, nom) {
    super(color, nom);
    this.nom = nom;
  }
}
