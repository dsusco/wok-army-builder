import FACTIONS from '$lib/components/factions.svelte.js';
import Model from '$lib/components/model.svelte.js';
import gameSizes from '$lib/json/game_sizes.json';

class Army {
  MODEL_TYPES = ['Leader', 'Infantry', 'Specialist'];
  OPTION_TYPES = ['Infantry', 'Specialist'];

	#factionPath = $state('');

	#gameSize = $derived(gameSizes[this.#gameSizeLabel] || {});

	#gameSizeLabel = $state('');

  #models = $derived(
    this.MODEL_TYPES
      .reduce(
        (models, type) => {
          FACTIONS[this.#factionPath][type].forEach((model) => {
            models[model.name] =
              new Model(
                model.name,
                model.rank,
                model.character,
                type,
                this.#gameSize['Option Lists']);
          });

          return models;
        }, {}));

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

  get models () {
    return this.#models;
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
