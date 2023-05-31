/* eslint-disable require-jsdoc, valid-jsdoc, max-len */
export default class Controlador {
  constructor(game, vista) {
    this.game = game;
    this.vista = vista;
    this.buto_jugar = document.getElementById('buto_jugar');
    this.buto_jugar.addEventListener('click', () => {
      const cartesJugador1 = this.reparticioDePrimeresMans(this.game.torn);
      const cartesJugador2 = this.reparticioDePrimeresMans('jugador2');
      this.vista.iniciarVistaPrincipal(this.game.torn, cartesJugador1, cartesJugador2);
      // Un cop hem repartit les primeres cartes començem amb el joc.
      this.start();
    });
  }

  /**
   * -------------------- AVANS DE JOC -------------------------
   *
   * - Quan es reparteixen les primeres cartes el segon jugador nomes es
   * modifica la vista, que les cartes son girades, pero en el model, te la
   * ma amb les cartes.
   **/
  reparticioDePrimeresMans(torn) {
    /**
     * Aqui es fa un metode per retornar un array de tres cartes per
     * el principi del joc que s'acciona quan es prem el buto de jugar
     **/
    const cartes = [];
    if (torn === 'jugador1') {
      for (let i = 0; i < 3; i++) {
        cartes[i] = this.game.jugador1.agafarCarta(this.game.baralla.deck);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        cartes[i] = this.game.jugador2.agafarCarta(this.game.baralla.deck);
      }
    }
    return cartes;
  }

  /**
   * --------------------------- FLUXE DEL JOC i METODES -----------------------
   **/
  start() {
    this.jugar();
  }

  cambiarTorn() {
    // Cambiem el torn al HTML
    this.vista.cambiarTornHTML(this.game.torn, this.game.jugador1.ma, this.game.jugador2.ma);
    // Cambiem el torn al model
    this.game.cambiarTornModel();
    // Tornem a iniciar una jugada
    this.jugar(this.game.torn);
  }

  permetreJugades(id) {
    let posicioOrganEnverinar;
    let posicioOrganCurar;
    let carta;
    let ficarOrgan;
    let taula;
    let taulaContraria;
    if (this.game.torn === 'jugador1') {
      carta = this.game.jugador1.ma[id];
      taula = this.game.jugador1.taula;
      taulaContraria = this.game.jugador2.taula;
      ficarOrgan = this.game.jugador1.ficarOrganModel.bind(this.game.jugador1);
    } else {
      carta = this.game.jugador2.ma[id];
      taula = this.game.jugador2.taula;
      taulaContraria = this.game.jugador1.taula;
      ficarOrgan = this.game.jugador2.ficarOrganModel.bind(this.game.jugador2);
    }
    console.log(carta);
    console.log(taula);
    function permetreOrgan(carta) {
      for (let x = 0; x < 4; x++) {
        if (taula[x] != null) {
          if (taula[x].color === carta.color) {
            return false;
          }
        }
      }
      return true;
    }
    function permetreVirus(carta) {
      for (let x = 0; x < 4; x++) {
        if (taulaContraria[x] != null) {
          if (taulaContraria[x].color === carta.color) {
            posicioOrganEnverinar = x;
            return true;
          }
        }
      }
      return false;
    }
    function permetreCura(carta) {
      for (let x = 0; x < 4; x++) {
        if (taula[x] != null) {
          if (taula[x].color === carta.color) {
            posicioOrganCurar = x;
            return true;
          }
        }
      }
      return false;
    }

    // Recorrem la ma per restringir possibilitats;
    if (carta.nom === 'organ') {
      const possibilitat = permetreOrgan(carta);
      if (possibilitat) {
        this.vista.ficarOrganHTML(this.game.torn, this.cambiarTorn.bind(this), ficarOrgan, this.game.baralla.deck);
        this.vista.ficarCssOrgan(this.game.torn);
      }
    }
    if (carta.nom === 'virus') {
      const possibilitat = permetreVirus(carta);
      if (possibilitat) {
        let ma;
        if (this.game.torn === 'jugador1') {
          ma = document.getElementsByClassName('carta1');
        } else {
          ma = document.getElementsByClassName('carta2');
        }
        this.vista.ficarVirusHTML(this.game.torn, this.cambiarTorn.bind(this), this.game.baralla.deck, posicioOrganEnverinar, this.treureVirusModel.bind(this), this.repartirCartaModel.bind(this), ma, this.treureVirusMaModel.bind(this));
        this.vista.ficarCssVirus(this.game.torn);
      }
    }
    if (carta.nom === 'cura') {
      const possibilitat = permetreCura(carta);
      if (possibilitat) {
        this.vista.ficarCuraHTML(this.game.torn, posicioOrganCurar, this.cambiarTorn.bind(this), this.treureCuraMaModel.bind(this), this.repartirCartaModel.bind(this), this.game.baralla.deck);
        this.vista.ficarCssCura(this.game.torn);
      }
    }
  }

  /**
   * ----------------------- JUGADES -----------------------------------
   **/
  jugar() {
    // 1.- Posibilitat d'eliminar cartes i seguidament agafar
    /**
     * Primer donarem la possibilitat d'eliminar la carta
     * a la vista, en cas de que s'hagi eliminat, la borrarem del model
     * per el contrari nomes donarem la possibilitat.
     **/

    let eliminarCartaModel;
    if (this.game.torn === 'jugador1') {
      eliminarCartaModel = this.game.jugador1.eliminarCartaModel.bind(this.game.jugador1);
    } else if (this.game.torn === 'jugador2') {
      eliminarCartaModel = this.game.jugador2.eliminarCartaModel.bind(this.game.jugador2);
    }
    // Eliminar els addEventListeners anteriors de baralla
    this.vista.treureAddEventListeners();
    /**
     * En aquest metode definirem els addEventListeners que tindra cada carta
     * segons el tipus de carta que sigui.
     **/
    this.vista.definirDropable(this.game.torn, this.permetreJugades.bind(this));
    /**
     * Executem el permetre borrar la carta, en cas de que es borri
     * ja em ficat un handler que activara el borrar del model anomenat (eliminarCartaModel)
     * !!! Recordem que en aquest metode s'activen els draggables !!!
     **/
    this.vista.eliminarCartaHTML(this.game.torn, eliminarCartaModel, this.game.baralla.deck);
    /**
     * Un cop s'ha donat la possibilitat d'eliminar la carta,
     * donarem la possibilitat d'agafar una carta o varies.
     * Amb aquest metode, el que farem sera executar un model de controlador
     * que executera demanar carta en el model i despres les pasara a la vista
     * per ficar les cartes.
     *
     * !!! Cal tenir en compte que demanar una carta te una repercusió de varis
     * metodes especificament els seguents 4 metodes: this.demanarCarta, this.vista.demanarCartaHTML,
     * ficarCartaModel, ficarCartaHTML !!!
     **/
    this.vista.demanarCartaHTML(this.demanarCartesFaltants.bind(this), this.game.torn, this.cambiarTorn.bind(this));
    this.comprovarGuanyador();
  }
  demanarCartesFaltants() {
    /**
     * Avanç de demanar la carta hem de comprovar les cartes
     * que li falten per saber quantes donar.
     **/
    let ma;
    let agafarCarta;
    const cartes = [];
    if (this.game.torn === 'jugador1') {
      ma = this.game.jugador1.ma;
      agafarCarta = this.game.jugador1.agafarCarta.bind(this.game.jugador1);
    } else {
      ma = this.game.jugador2.ma;
      agafarCarta = this.game.jugador2.agafarCarta.bind(this.game.jugador2);
    }
    // Recorrem la ma del jugador buscan les cartes que falten
    let cartesFaltants = 0;
    for (let i = 0; i < 3; i++) {
      if (ma[i] === null) {
        cartesFaltants++;
      }
    }
    for (let i = 0; i < cartesFaltants; i++) {
      // !!! Aqui es modifica la ma, s'insereix una carta on el primer null !!!
      cartes[i] = agafarCarta(this.game.baralla.deck);
    }
    return cartes;
  }
  comprovarGuanyador() {
    let contador = 0;
    for (let i = 0; i < 4; i++) {
      const carta_jugador1 = document.getElementsByClassName('carta_taula1');
      const carta = carta_jugador1[i].querySelectorAll('img');
      if (this.game.jugador1.taula[i] != null && carta.length === 1) {
        contador++;
      }
    }
    if (contador === 4) {
      this.vista.jugador1Guanyat();
    }
    let contador1 = 0;
    for (let i = 0; i < 4; i++) {
      const carta_jugador2 = document.getElementsByClassName('carta_taula2');
      const carta2 = carta_jugador2[i].querySelectorAll('img');
      if (this.game.jugador2.taula[i] != null && carta2.length === 1) {
        contador1++;
      }
    }
    if (contador1 === 4) {
      this.vista.jugador2Guanyat();
    }
  }
  treureVirusModel(torn, deck, i) {
    let taula;
    if (torn === 'jugador1') {
      taula = this.game.jugador1.taula;
    } else if (torn === 'jugador2') {
      taula = this.game.jugador2.taula;
    }
    const carta = taula.splice(i, 1, null);
    deck.unshift(carta[0]);
  }
  repartirCartaModel(torn, deck) {
    let ma;
    if (torn === 'jugador1') {
      ma = this.game.jugador1.ma;
    } else if (torn === 'jugador2') {
      ma = this.game.jugador2.ma;
    }
    const carta2 = deck.pop();
    const nullIndex = ma.findIndex((element) => element === null);
    if (nullIndex !== -1) {
      ma[nullIndex] = carta2;
    }
    return carta2;
  }
  treureVirusMaModel(torn, idCarta, carta2) {
    let ma;
    if (torn === 'jugador1') {
      ma = this.game.jugador1.ma;
    } else {
      ma = this.game.jugador2.ma;
    }
    ma.splice(idCarta, 1, null);
    const nullIndex = ma.findIndex((element) => element === null);
    if (nullIndex !== -1) {
      ma[nullIndex] = carta2;
    }
  }
  treureCuraMaModel(torn, idCarta, carta) {
    let ma;
    if (torn === 'jugador1') {
      ma = this.game.jugador1.ma;
    } else {
      ma = this.game.jugador2.ma;
    }
    ma.splice(idCarta, 1, null);
    const nullIndex = ma.findIndex((element) => element === null);
    if (nullIndex !== -1) {
      ma[nullIndex] = carta;
    }
  }
}

