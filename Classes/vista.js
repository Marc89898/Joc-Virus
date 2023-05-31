/* eslint-disable require-jsdoc, max-len, valid-jsdoc */
export default class Vista {
  constructor() {
    this.comprovarEliminacioCarta = false;
  }
  /**
   * ---------------------- METODES DE JOC ----------------------------------
   **/
  jugador1Guanyat() {
    Swal.fire({
      title: 'JUGADOR 1 HA GUANYAT!',
      icon: 'success',
    });
  }
  jugador2Guanyat() {
    Swal.fire({
      title: 'JUGADOR 2 HA GUANYAT!',
      icon: 'success',
    });
  }
  /**
     * ------------------- METODES DE SELECCIO SEGONS JUGADOR ------------------
     **/
  seleccioMa(torn) {
    let cartes;
    if (torn === 'jugador1') {
      cartes = document.getElementsByClassName('carta1');
    } else {
      cartes = document.getElementsByClassName('carta2');
    }
    return cartes;
  }
  seleccioTaula(torn) {
    let taula;
    if (torn === 'jugador1') {
      taula = document.getElementsByClassName('carta_taula1');
    } else {
      taula = document.getElementsByClassName('carta_taula2');
    }
    return taula;
  }
  seleccioTaulaContraria(torn) {
    let taula;
    if (torn === 'jugador1') {
      taula = document.getElementsByClassName('carta_taula2');
    } else {
      taula = document.getElementsByClassName('carta_taula1');
    }
    return taula;
  }

  /**
     * -------------------------- METODES AVANS DEL JOC -----------------------
     **/
  /**
     * Al iniciar la vista també s'introdueixen les primeres cartes
     **/
  iniciarVistaPrincipal(torn, cartesJugador1, cartesJugador2) {
    this.fondo_jugar = document.getElementById('desktop_play');
    this.fondo = document.getElementsByClassName('desktop');
    this.cartes_jugador2 = document.getElementsByClassName('carta2');
    /* Mostrar tipus de joc*/
    /* Swal.fire({
      title: 'COMENCEMOS!',
      text: 'Introduce el numero de jugadores',
      input: 'select',
      inputOptions: {
        jugadors: '2 jugadors',
        jugadorsMaquina: '2 jugadors + 1 maquina',
        jugadorMaquina: '1 jugador vs 1 maquina',
      },
      confirmButtonText: 'JUGAR',
      inputValidator: (value) => {
        if (value === 'jugadors') {
          this.fondo_jugar.style.display = 'none';
          this.fondo[0].style.display = 'block';
        } else if (value === 'jugadorsMaquina') {
          this.fondo_jugar.style.display = 'none';
          this.fondo[1].style.display = 'block';
        } else if (value === 'jugadorMaquina') {
          this.fondo_jugar.style.display = 'none';
          this.fondo[2].style.display = 'block';
        }
      },
    });*/
    this.fondo_jugar.style.display = 'none';
    this.fondo[0].style.display = 'block';
    /* Repartició de cartes en cas de 2 jugadors*/
    const cartesJugador1HTML = document.getElementsByClassName('carta1');
    const cartesJugador2HTML = document.getElementsByClassName('carta2');
    cartesJugador1.forEach((carta, i) => {
      cartesJugador1HTML[i].innerHTML = `<img id="${torn}_${i}" src="/Images/Cartes/${carta.color}-${carta.nom}.png" alt="">`;
    });
    cartesJugador2.forEach((carta, i) => {
      cartesJugador2HTML[i].innerHTML = `<img id="${torn}_${i}" src="/Images/portada_carta.png" alt="">`;
    });
  }

  /**
     * --------------------- METODES DEL CANVI DE TORN -------------------------------
     **/
  cambiarTornHTML(torn, MaJugador1, MaJugador2) {
    let cartesContaries;
    let ma;
    let nomCartesContraries;
    if (torn === 'jugador1') {
      cartesContaries = document.getElementsByClassName('carta2');
      nomCartesContraries = 'jugador2';
      ma = MaJugador2;
    } else {
      cartesContaries = document.getElementsByClassName('carta1');
      ma = MaJugador1;
      nomCartesContraries = 'jugador1';
    }
    const cartes = this.seleccioMa(torn);
    for (let i = 0; i < 3; i++) {
      cartes[i].innerHTML = `<img draggable="false" src="/Images/portada_carta.png" alt="">`;
    }
    for (let i = 0; i < 3; i++) {
      cartesContaries[i].innerHTML = `<img id="${nomCartesContraries}_${i}" draggable="true" src="/Images/Cartes/${ma[i].color}-${ma[i].nom}.png" alt="">`;
    }
  }
  treureAddEventListeners() {
    // Treiem l'addEventListener de la baralla
    const baralla = document.getElementById('div_baralla');
    const newBaralla = baralla.cloneNode(true);
    baralla.parentNode.replaceChild(newBaralla, baralla);
    // Treiem l'addEventListeners de la basura
    const basureta = document.getElementById('div_basureta');
    const newBasureta = basureta.cloneNode(true);
    basureta.parentNode.replaceChild(newBasureta, basureta);
    // Treiem l'addEventListener de ficar organ
    // Treiem l'addEventListener de ficar virus
    // Treiem l'addEventListener de curar
  }
  treureAddEventsListenerCartes(torn) {
    // Drop de la taula
    const taulaCartes = this.seleccioTaula(torn);
    for (let i = 0; i < 4; i++) {
      const oldElement = taulaCartes[i];
      const newElement = oldElement.cloneNode(true);
      oldElement.parentNode.replaceChild(newElement, oldElement);
    }
  }

  /**
   * ----------------------- CSS ----------------------------------------
   **/
  ficarCssOrgan(torn) {
    let cartes;
    if (torn === 'jugador1') {
      cartes = document.getElementsByClassName('carta_taula1');
    } else {
      cartes = document.getElementsByClassName('carta_taula2');
    }
    for (let i = 0; i < cartes.length; i++) {
      if (cartes[i].innerHTML === '' && cartes[i].style.border !== '5px solid yellow') {
        cartes[i].style.border = '3px dashed black';
      }
    }
  }
  treureCss() {
    const basureta = document.getElementById('div_basureta');
    const cartesTaula1 = document.getElementsByClassName('carta_taula1');
    const cartesTaula2= document.getElementsByClassName('carta_taula2');
    for (let i = 0; i < cartesTaula1.length; i++) {
      if (cartesTaula1[i].style.border !== '5px solid yellow') {
        cartesTaula1[i].style.border = '';
        cartesTaula2[i].style.border = '';
      }
    }
    basureta.style.border = '';
  }
  ficarCssCura(torn) {
    let cartes;
    if (torn === 'jugador1') {
      cartes = document.getElementsByClassName('carta_taula1');
    } else {
      cartes = document.getElementsByClassName('carta_taula2');
    }
    for (let i = 0; i < cartes.length; i++) {
      if (cartes[i].innerHTML !== '' && cartes[i].style.border !== '5px solid yellow') {
        cartes[i].style.border = '3px dashed black';
      }
    }
  }
  ficarCssVirus(torn) {
    let cartes;
    if (torn === 'jugador1') {
      cartes = document.getElementsByClassName('carta_taula2');
    } else {
      cartes = document.getElementsByClassName('carta_taula1');
    }
    for (let i = 0; i < cartes.length; i++) {
      if (cartes[i].innerHTML !== '' && cartes[i].style.border !== '5px solid yellow') {
        cartes[i].style.border = '3px dashed black';
      }
    }
  }
  /**
     * ------------------- METODES DE JUGADES --------------------------------
     **/
  definirDropable(torn, handler) {
    const cartes = this.seleccioMa(torn);
    const basureta = document.getElementById('div_basureta');
    // Donem la propietat de draggable a les images + dos eventListener
    for (let i = 0; i < cartes.length; i++) {
      const cartaImg = cartes[i].querySelector('img');
      cartaImg.draggable = true;
      // Fem una acció quan es comença a arrestrar la carta
      cartaImg.addEventListener('dragstart', (e)=> {
        e.dataTransfer.setData('text', e.target.id);
        basureta.style.border = '3px dashed black';
        /**
         * Passem al handler el id de la carta que estem agafant perque analitzi
         * les possibilitats, i despres en el dragend borrem el addEventListener
         **/
        const elemento = e.target;
        const id = elemento.id.split('_');
        this.treureAddEventsListenerCartes(torn);
        handler(id[1]);
      });
      // Farem una altre acció quan es deixa anar la carta a qualsevol lloc
      cartaImg.addEventListener('dragend', (e)=> {
        e.dataTransfer.setData('text', e.target.id);
        // Modifiquem el css perquè el jugador sapiga quines possibilitats te
        this.treureCss();
      });
    }
  }
  eliminarCartaHTML(torn, handler, deck) {
    /**
       * En aquest metode s'activa la possibilitat de borrar les cartes
       * es a dir draggable a les images i drop a la basura, a mes a mes es cambia
       * l'estil del borders
       **/
    // Seleccionem les cartes segons el torn del jugador
    const cartes = this.seleccioMa(torn);
    const basureta = document.getElementById('div_basureta');
    // Permetem el drop a la basura (dragover)
    basureta.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    // Fem una accio quan es deixa (dropEvent)
    basureta.addEventListener('drop', (e) => {
      let index1 = [];
      const index = e.dataTransfer.getData('text', e.target.id);
      index1 = index.split('_');
      const cartes1 = cartes[index1[1]].querySelector('img');
      if (cartes1.id === `${index}`) {
        cartes1.remove();
      }
      // Quan es fa el drop executem el metode del controlador per eliminar la carta al model
      handler(index1[1], deck);
      this.comprovarEliminacioCarta = true;
    });
  }
  demanarCartaHTML(handler1, torn, handler2) {
    const baralla = document.getElementById('div_baralla');
    baralla.addEventListener('click', () => {
      if (this.comprovarEliminacioCarta) {
        const cartesFaltants = handler1();
        /* En cas de que falti alguna carta el handler1 ja ens
         * retorna una carta i nosaltres l'inserim a la vista i el model
         */
        for (let i = 0; i < cartesFaltants.length; i++) {
          this.ficarCartaHTML(cartesFaltants[i], torn);
        }
        // Quan es demana la carta es cambia el torn del jugador
        handler2();
        this.comprovarEliminacioCarta = false;
      }
    });
  }
  ficarCartaHTML(carta, torn) {
    const cartaHTML = this.seleccioMa(torn);
    for (let i = 0; i < 3; i++) {
      if (cartaHTML[i].innerHTML === '' || cartaHTML[i].innerHTML === '<img draggable="false" src="/Images/portada_carta.png" alt="">') {
        cartaHTML[i].innerHTML = `<img id="${torn}_${i}" src="/Images/Cartes/${carta.color}-${carta.nom}.png" alt="">`;
        break;
      }
    }
  }
  ficarOrganHTML(torn, handler2, handler, deck) {
    const taulaCartes = this.seleccioTaula(torn);
    for (let i = 0; i < 4; i++) {
      taulaCartes[i].addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      taulaCartes[i].addEventListener('drop', (e) => {
        if (taulaCartes[i].innerHTML === '') {
          const data = e.dataTransfer.getData('text', e.target.id);
          const carta = document.getElementById(data);
          carta.id = 'carta_' + e.target.id;
          e.target.appendChild(carta);
          const split1 = e.target.id.split('_');
          const index = data.split('_');
          handler(index[1], deck, split1[1]);
          handler2();
          carta.draggable = false;
          // Borrem el permisos un cop em fet drop perque l'altre jugador no pugui tirar la carta
          taulaCartes[i].draggable = false;
          this.treureAddEventsListenerCartes(torn);
        }
      });
    }
  }
  ficarVirusHTML(torn, cambiarTornHandler, deck, posicioOrganEnverinar, handlerVirusModel, handlerAgafarCarta, ma, handlerTreureVirusMaModel) {
    const taulaContraria = this.seleccioTaulaContraria(torn);
    // Clonar y reemplazar el elemento
    const taulaContrariaClone = taulaContraria[posicioOrganEnverinar].cloneNode(true);
    taulaContraria[posicioOrganEnverinar].parentNode.replaceChild(taulaContrariaClone, taulaContraria[posicioOrganEnverinar]);
    taulaContraria[posicioOrganEnverinar].addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    taulaContraria[posicioOrganEnverinar].addEventListener('drop', (e) => {
      if (taulaContraria[posicioOrganEnverinar].style.border !== '5px solid yellow') {
        const data = e.dataTransfer.getData('text', e.target.id);
        const carta = document.getElementById(data);
        const split = data.split('_');
        const carta2 = handlerAgafarCarta(torn, deck);
        carta.id = 'virus_lloc_' + split[0];
        e.target.insertAdjacentElement('afterend', carta);
        carta.draggable = false;
        handlerTreureVirusMaModel(torn, split[1], carta2);
        this.comprovarVirus(torn, handlerVirusModel, deck, posicioOrganEnverinar, handlerAgafarCarta, cambiarTornHandler);
        this.treureAddEventsListenerCartes(torn);
        cambiarTornHandler();
      }
    });
  }
  comprovarVirus(torn, handlerVirusModel, deck, posicioOrganEnverinar, carta2, cambiarTorn) {
    if (torn === 'jugador1') {
      torn = 'jugador2';
    } else {
      torn = 'jugador1';
    }
    const taulaCartes = this.seleccioTaula(torn);
    for (let i = 0; i < taulaCartes.length; i++) {
      const taula = taulaCartes[posicioOrganEnverinar].querySelectorAll('img');
      const split = taula[1].id.split('_'); // Aquesta linea dona error
      if (taula.length >= 3 && split[0] === 'virus') {
        taulaCartes[i].innerHTML = '';
        // handlerVirusModel(torn, deck, i);
        cambiarTorn();
      } else if (taula.length === 2 && split[0] === 'cura') {
        taula[1].remove();
        cambiarTorn();
      }
    }
  }
  ficarCuraHTML(torn, posicioOrganCurar, handlerCambiarTorn, handlerTreureCuraMaModel, handlerRepartirCarta, deck) {
    const taula = this.seleccioTaula(torn);
    taula[posicioOrganCurar].addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    taula[posicioOrganCurar].addEventListener('drop', (e) => {
      /**
       * Hem de fer el insert en cas de que no hi hagi cap virus, en cas
       * de que hi hagi un virus nomes, elimini el virus.
       **/
      let splitID;
      let aux;
      if (torn === 'jugador1') {
        aux = 'jugador2';
      } else {
        aux = 'jugador1';
      }
      const data = e.dataTransfer.getData('text', e.target.id);
      const posicioCartaMa = data.split('_');
      const split1 = data.split('_');
      let llocCarta;
      if (torn === 'jugador1') {
        llocCarta = document.getElementsByClassName('carta_taula1');
      } else {
        llocCarta = document.getElementsByClassName('carta_taula2');
      }
      const carta = document.getElementById(data);
      carta.id = 'cura_lloc_' + aux;
      const lloc = this.seleccioTaula(torn);
      const carta1 = lloc[posicioOrganCurar].querySelectorAll('img');
      const cartaObjecte = handlerRepartirCarta(torn, deck);
      if (carta1.length === 2) {
        const split = carta1[1].id.split('_');
        if (split[0] === 'virus') {
          carta1[1].remove();
        } else if (split[0] === 'cura') {
          // Fiquem un dataset conforme esta inmunitzat
          llocCarta[posicioOrganCurar].style.border = '5px solid yellow';
          llocCarta[posicioOrganCurar].dataset.inmune = 'true';
          // Borres les cures
          carta1[1].remove();
        }
      } else {
        e.target.insertAdjacentElement('afterend', carta);
      }
      handlerTreureCuraMaModel(torn, posicioCartaMa[1], cartaObjecte);
      handlerCambiarTorn(torn);
    });
  }
}
