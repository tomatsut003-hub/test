/* ==================================================
   THANKS PAGE
   お問い合わせ完了ページ専用JavaScript
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // お問い合わせ完了ページのHTML読み込みが完了してから処理を実行する


    /* ==================== 完了ページ判定 ==================== */

    const thanksSection = document.querySelector(".section-thanks");

    // 完了ページの要素が存在しない場合は処理を終了する
    if (!thanksSection) {
        return;
    }


    /* ==================== 固定背景画像 ==================== */

    const thanksBackground = document.querySelector(
        ".thanks-fixed-background"
    );


    // 固定背景画像が存在する場合のみ処理する
    if (thanksBackground) {

        gsap.set(thanksBackground, {
            autoAlpha: 1
        });

    }


    /* ==================================================
       完了ページの背景画像移動
       ================================================== */

    /*
       contact.htmlと同じように、
       スクロールに合わせて背景画像を少し上方向へ移動します。

       完了ページでもお問い合わせページとの
       デザインの統一感を保つための処理です。
    */

    if (thanksBackground !== null) {

        gsap.to(thanksBackground, {

            y: "-15%",

            ease: "none",

            scrollTrigger: {

                trigger: thanksSection,

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

        ScrollTrigger.refresh();

    });

});