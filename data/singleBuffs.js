// singleBuffs.js

export default [
    {
        id: "warfarin_buff",
        name: "ワルファリン S2（攻撃力+90%）",
        source: "warfarin",

        effects: [
            {
                type: "atk_add",
                value: 90
            }
        ]
    },
    {
        id: "skalter_inspiration",
        name: "濁心スカジ S2（鼓舞）",
        source: "skalter",
        special: "skalter",
        effects: []
    }
];
