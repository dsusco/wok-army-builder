import FACTIONS from '$lib/components/factions.svelte.js';
import gameSizes from '$lib/json/game_sizes.json';

class Army {
	#factionPath = $state('');

	#gameSize = $derived(gameSizes[this.#gameSizeLabel] || {});

	#gameSizeLabel = $state('');

  constructor (factionPath = '', gameSizeLabel = '') {
    this.factionPath = factionPath;
    this.gameSizeLabel = gameSizeLabel;
  }

  get factionPath () {
    return this.#factionPath;
  }

  get gameSize () {
    return this.#gameSize;
  }

  get gameSizeLabel () {
    return this.#gameSizeLabel;
  }

  set factionPath (factionPath) {
    this.#factionPath = factionPath;
  }

  set gameSizeLabel (gameSizeLabel) {
    this.#gameSizeLabel = gameSizeLabel;
  }
}

const army = new Army();

export default army;
