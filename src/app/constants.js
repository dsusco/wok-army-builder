angular
  .module('wokArmyBuilder')

  .constant('factions', {
    Goritsi: {
      Leader: [
        { name: 'Dancing Master',
          rank: 1,
          traits: ['Zeti']
        },
        { name: 'Hestra Nostrollo',
          rank: 2,
          traits: ['Zeti'],
          character: true
        },
        { name: 'Skorza Alpha',
          rank: 1,
          traits: ['Skorza']
        },
        { name: 'Korrad Ungarash',
          rank: 2,
          traits: ['Skorza'],
          character: true
        },
        { name: 'Ravenscar Sergeant',
          rank: 1,
          traits: ['Ravenscar']
        },
        { name: 'Lord Hob',
          rank: 2,
          traits: ['Ravenscar'],
          character: true
        }
      ],
      Infantry: [
        { name: 'War Dancer',
          rank: 1,
          traits: ['Zeti']
        },
        { name: 'Skorza Skirmisher',
          rank: 2,
          traits: ['Skorza']
        },
        { name: 'Ravenscar Mercenary',
          rank: 1,
          traits: ['Ravenscar']
        }
      ],
      Specialist: [
        { name: 'Shield Breaker',
          rank: 1
        },
        { name: 'Scourge Hound',
          rank: 1
        },
        { name: 'Blood Engine',
          rank: 2
        },
        { name: 'Gregorio don Sissora',
          rank: 2,
          character: true
        },
        { name: 'The Dragonslayer',
          rank: 2,
          character: true
        },
        { name: 'Duke Anton don Genoria',
          rank: 2,
          character: true
        }
      ]
    },
    Hadross: {
      Leader: [
        { name: 'Deepmen Kaxes',
          rank: 1,
          traits: ['Deepmen']
        },
        { name: 'Torvosh the Bannerman',
          rank: 2,
          traits: ['Deepmen'],
          character: true
        },
        { name: 'Gutter Friar',
          rank: 1,
          traits: ['Sevridan']
        },
        { name: 'Ooroth of Sysor Deep',
          rank: 2,
          traits: ['Sevridan'],
          character: true
        },
        { name: 'Frenzy Charger',
          rank: 1,
          traits: ['Carcharian']
        },
        { name: 'Gar, the Gladiator',
          rank: 2,
          traits: ['Carcharian'],
          character: true
        }
      ],
      Infantry: [
        { name: 'Deepmen Guardian',
          rank: 1,
          traits: ['Deepmen']
        },
        { name: 'Sevridan Gutter',
          rank: 2,
          traits: ['Sevridan']
        },
        { name: 'Carcharian Frenzy',
          rank: 2,
          traits: ['Carcharian']
        }
      ],
      Specialist: [
        { name: 'Deep Caller',
          rank: 1
        },
        { name: 'Calith Reaver',
          rank: 1
        },
        { name: 'Oresund Cavalier',
          rank: 2
        },
        { name: 'The Oracle of Ulloth',
          rank: 2,
          character: true
        },
        { name: 'Ephramaki, the Deepcaller Lord',
          rank: 2,
          character: true
        },
        { name: 'Ilva, the Syren of Kaldeth Strait',
          rank: 2,
          character: true
        }
      ]
    },
    Nasier: {
      Leader: [
        { name: 'Ashmen Hakar',
          rank: 1,
          traits: ['Ashmen']
        },
        { name: 'Alyana Heska',
          rank: 2,
          traits: ['Ashmen'],
          character: true
        },
        { name: 'Pelegarth Howl',
          rank: 1,
          traits: ['Pelegarth']
        },
        { name: 'Elsis Tagil, The Wail of War',
          rank: 2,
          traits: ['Pelegarth'],
          character: true
        },
        { name: 'The Unmasked',
          rank: 1,
          traits: ['Fel Warrior']
        },
        { name: 'Arkan Thesh',
          rank: 2,
          traits: ['Fel Warrior'],
          character: true
        }
      ],
      Infantry: [
        { name: 'Ashmen Swordsman',
          rank: 1,
          traits: ['Ashmen']
        },
        { name: 'Pelegarth Bloodmask',
          rank: 1,
          traits: ['Pelegarth']
        },
        { name: 'Fel Hammer',
          rank: 2,
          traits: ['Fel Warrior']
        }
      ],
      Specialist: [
        { name: 'Longhorn',
          rank: 1
        },
        { name: 'Rathor',
          rank: 1
        },
        { name: 'Greathorn',
          rank: 2
        },
        { name: 'The Bloodchild',
          rank: 2,
          character: true
        },
        { name: 'Shadrus Arikim',
          rank: 2,
          character: true
        },
        { name: 'The Blind Hakar',
          rank: 2,
          character: true
        }
      ]
    },
    'Shael Han': {
      Leader: [
        { name: 'Dragon Legion Keeper',
          rank: 1,
          traits: ['Dragon Guard']
        },
        { name: 'The Winterhawk',
          rank: 2,
          traits: ['Dragon Guard'],
          character: true
        },
        { name: 'Big Sister',
          rank: 1,
          traits: ['The Children']
        },
        { name: 'The Warchild',
          rank: 2,
          traits: ['The Children'],
          character: true
        },
        { name: 'Black Lotus',
          rank: 1,
          traits: ['Lotus Warrior']
        },
        { name: 'Madam Mui',
          rank: 2,
          traits: ['Lotus Warrior'],
          character: true
        }
      ],
      Infantry: [
        { name: 'Dragon Legionnaire',
          rank: 1,
          traits: ['Dragon Guard']
        },
        { name: 'The Wrath',
          rank: 2,
          traits: ['The Children']
        },
        { name: 'Iron Lotus Warrior',
          rank: 1,
          traits: ['Lotus Warrior']
        }
      ],
      Specialist: [
        { name: 'Shield of Taelfon',
          rank: 1
        },
        { name: 'Hammer of Heaven',
          rank: 1
        },
        { name: 'Fulung Devourer',
          rank: 2
        },
        { name: 'The Deathbloom',
          rank: 2,
          character: true
        },
        { name: 'The Red Willow',
          rank: 2,
          character: true
        },
        { name: 'Hong Yao',
          rank: 2,
          character: true
        }
      ]
    },
    Teknes: {
      Leader: [
        { name: 'Union Boss',
          rank: 1,
          traits: ['Union Member']
        },
        { name: 'The Ironward',
          rank: 2,
          traits: ['Union Member'],
          character: true
        },
        { name: 'Defender Linemen Cotroller',
          rank: 1,
          traits: ['Citizen']
        },
        { name: 'Defender Raeth Sevisk',
          rank: 2,
          traits: ['Citizen'],
          character: true
        },
        { name: 'Addanii Brood Masterminds',
          rank: 1,
          traits: ['Addanii']
        },
        { name: 'Timoshkin',
          rank: 2,
          traits: ['Addanii'],
          character: true
        }
      ],
      Infantry: [
        { name: 'Union Worker',
          rank: 1,
          traits: ['Union Member']
        },
        { name: 'Defender Lineman',
          rank: 1,
          traits: ['Citizen']
        },
        { name: 'Addanii Brood Warrior',
          rank: 2,
          traits: ['Addanii']
        }
      ],
      Specialist: [
        { name: 'The Zaalak',
          rank: 1
        },
        { name: 'Galvanic Defender',
          rank: 1
        },
        { name: 'C.A.G.E.',
          rank: 2
        },
        { name: 'Sorik the Unfinished',
          rank: 2,
          character: true
        },
        { name: 'The Mighty Taur',
          rank: 2,
          character: true
        },
        { name: 'Lineman Boris',
          rank: 2,
          character: true
        }
      ]
    }
  })

  .constant('gameSizes', {
    Intro: {
      Leader: 2,
      Infantry: 12,
      Specialist: 2
    },
    Skirmish: {
      Leader: 3,
      Infantry: 18,
      Specialist: 2,
      Options: 6
    },
    Battle: {
      Leader: 5,
      Infantry: 24,
      Specialist: 4,
      Options: 12
    },
    Custom: {}
  });
