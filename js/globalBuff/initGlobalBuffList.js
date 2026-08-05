import globalBuffs from "../../data/globalBuffs.js";
import { syncHornOperatorCard } from "./updateGlobalBuff.js";


export function initGlobalBuffList() {

    const area =
        document.getElementById(
            "global-buff-list"
        );

    area.innerHTML = "";


    globalBuffs.forEach(buff => {

        const item =
            document.createElement("div");

        item.className = "global-buff-item";
        item.dataset.buffId = buff.id;


        // 潜在
        const potentialHTML = `
            <select class="global-buff-potential">
                <option value="1">潜在1</option>
                <option value="2">潜在2</option>
                <option value="3">潜在3</option>
                <option value="4">潜在4</option>
                <option value="5">潜在5</option>
                <option value="6" selected>潜在6</option>
            </select>
        `;


        // モジュール
        let moduleHTML = "";

        if (
            buff.modules &&
            buff.modules.length > 0
        ) {

            const defaultModule =
                buff.modules[
                    buff.modules.length - 1
                ];

            moduleHTML = `
                <select class="global-buff-module">

                    <option value="none">
                        モジュールなし
                    </option>

                    ${buff.modules.map(module => `
                        <option
                            value="${module}"
                            ${module === defaultModule
                                ? "selected"
                                : ""
                            }
                        >
                            ${module}
                        </option>
                    `).join("")}

                </select>


                <select class="global-buff-module-level">

                    <option value="1">
                        Lv1
                    </option>

                    <option value="2">
                        Lv2
                    </option>

                    <option
                        value="3"
                        selected
                    >
                        Lv3
                    </option>

                </select>
            `;
        }


        // 本体
        item.innerHTML = `
            <label>
                <input
                    type="checkbox"
                    class="global-buff-check"
                    value="${buff.id}"
                >

                ${buff.name}
            </label>

            ${potentialHTML}

            ${moduleHTML}
        `;


        area.appendChild(item);


        // 各要素取得
        const potentialSelect =
            item.querySelector(
                ".global-buff-potential"
            );

        const moduleSelect =
            item.querySelector(
                ".global-buff-module"
            );

        const moduleLevelSelect =
            item.querySelector(
                ".global-buff-module-level"
            );


        // ホルンカードへ同期
        function syncOperatorCard() {

            // 今はホルン重装バフだけ特殊処理
            if (
                buff.id !== "defender_buff"
            ) {
                return;
            }

            syncHornOperatorCard(
                Number(
                    potentialSelect.value
                ),

                moduleSelect
                    ? moduleSelect.value
                    : "none",

                moduleLevelSelect
                    ? Number(
                        moduleLevelSelect.value
                    )
                    : 0
            );
        }


        // 潜在変更
        potentialSelect.addEventListener(
            "change",
            () => {

                syncOperatorCard();

            }
        );


        // モジュールありの場合
        if (
            moduleSelect &&
            moduleLevelSelect
        ) {

            moduleSelect.addEventListener(
                "change",
                () => {

                    // モジュールなしならLv非表示
                    if (
                        moduleSelect.value ===
                        "none"
                    ) {

                        moduleLevelSelect
                            .style
                            .display = "none";

                    }
                    else {

                        moduleLevelSelect
                            .style
                            .display = "";

                    }


                    syncOperatorCard();

                }
            );


            // Lv変更
            moduleLevelSelect.addEventListener(
                "change",
                () => {

                    syncOperatorCard();

                }
            );

        }

    });
}