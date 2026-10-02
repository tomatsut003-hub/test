/* ==================================================
   COMPANY PAGE
   安全への取り組みページ専用JavaScript
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 安全への取り組みページのHTML読み込みが完了してから処理を実行する

    /* ==================== 安全への取り組みページ判定 ==================== */

    const managementSection = document.querySelector(".section-management");

    // 安全への取り組みページの要素が存在しない場合は処理を終了する
    if (!managementSection) {
        return;
    }


    /* ==================== 固定背景画像 ==================== */

    const managementBackground = document.querySelector(
        ".management-fixed-background"
    );

    // 固定背景画像が存在する場合のみ処理する
    if (managementBackground) {
        // 固定背景画像を常に表示するための初期設定
        gsap.set(managementBackground, {
            autoAlpha: 1
        });
    }

    /* ==================== 安全への取り組みページのスクロール処理 ==================== */

    // 安全への取り組みページ内の各セクションを取得する
    const managementContents = gsap.utils.toArray(".management-section");

    // 安全への取り組みページ内の各セクションを順番に処理する
    managementContents.forEach((section) => {
        // セクション内にある「ぼかし背景」を持つ要素をすべて取得する
        const blurElements = section.querySelectorAll(
            ".management-table, .management-document, .management-introduction"
        );

        // 【バグ回避の変更点】
        // セクション自体を透明にするのではなく、位置（y）だけを少し下に下げておきます。
        gsap.set(section, { y: 30 });
        
        // ぼかし対象の要素があれば、あらかじめ透明＋ぼかし無しにしておきます。
        if (blurElements.length > 0) {
            gsap.set(blurElements, { 
                opacity: 0, 
                backdropFilter: "blur(0px)" 
            });
        }

        // ScrollTriggerで画面に入ったタイミングを監視
        ScrollTrigger.create({
            trigger: section,          // 各セクションを監視対象にする
            start: "top 85%",          // 画面下側から少し上がった位置で開始する
            toggleActions: "play none none none",
            onEnter: () => {
                // 1. セクションを本来の位置へ上にあげる（1.0秒）
                gsap.to(section, {
                    y: 0,
                    duration: 1.0,
                    ease: "power2.out"
                });

                // 2. テーブルや文書ブロックの「フェードイン」と「じわ〜っとぼかし」を同時に開始（1.2秒）
                if (blurElements.length > 0) {
                    gsap.to(blurElements, { 
                        opacity: 1,
                        backdropFilter: "blur(8px)", 
                        duration: 1.2, 
                        ease: "power1.out"
                    });
                }
            }
        });
    });


    
    /* ==================== 安全への取り組みページの背景画像移動 ==================== */

    // 背景画像が存在する場合のみスクロール処理を設定する
    if (managementBackground) {
        gsap.to(managementBackground, {
            y: "-15%",                         // スクロールに合わせて背景画像を少し上へ移動する
            ease: "none",                     // 移動速度を一定にする
            scrollTrigger: {
                trigger: managementSection,  // ページ全体を監視する
                start: "top top",             // ページの上端から開始する
                end: "bottom bottom",         // ページの下端まで有効にする
                scrub: true                   // スクロール量に合わせて背景を移動する
            }
        });
    }

});