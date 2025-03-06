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

  #rankSums = $derived.by(() => {
    let rankSums = Object.fromEntries(this.MODEL_TYPES.map(key => [key, 0]))
    rankSums.optionLists = new Array(this.#gameSize['Option Lists']).fill(0);

    Object.values(this.#models).forEach((model) => {
      let ranks = model.rank;

      if (this.MODEL_TYPES.indexOf(model.type) >= 0) {
        rankSums[model.type] += ranks * model.counts.coreList;
      }

      if (this.OPTION_TYPES.indexOf(model.type) >= 0) {
        if (model.type === 'Specialist') ranks *= 3;

        for (let i = 0; i < rankSums.optionLists.length; i++) {
          rankSums.optionLists[i] += ranks * model.counts.optionLists[i];
        }
      }
    });

    return rankSums;
  });

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

  get rankSums () {
    return this.#rankSums;
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
