/* ==================================================
   PRIVACY POLICY PAGE
   プライバシーポリシーページ専用JavaScript
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // プライバシーポリシーページのHTML読み込みが完了してから処理を実行する


    /* ==================== プライバシーポリシーページ判定 ==================== */

    const privacySection = document.querySelector(".section-privacy");

    // プライバシーポリシーページの要素が存在しない場合は処理を終了する
    if (!privacySection) {
        return;
    }


    /* ==================== 固定背景画像 ==================== */

    const privacyBackground = document.querySelector(
        ".privacy-fixed-background"
    );

    // 固定背景画像が存在する場合のみ初期表示を設定する
    if (privacyBackground) {
        gsap.set(privacyBackground, {
            autoAlpha: 1
        });
    }


    /* ==================================================
       プライバシーポリシー本文のスクロール表示
       ================================================== */

    const privacyContents = gsap.utils.toArray(".privacy-section");

    privacyContents.forEach((section) => {
        // 各プライバシーポリシーセクション内の文書を取得する
        const documentElement = section.querySelector(".privacy-document");

        // セクションを少し下へずらした状態から開始する
        gsap.set(section, {
            y: 30
        });

        // 文書が存在する場合は、最初は透明・ぼかしなしにする
        if (documentElement) {
            gsap.set(documentElement, {
                opacity: 0,
                backdropFilter: "blur(0px)"
            });
        }


        /* ==================== スクロール位置を監視 ==================== */

        ScrollTrigger.create({
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",

            onEnter: () => {
                // セクション全体を元の位置へ滑らかに移動する
                gsap.to(section, {
                    y: 0,
                    duration: 1.0,
                    ease: "power2.out"
                });

                // 文書部分をふわっと表示しながら背景をぼかす
                if (documentElement) {
                    gsap.to(documentElement, {
                        opacity: 1,
                        backdropFilter: "blur(8px)",
                        duration: 1.2,
                        ease: "power1.out"
                    });
                }
            }
        });
    });


    /* ==================================================
       プライバシーポリシー背景画像のパララックス
       ================================================== */

    if (privacyBackground !== null) {
        gsap.to(privacyBackground, {
            y: "-15%",
            ease: "none",
            scrollTrigger: {
                trigger: privacySection,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });
    }


    /* ==================================================
       ページ読み込み完了後にScrollTriggerを更新
       ================================================== */

    window.addEventListener("load", () => {
        // ページ内の画像などの読み込みが完了した後、
        // ScrollTriggerの位置情報を再計算する
        ScrollTrigger.refresh();
    });

});