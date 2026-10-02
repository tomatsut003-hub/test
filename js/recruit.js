/* ==================================================
   COMPANY PAGE
   採用情報ページ専用JavaScript
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 採用情報ページのHTML読み込みが完了してから処理を実行する

    /* ==================== 採用情報ページ判定 ==================== */

    const recruitSection = document.querySelector(".section-recruit");

    // 採用情報ページの要素が存在しない場合は処理を終了する
    if (!recruitSection) {
        return;
    }

    /* ==================== 固定背景画像 ==================== */

    const recruitBackground = document.querySelector(
        ".recruit-fixed-background"
    );

    // 固定背景画像が存在する場合のみ処理する
    if (recruitBackground) {

        // 背景画像を常に表示するための初期設定
        gsap.set(recruitBackground, {
            autoAlpha: 1
        });
    }

    /* ==================== 採用情報ページのスクロール処理 ==================== */

    // 採用情報ページ内の各セクションを取得する
    const recruitContents = gsap.utils.toArray(".recruit-section");

    // 採用情報ページ内の各セクションを順番に処理する
    recruitContents.forEach((section) => {

        // セクションの中にある採用情報テーブルを検索する
        // 大型ドライバー・中型ドライバーが
        // article.recruit-job の中に入っていても取得できるようにする
        const tables = section.querySelectorAll(".recruit-table");
 
        // 【バグ回避の変更点】
        // セクション自体を透明にするのではなく、
        // 位置（y）だけを少し下に下げておきます。
        gsap.set(section, {
            y: 30
        });

        // 採用情報テーブルが存在する場合、
        // すべてのテーブルをあらかじめ透明＋ぼかし無しにしておきます。
        tables.forEach((table) => {
            gsap.set(table, {
                opacity: 0,
                backdropFilter: "blur(0px)"
            });
        });

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

        // 2. 採用情報テーブルをフェードインさせる
        //    同時に背景のぼかしをじわっと強くする
        //    大型・中型など複数のテーブルを同じ処理にする
        tables.forEach((table) => {
            gsap.to(table, {
                opacity: 1,
                backdropFilter: "blur(8px)",
                duration: 1.2,
                ease: "power1.out"
            });
        });
            }
        });
    });



/* ==================== 採用情報ページの背景画像切り替え ==================== */

if (recruitBackground) {

    // 3枚の背景画像を取得する
    const recruitBgImages = gsap.utils.toArray(".recruit-bg-image");

    // まず3枚すべてを透明にする
    gsap.set(recruitBgImages, {
        opacity: 0
    });

    // 1枚目の背景画像だけを最初から表示する
    if (recruitBgImages[0]) {
        gsap.set(recruitBgImages[0], {
            opacity: 1
        });
    }

    /* ==================== 大型ドライバーで2枚目へ ==================== */

    // 大型ドライバー・中型ドライバーのタイトルを取得する
    // HTML内の並び順で取得するため、nth-of-typeに依存しません。
    const recruitJobTitles = gsap.utils.toArray(".recruit-job-title");

    // 大型ドライバーのタイトルを取得する
    const largeDriverTitle = recruitJobTitles[0];

    // 大型ドライバーのタイトルが存在し、
    // 2枚目の背景画像が存在する場合のみ処理する
    if (largeDriverTitle && recruitBgImages[1]) {

        gsap.to(recruitBgImages[1], {
            opacity: 1,     // Company-bg2.jpgをふわっと表示する
            ease: "none",   // スクロール量に合わせて一定の速度で切り替える
            scrollTrigger: {
                trigger: largeDriverTitle,      // 大型ドライバーのタイトルを基準にする
                start: "top 70%",       // タイトルが画面下から30%付近に来たところから開始
                end: "top 55%",     // そこから少しスクロールする間に完全表示
                scrub: true     // スクロール量に合わせてアニメーションする
            }
        });
    }

    /* ==================== 中型ドライバーで3枚目へ ==================== */

    // 中型ドライバーのタイトルを取得する
    // recruitJobTitlesの2番目のタイトルを使用する
    const mediumDriverTitle = recruitJobTitles[1];

    // 中型ドライバーのタイトルが存在し、
    // 3枚目の背景画像が存在する場合のみ処理する
    if (mediumDriverTitle && recruitBgImages[2]) {

        gsap.to(recruitBgImages[2], {
            opacity: 1,     // Company-bg3.jpgをふわっと表示する
            ease: "none",   // スクロール量に合わせて一定の速度で切り替える
            scrollTrigger: {
                trigger: mediumDriverTitle,     // 中型ドライバーのタイトルを基準にする
                start: "top 70%",       // タイトルが画面下から30%付近に来たところから開始
                end: "top 55%",     // そこから少しスクロールする間に完全表示
                scrub: true     // スクロール量に合わせてアニメーションする
            }
        });
    }


    /* ==================== 背景画像全体の移動 ==================== */

    // 現在の背景画像移動をそのまま維持する
    gsap.to(recruitBackground, {
        y: "-15%",      // ページをスクロールすると背景全体を少し上へ移動する
        ease: "none",   // スクロールに合わせて一定の速度で移動する
        scrollTrigger: {
           trigger: recruitSection,        // 採用情報ページ全体を基準にする
            start: "top top",       // 採用情報ページの開始位置から
           end: "bottom bottom",       // 採用情報ページの最後まで
            scrub: true     // スクロール量に合わせて移動する
        }
    });
    }
});