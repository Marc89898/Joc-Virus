/* eslint-disable require-jsdoc, valid-jsdoc,max-len */
export default class Player {
  ID;
  nom;
  ma = [null, null, null];
  taula = [null, null, null, null];
  guanyat = false;

  constructor(ID, nom) {
    this.ID = ID;
    this.nom = nom;
  }
  /**
   * --------------------- METODES DE BARALLA I CARTES -----------------------
   **/
  agafarCarta(deck) {
    const carta = deck.pop();
    const nullIndex = this.ma.findIndex((element) => element === null);
    if (nullIndex !== -1) {
      this.ma[nullIndex] = carta;
    }
    return carta;
  }
  ficarOrganModel(i, deck, i2) {
    const carta = this.ma.splice(i, 1, null);
    this.taula[i2-1] = carta[0];
    const carta1 = deck.pop();
    const nullIndex = this.ma.findIndex((element) => element === null);
    if (nullIndex !== -1) {
      this.ma[nullIndex] = carta1;
    }
  }
  /**
   * ------------------ METODES DE JUGADES ---------------------------------
   **/
  repartirCartaVirus() {

  }
  eliminarCartaModel(posicio, deck) {
    const carta = this.ma.splice(posicio, 1, null);
    deck.unshift(carta[0]);
  }
}
