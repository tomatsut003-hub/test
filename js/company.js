/* ==================================================
   COMPANY PAGE
   会社情報ページ専用JavaScript
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 会社情報ページのHTML読み込みが完了してから処理を実行する

    /* ==================== 会社情報ページ判定 ==================== */

    const companySection = document.querySelector(".section-company");

    // 会社情報ページの要素が存在しない場合は処理を終了する
    if (!companySection) {
        return;
    }

    /* ==================== 固定背景画像 ==================== */

    const companyBackground = document.querySelector(
        ".company-fixed-background"
    );

    // 固定背景画像が存在する場合のみ処理する
    if (companyBackground) {

        // 背景画像を常に表示するための初期設定
        gsap.set(companyBackground, {
            autoAlpha: 1
        });
    }

    /* ==================== 会社情報ページのスクロール処理 ==================== */

    // 会社情報ページ内の各セクションを取得する
    const companyContents = gsap.utils.toArray(".company-section");

    // 会社情報ページ内の各セクションを順番に処理する
    companyContents.forEach((section) => {
 
        // セクションの中にある会社概要テーブルを検索する
        const table = section.querySelector(".company-table");

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
            trigger: section,                      // 各セクションを監視対象にする
            start: "top 85%",                      // 経営理念と同じ表示開始位置
            toggleActions: "play none none none",

            onEnter: () => {
    
                // 1. セクションを本来の位置へ上にあげる（1.0秒）
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

    /* ==================== 会社情報ページの背景画像移動 ==================== */

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