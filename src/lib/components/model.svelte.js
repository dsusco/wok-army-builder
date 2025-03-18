class Model {
  #name;
  #rank;
  #character;
  #type;
  #counts = $state({});

  constructor (name = '', rank = 0, character = false, type = '', optionLists = 0) {
    this.#name = name;
    this.#rank = rank;
    this.#character = character;
    this.#type = type;

    this.#counts.coreList = 0;
    let optionListCounts = $state(new Array(optionLists).fill(0));
    this.#counts.optionLists = optionListCounts;
  }

  get filename () {
    return this.#name && 
           this.#name
             .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
             .map(x => x.toLowerCase())
             .join('_');
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
