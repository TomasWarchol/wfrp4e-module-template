/**
 * WFRP4e – __MODULE_TITLE__
 * Główny punkt startowy modułu Foundry VTT
 */

import { MODULE_ID, log } from "./constants.mjs";
import { getEdition } from "./edition.mjs";

/* -------------------------------------------- */
/*  Inicjalizacja Modułu (Init)                 */
/* -------------------------------------------- */

Hooks.once("init", () => {
  log.info("init");

  // Publiczne API dla makr i innych modułów
  game.modules.get(MODULE_ID).api = {};
});

/* -------------------------------------------- */
/*  Gotowość (Ready)                            */
/* -------------------------------------------- */

Hooks.once("ready", () => {
  log.info(`ready – edycja zasad: ${getEdition()}`);
});
