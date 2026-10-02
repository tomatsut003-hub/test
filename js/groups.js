/* ==================================================
   GROUPS PAGE
   関係会社ページ専用JavaScript
   ================================================== */

   document.addEventListener("DOMContentLoaded", () => {
    // 関係会社ページのHTML読み込みが完了してから処理を実行する

    /* ==================== 関係会社ページ判定 ==================== */

    const groupsSection = document.querySelector(".section-groups");

    // 関係会社ページの要素が存在しない場合は処理を終了する
    if (!groupsSection) {
        return;
    }

    /* ==================== 固定背景画像 ==================== */

    const groupsBackground = document.querySelector(
        ".groups-fixed-background"
    );

    // 固定背景画像が存在する場合のみ処理する
    if (groupsBackground) {

        // 固定背景画像を常に表示するための初期設定
        gsap.set(groupsBackground, {
            autoAlpha: 1
        });
    }

    /* ==================== 関係会社ページのスクロール処理 ==================== */

    // 関係会社ページ内の各セクションを取得する
    const groupsContents = gsap.utils.toArray(".groups-section");

    // 関係会社ページ内の各セクションを順番に処理する
    groupsContents.forEach((section) => {

        // セクション内にある関係会社テーブルを取得する
        const table = section.querySelector(".groups-table");

        // 【バグ回避の変更点】
        // セクション自体を透明にするのではなく、位置（y）だけを少し下に下げておきます。
        gsap.set(section, {
            y: 30
        });

        // テーブルが存在する場合、テーブル側をあらかじめ透明＋ぼかし無しにしておきます。
        if (table) {
            gsap.set(table, {
                opacity: 0,
                backdropFilter: "blur(0px)"
            });
        }

        // ScrollTriggerで画面に入ったタイミングを監視
        ScrollTrigger.create({
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",

            onEnter: () => {

                // 1. セクションを本来の位置へ上にあげる
                gsap.to(section, {
                    y: 0,
                    duration: 1.0,
                    ease: "power2.out"
                });

                // 2. テーブルの「フェードイン」と「じわ〜っとぼかし」を同時に開始（1.2秒）
                // テーブル自体を透明から表示させることで、ブラウザがぼかしアニメーションをサボるのを防ぎます
                 if (table) {
                    gsap.to(table, {
                        opacity: 1,
                        backdropFilter: "blur(8px)",
                        duration: 1.2,
                        ease: "power1.out"
                    });
                }
            }
        });
    });

    /* ==================== 関係会社ページの背景画像移動 ==================== */

    // 背景画像が存在する場合のみスクロール処理を設定する
    if (companyBackground) {
        gsap.to(companyBackground, {
            y: "-15%",                         // スクロールに合わせて背景画像を少し上へ移動する
            ease: "none",                      // 移動速度を一定にする

            scrollTrigger: {
                trigger: companySection,      // 会社情報ページ全体を監視する
                start: "top top",              // 会社情報ページの上端から開始する
                end: "bottom bottom",          // 会社情報ページの下端まで有効にする
                scrub: true                    // スクロール量に合わせて背景を移動する
            }
        });
    }
});