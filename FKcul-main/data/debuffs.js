const debuffs = [
    {
        id: "shamare_s2",
        name: "シャマレ S2 呪いの人形",
        effects: [
            {
                type: "def_reduction",
                value: 50
            }
        ]
    },
    {
        id: "pramanix_s2",
        name: "プラマニクス S2 カランドの威圧",
        effects: [
            {
                type: "def_reduction",
                value: 60
            },
            {
                type: "res_reduction",
                value: 30
            }
        ]
    },
    {
        id: "suzuran_s3",
        name: "スズラン S3 渺然たる狐火",
        special: "suzuran",
        effects: [
            {
                type: "fragile",
                value: 40
            }
        ]
    },
    {
        id: "saria_s3",
        name: "サリア S3 硬質化",
        effects: [
            {
                type: "arts_damage_increase",
                value: 55
            }
        ]
    }
];

export default debuffs;
