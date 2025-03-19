class Model {
  #name;
  #rank;
  #character;
  #type;
  #cardPath;
  #counts = $state({});

  constructor (name = '', rank = 0, character = false, cardPath = '', factionFilename = '', type = '', optionLists = 0) {
    this.#name = name;
    this.#rank = rank;
    this.#character = character;
    this.#type = type;

    if (cardPath) {
      this.#cardPath = cardPath;
    } else {
      this.#cardPath = this.#name
                         .match(/[\w-]+/g)
                         .map(x => x.toLowerCase())
                         .join('_');
      this.#cardPath = `images/cards/${factionFilename}/${this.#cardPath}.png`
    }

    this.#counts.coreList = 0;
    let optionListCounts = $state(new Array(optionLists).fill(0));
    this.#counts.optionLists = optionListCounts;
  }

  get cardPath () {
    return this.#cardPath;
  }

  get name () {
    return this.#name;
  }

  get rank () {
    return this.#rank;
  }

  get character () {
    return this.#character;
  }

  get type () {
    return this.#type;
  }

  get counts () {
    return this.#counts;
  }
}

export default Model;
