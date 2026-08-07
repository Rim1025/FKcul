const inspirationBuffs = [
    {
        name: "濁心スカジ",
        id: "skadi_the_corrupting_heart",
        buffId: "skadi_buff",
        "atk": 418,
        "tags": [
            "ranged",
            "supporter",
        ],
        skill: {
            name: "S3 「満ち潮、枯れ潮」",
            "multiplier": 110
        },
        talents: [
            {
                id: "tal1",
                name: "攻撃力上昇",
                effects: [
                    {
                        type: "atk_add",
                        value: 6
                    }
                ]
            }
        ],
        potential: [
            {
                id: 1,
                note: "強化なし",
                effects: []
            },
            {
                id: 4,
                note: "攻撃力上昇",
                effects: [
                    {
                        "type": "atk_flat",
                        "value": 27
                    }
                ]
            },
            {
                id: 5,
                note: "素質強化",
                effects: [
                    {
                        type: "tal_add",
                        target: "tal1",
                        value: 3
                    }
                ]
            }
        ],
        modules: {
            X: {
                1: {
                    effects: [
                        {
                            "type": "atk_flat",
                            "value": 26
                        }
                    ]
                },
                2: {
                    effects: [
                        {
                            "type": "atk_flat",
                            "value": 32
                        }
                    ]
                },
                3: {
                    effects: [
                        {
                            "type": "atk_flat",
                            "value": 35
                        }
                    ]
                }
            }
        }
    },
    {
        name: "ハイディ",
        id: "heidi",
        buffId: "heidi_buff",
        "atk": 360,
        "tags": [
            "ranged",
            "supporter",
        ],
        skill: {
            name: "S1 架空の物語・怒れるもの",
            "multiplier": 110
        },
        talents: [],
        potential: [
            {
                id: 1,
                note: "強化なし",
                effects: []
            },
            {
                id: 5,
                note: "素質強化",
                effects: []
            }
        ],
        modules: {
            X: {
                1: {
                    effects: [
                        {
                            "type": "atk_flat",
                            "value": 13
                        }
                    ]
                },
                2: {
                    effects: [
                        {
                            "type": "atk_flat",
                            "value": 17
                        }
                    ]
                },
                3: {
                    effects: [
                        {
                            "type": "atk_flat",
                            "value": 21
                        }
                    ]
                }
            }
        }
    },
];

export default inspirationBuffs;
