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
      "atk_add":
      {
        "value": 0,
      },
    },
    "talents": [],
    "potential": [],
    "modules": {},
  }
 
tags
  melee: 近距離
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
          "count": 1,
          "multiplier": 400
        },
      ],
      "atk_add":
      {
        "value": 80,
        "override": [
          {
            "value": 71.2,
            "condition": "自動指揮"
          }
        ]
      },
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
            },
            {
              "type": "tal_add",
              "target": "tal1",
              "value": 4,
              "condition": {
                "label": "配置30秒後"
              }
            }
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 86
            },
            {
              "type": "tal_add",
              "target": "tal1",
              "value": 6,
              "condition": {
                "label": "配置30秒後"
              }
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
            },
            {
              "type": "ignore_def",
              "value": 150,
              "condition": {
                "label": "HP50%以上"
              }
            }
          ]
        },
        "3": {
          "effects": [
            {
              "type": "atk_flat",
              "value": 66
            },
            {
              "type": "ignore_def",
              "value": 150,
              "condition": {
                "label": "HP50%以上"
              }
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
      "atk_add":
      {
        "value": 0,
      },
    },
    "talents": [],
    "potential": [
      {
        "id": 3,
        "effects": []
      },
      {
        "id": 4,
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

  // 実験
  {
    "name": "実験用オペ",
    "id": "operator",
    "atk": 1000,
    "tags": [
      "melee",
      "defender",
    ],
    "skill": {
      "name": "スキル3",
      "hits": [
        {
          "damage_type": "physical",
          "count": 1,
          "multiplier": 200
        },
      ],
      "atk_add":
      {
        "value": 50,
      },
    },
    "talents": [],
    "potential": [],
    "modules": {},
  },
]

export default operators;