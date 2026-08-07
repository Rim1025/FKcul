// singleBuffs.js

export default [
    {
        id: "warfarin_buff",
        name: "ワルファリン S2 不安定血漿",
        source: "warfarin",

        effects: [
            {
                type: "atk_add",
                value: 90
            }
        ]
    },
    {
        id: "aak_buff",
        name: "ア S3 劇性増強剤・ドリアン",
        source: "aak",

        effects: [
            {
                type: "atk_add",
                value: 50
            }
        ]
    },
    {
        id: "stainless_buff",
        name: "ステインレス S1 ハイパーブースト",
        source: "stainless",

        count: {
            label: "装置数",
            min: 1,
            max: 2,
            default: 2
        },

        effects: [
            {
                type: "atk_add",
                value: 48
            }
        ]
    },
    {
        id: "nasti_buff",
        name: "ナスティ S3 止まり木",
        source: "nasti",
        targetTag: "ranged",

        count: {
            label: "アップグレード",
            min: 1,
            max: 3,
            default: 3
        },
        effects: [
            {
                type: "atk_add",
                value: 20
            }
        ]
    },
    {
        id: "windflit_buff",
        name: "ウインドフリット S2 この身を源とす",
        source: "windflit",
        targetTag: [
            "caster",
            "supporter"
        ],

        count: {
            label: "支援装置数",
            min: 1,
            max: 2,
            default: 2
        },

        special: "windflit",
        effects: [
            {
                type: "atk_add",
                value: 30
            }
        ]
    },
];
