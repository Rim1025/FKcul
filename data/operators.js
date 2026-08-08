/*
  example 
  {
    "name": "オペレーター",
    "id": "operator",
    "atk": 1000,
    "tags": [],
    "skill": {
      "name": "S3 スキル3",
      "hits": [
        {
          "damage_type": "physical",
          "count": 1,
          "multiplier": 100
        },
      ],
      "atk_add": 0,
    },
    "talents": [],
    "potential": [],
    "modules": {},
  }
 
tags
  melee: 近距離
  ranged: 遠距離
  vanguard: 先鋒
  guard: 前衛
  defender: 重装
  sniper: 狙撃
  caster: 術師
  medic: 医療
  supporter: 補助
  specialist: 特殊
  bullet: 弾丸スキル
 
*/
const operators = [

  // ブレイズ
  {
    "name": "ブレイズ",
    "id": "blaze",
    "atk": 825,
    "tags": [
      "melee",
      "guard",
    ],
    "skill": {
      "name": "S3 ボイリングバースト",
      "hits": [
        {
          "damage_type": "physical",
          "multiplier": 400
        },
      ]
    },
    "talents": [
      {
        "id": "tal1",
        "name": "スパルタ訓練の成果",
        "effects": [
          {
            "type": "atk_add",
            "value": 0,
          },
        ]
      }
    ],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 28,
          },
        ]
      }
    ],
    "modules": {
      "X": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 50
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 70
            }
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 86
            }
          ]
        }
      },
      "Y": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 40
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 50
            }
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 66
            }
          ]
        }
      }
    },
  },
  // ホルン
  {
    "name": "ホルン",
    "id": "horn",
    "atk": 1006,
    "tags": [
      "melee",
      "defender",
      "bullet"
    ],
    "skill": {
      "name": "S2 テンペストオーダー",
      "hitCount": {
        "min": 1,
        "max": 5,
        "default": 5
      },
      "hits": [
        {
          "damage_type": "physical",
          "multiplier": 240
        },
        {
          "damage_type": "arts",
          "multiplier": 60
        },
      ],
      "atk_add": 0,
    },
    "talents": [],
    "potential": [
      {
        "id": 3,
        "note": "素質強化",
        "effects": []
      },
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 30,
          },
        ]
      }
    ],
    "modules": {
      "X": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 65
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 85
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 100
            },
          ]
        }

      },
      "Y": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 92
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 108
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 120
            },
          ]
        }
      }
    },
  },
  // ウルピアヌス
  {
    "name": "ウルピアヌス",
    "id": "ulpianus",
    "atk": 1649,
    "tags": [
      "melee",
      "guard",
    ],
    "skill": {
      "name": "S3 拓くべき活路",
      "hits": [
        {
          "damage_type": "physical",
          "multiplier": 160
        },
      ],
      "atk_add": 260,
    },
    "talents": [
      {
        "id": "tal1",
        "name": "素質名",
        "effects": []
      }
    ],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 45,
          },
        ]
      },
      {
        "id": 5,
        "note": "素質強化",
        "effects": []
      }
    ],
    "modules": {
      "X": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 84
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 107
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 120
            },
          ]
        }
      },
    },
  },
  // チューバイ
  {
    "name": "チューバイ",
    "id": "qiubai",
    "atk": 768,
    "tags": [
      "melee",
      "guard",
    ],
    "skill": {
      "name": "S2 承影",
      "hits": [
        {
          "damage_type": "physical",
          "multiplier": 300
        },
        {
          "damage_type": "arts",
          "multiplier": 10,
          "module": {
            "name": "X",
            "minLevel": 1
          }
        },
      ],
      "atk_add": 140,
    },
    "talents": [],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 26,
          },
        ]
      },
    ],
    "modules": {
      "X": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 35
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 48
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 55
            },
          ]
        }
      },
    },
  },
  // 司霆レイズ
  {
    "name": "司霆レイズ 未実装",
    "id": "leizi_the_thunderbringer",
    "atk": 390,
    "tags": [
      "melee",
      "guard",
    ],
    "skill": {
      "name": "S1 浩気不滅",
      "hits": [
        {
          "damage_type": "physical",
          "multiplier": 355
        },
      ],
      "atk_add": 0,
    },
    "talents": [
      {
        "id": "tal1",
        "name": "素質名",
        "effects": []
      }
    ],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 29,
          },
        ]
      },
      {
        "id": 5,
        "note": "素質強化",
        "effects": []
      }
    ],
    "modules": {
      "X": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 26
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 35
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 42
            },
          ]
        }
      },
    },
  },
  // 滌火ジェシカ
  {
    "name": "滌火ジェシカ",
    "id": "jessica_the_liberated",
    "atk": 582,
    "tags": [
      "melee",
      "defender",
      "bullet"
    ],
    "skill": {
      "name": "S3 飽和射撃",
      "hits": [
        {
          "damage_type": "physical",
          "multiplier": 250
        },
      ],
      "atk_add": 310,
    },
    "talents": [],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 28,
          },
        ]
      },
      {
        "id": 5,
        "note": "素質強化",
        "effects": []
      }
    ],
    "modules": {
      "X": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 50
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 57
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 65
            },
          ]
        }
      },
    },
  },
  // ウィシャデル
  {
    "name": "ウィシャデル 未実装",
    "id": "wisadel",
    "atk": 777,
    "tags": [
      "ranged",
      "sniper",
      "bullet"
    ],
    "skill": {
      "name": "S3 デイブレイクバースト",
      "hits": [
        {
          "damage_type": "physical",
          "multiplier": 300
        },
      ],
      "atk_add": 0,
    },
    "talents": [],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 32,
          },
        ]
      },
      {
        "id": 5,
        "note": "素質強化",
        "effects": []
      }
    ],
    "modules": {
      "X": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 45
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 55
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 65
            },
          ]
        }
      },
    },
  },
  // レミュアン
  {
    "name": "レミュアン",
    "id": "lemuen",
    "atk": 1301,
    "tags": [
      "ranged",
      "sniper",
      "bullet"
    ],
    "skill": {
      "name": "S3 礼砲・強制追悼",
      "hits": [
        {
          "damage_type": "physical",
          "multiplier": 300
        },
      ],
      "atk_add": 0,
    },
    "talents": [
      {
        "id": "tal1",
        "name": "素質名",
        "effects": []
      }
    ],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 46,
          },
        ]
      },
    ],
    "modules": {
      "Y": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 80
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 100
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 120
            },
          ]
        }
      },
    },
  },
  // ファイヤーウォッチ
  {
    "name": "ファイヤーウォッチ",
    "id": "firewatch",
    "atk": 1175,
    "tags": [
      "ranged",
      "sniper",
    ],
    "skill": {
      "name": "S2 爆撃要請",
      "hitCount": {
        "min": 1,
        "max": 3,
        "default": 1
      },
      "hits": [
        {
          "damage_type": "physical",
          "multiplier": 300
        },
      ],
      "atk_add": 0,
    },
    "talents": [
      {
        "id": "tal1",
        "name": "素質名",
        "effects": []
      }
    ],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 35,
          },
        ]
      },
      {
        "id": 5,
        "note": "素質強化",
        "effects": []
      }
    ],
    "modules": {
      "Y": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 60
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 75
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 87
            },
          ]
        }
      },
    },
  },
  // マルシル
  {
    "name": "マルシル",
    "id": "marcille",
    "atk": 1024,
    "tags": [
      "ranged",
      "caster",
    ],
    "skill": {
      "name": "S3 爆破魔法",
      "hits": [
        {
          "damage_type": "arts",
          "multiplier": 390
        },
      ],
      "atk_add": 0,
    },
    "talents": [
      {
        "id": "tal1",
        "name": "学校始まって以来の才女",
        "effects": [
          {
            "type": "atk_add",
            "value": 20
          }
        ]
      }
    ],
    "potential": [
      {
        "id": 3,
        "note": "素質強化",
        "effects": [
          {
            "type": "tal_add",
            "target": "tal1",
            "value": 5
          }
        ]
      },
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 34,
          },
        ]
      },
    ],
    "modules": {
      "Y": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 51
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 68
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 82
            },
          ]
        }
      },
    },
  },
  // ネクラス
  {
    "name": "ネクラス",
    "id": "necrass",
    "atk": 678,
    "tags": [
      "ranged",
      "caster",
    ],
    "skill": {
      "name": "S3 死に授く冠",
      "hits": [
        {
          "damage_type": "arts",
          "multiplier": 800
        },
      ],
      "atk_add": 0,
    },
    "talents": [],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 27,
          },
        ]
      },
    ],
    "modules": {
      "X": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 35
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 45
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 55
            },
          ]
        }
      },
    },
  },
  // ロゴス
  {
    "name": "ロゴス",
    "id": "logos",
    "atk": 761,
    "tags": [
      "ranged",
      "caster",
    ],
    "skill": {
      "name": "S1 歿亡",
      "hits": [
        {
          "special": "logos_s1_execute",
          "multiplier": 150
        },
      ],
      "atk_add": 100,
    },
    "talents": [
      {
        "id": "tal1",
        "name": "素質名",
        "effects": []
      }
    ],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 27,
          },
        ]
      },
    ],
    "modules": {
      "Y": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 35
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 50
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 60
            },
          ]
        }
      },
      "D": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 36
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 54
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 67
            },
          ]
        }
      },
    },
  },
  // レイディアン
  {
    "name": "レイディアン 後回し",
    "id": "raidian",
    "atk": 1649,
    "tags": [
      "melee",
      "guard",
    ],
    "skill": {
      "name": "S2 サイクルストレイフ",
      "hitCount": {
        "min": 1,
        "max": 5,
        "default": 5
      },
      "hits": [
        {
          "damage_type": "physical",
          "multiplier": 160
        },
      ],
      "atk_add": 260,
    },
    "talents": [
      {
        "id": "tal1",
        "name": "素質名",
        "effects": []
      }
    ],
    "potential": [
      {
        "id": 4,
        "note": "攻撃力上昇",
        "effects": [
          {
            "type": "atk_flat",
            "value": 45,
          },
        ]
      },
      {
        "id": 5,
        "note": "素質強化",
        "effects": []
      }
    ],
    "modules": {
      "X": {
        "1": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 84
            }
          ]
        },
        "2": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 107
            },
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 120
            },
          ]
        }
      },
    },
  }
]

export default operators;
