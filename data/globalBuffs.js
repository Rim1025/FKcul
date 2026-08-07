// globalBuffs.js

export default [
    
    {
        id: "amiya_buff",
        name: "全体(前衛アーミヤ)",

        base: 14,
        
        modules: ["X"],

        modulesX2: 16,
        modulesX3: 18
    },
    {
        id: "melee_buff",
        name: "近距離(Castle)",
        targetTag: "melee",

        base: 10,
        potential2: 2,
        potential3: 2,
        potential4: 2,
        potential5: 2,
        potential6: 2,
    },
    {
        id: "guard_buff",
        name: "前衛(ペペ)",
        targetTag: "guard",

        base: 16,
        potential3: 4,
    },
    {
        id: "defender_buff",
        name: "重装(ホルン)",
        targetTag: "defender",

        base: 20,
        potential3: 3,
        potential4: 0,

        modules: ["X"],

        modulesX2: 25,
        modulesX3: 28
    },
    {
        id: "sniper_buff",
        name: "狙撃(シュバルツ)",
        targetTag: "sniper",

        base: 8,
        potential6: 2,

        modules: ["X"],

        modulesX2: 11,
        modulesX3: 13
    },
    {
        id: "caster_buff",
        name: "術師(エイヤフィヤトラ)",
        targetTag: "caster",

        base: 14,
        potential6: 2,

        modules: ["X"],

        modulesX2: 18,
        modulesX3: 22
    },
    {
        id: "bullet_buff",
        name: "弾丸系(新約エクシア)",
        targetTag: "bullet",

        base: 13,
        potential3: 4,
    },
];
