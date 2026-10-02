document.addEventListener("DOMContentLoaded", () => {    // HTMLの読み込みが完了してから、この中のJavaScriptを実行する

    gsap.registerPlugin(ScrollTrigger);    // GSAPでScrollTriggerプラグインを使用できるように登録

    /* ==========================================
    HERO VIDEO FALLBACK
    背景動画が再生できない場合の代替画像
    ========================================== */

    const heroVideo = document.querySelector(".bg-video");
    // HEROの背景動画を取得

    const heroFallbackImage = document.querySelector(".hero-fallback-image");
    // 動画が再生できない場合に表示する代替画像を取得


    function showHeroFallback() {
        // 背景動画が再生できない場合に
        // 代替画像を表示する関数

        gsap.set(heroFallbackImage, {
            opacity: 1,
            visibility: "visible"
        });

        gsap.set(heroVideo, {
            opacity: 0,
            visibility: "hidden"
        });
    }


    if (heroVideo && heroFallbackImage) {
        // 動画と代替画像の両方が存在する場合のみ実行

        heroVideo.addEventListener("error", () => {
            // 動画ファイルの読み込みに失敗した場合

            showHeroFallback();
        });


        heroVideo.addEventListener("stalled", () => {
            // 動画データの読み込みが停止した場合

            if (heroVideo.readyState < 3) {
                showHeroFallback();
            }
        });


        /* ==========================================
        HERO VIDEO LOOP
        背景動画を繰り返し再生
        ========================================== */

        heroVideo.loop = true;
        // 動画の最後まで再生したら最初から繰り返す

        heroVideo.muted = true;
        // スマートフォンでの自動再生対策

        heroVideo.playsInline = true;
        // スマートフォンで全画面表示に切り替えない

        heroVideo.play().catch(() => {
            // ブラウザや再生環境の制限などにより
            // 再生が失敗した場合

            showHeroFallback();
        });
    
    }

    /* ==========================================
    LENIS
    ========================================== */

    const lenis = new Lenis({        // Lenisのスムーズスクロール設定
        duration: 0.8,        // スクロール後の動きが目的位置へ収束するまでの時間
        // 数値を小さくすると反応が速く、大きくするとゆったりする
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),        // スクロールの動きを滑らかにするイージング関数
        smoothWheel: true,        // マウスホイール・トラックパッドのスクロールを滑らかにする
        smoothTouch: false        // タッチデバイスではLenisのスムーズスクロールを使用しない
    });

    function raf(time) {        // requestAnimationFrameから毎フレーム呼び出される関数
        lenis.raf(time);        // Lenisのアニメーション処理を実行
        requestAnimationFrame(raf);        // 次の画面更新タイミングでもraf関数を実行する
    }

    requestAnimationFrame(raf);    // 最初のアニメーションフレームを開始

    lenis.on("scroll", ScrollTrigger.update);    // Lenisによってスクロール位置が変化するたびに
    // ScrollTriggerの位置計算も更新する
    gsap.ticker.lagSmoothing(0);    // ブラウザの一時的な処理遅延があっても
    // GSAPの時間補正を行わないようにする
    // スクロールアニメーションのズレを防ぐ目的


/* ==================== HEADER NAVIGATION TEXT ==================== */
/*
   ヘッダーナビゲーションの
   日本語 → 英語切り替えアニメーション。

   通常時：
   日本語を表示。

   マウスホバー時：
   日本語が1文字ずつ上へ移動し、
   下から英語表記が1文字ずつ現れます。

   フッターと同じ考え方ですが、
   ヘッダーはPC用ナビゲーションのみを対象にします。
*/


/* ==================================================
   日本語 → 英語 対応表
   ================================================== */

const headerEnglishTextMap = {

    "会社情報": "COMPANY",

    "安全への取り組み": "SAFETY",

    "採用情報": "RECRUIT",

    "お問合せ": "CONTACT"

};


/* ==================================================
   ヘッダーナビゲーションを取得
   ================================================== */

document.querySelectorAll(".header__nav a").forEach((link) => {

    /*
       ナビゲーション内の文字表示領域を取得。
    */
    const textElement = link.querySelector(".header-nav-text");

    if (!textElement) {
        // 対象となる文字要素がない場合は処理しない
        return;
    }


    /*
       元の日本語文字列を取得。
    */
    const japaneseText = textElement.textContent.trim();


    /*
       日本語に対応する英語を取得。
    */
    const englishText =
        headerEnglishTextMap[japaneseText] || japaneseText;


    /*
       元の文字を一度削除。
    */
    textElement.textContent = "";


    /* ==================================================
       日本語側を作成
       ================================================== */

    const japaneseElement = document.createElement("span");

    japaneseElement.className = "header-nav-japanese";


    /*
       日本語を1文字ずつ分解。
    */
    [...japaneseText].forEach((char, index) => {

        const charElement = document.createElement("span");

        charElement.className = "header-nav-jp-char";

        charElement.textContent = char;


        /*
           フッターと同じ日本語側の時間差。

           0.018秒ずつ遅れて動きます。
        */
        charElement.style.transitionDelay =
            `${index * 0.018}s`;


        japaneseElement.appendChild(charElement);

    });


    /* ==================================================
       英語側を作成
       ================================================== */

    const englishElement = document.createElement("span");

    englishElement.className = "header-nav-english";


    /*
       英語も1文字ずつ分解。

       ただし固定幅のスロットにはせず、
       英字本来の横幅を使用します。
    */
    [...englishText].forEach((char, index) => {

        const englishChar = document.createElement("span");

        englishChar.className = "header-nav-en-char";

        englishChar.textContent = char;


        /*
           フッターと同じく、
           英語は日本語より少し速くします。

           日本語：0.018秒
           英語：0.011秒
        */
        englishChar.style.transitionDelay =
            `${index * 0.011}s`;


        englishElement.appendChild(englishChar);

    });


    /* ==================================================
       日本語・英語を表示領域へ追加
       ================================================== */

    textElement.appendChild(japaneseElement);

    textElement.appendChild(englishElement);


    /* ==================================================
       日本語・英語の幅を自動調整
       ================================================== */

    /*
       COMPANYなど英語のほうが長い場合でも、
       途中で切れないようにします。
    */
    requestAnimationFrame(() => {

        const japaneseWidth =
            japaneseElement.offsetWidth;

        const englishWidth =
            englishElement.offsetWidth;


        /*
           日本語と英語のうち、
           長いほうの幅を使用します。
        */
        textElement.style.width =
            `${Math.max(japaneseWidth, englishWidth)}px`;

    });

});



        /* ==========================================
    HEADER
    ========================================== */

    const header = document.querySelector(".header");    // class="header" のHTML要素を取得

    let lastDirection = 0;    // 前回のスクロール方向を保存する変数
    // 1 ＝ 下方向
    // -1 ＝ 上方向


    ScrollTrigger.create({        // ヘッダーの表示・非表示をスクロールに連動させる
        start: 0,        // ページ最上部から監視開始
        end: "max",        // ページの一番下まで監視
        onUpdate: (self) => {            // スクロール位置が更新されるたびに実行
            if (self.scroll() < 80) {                // ページ上部80px以内の場合
                gsap.to(header, {                    // ヘッダーを表示位置へ移動
                    y: 0,                    // Y方向の移動量を0にする
                    duration: .25,                    // 0.25秒でアニメーション
                    overwrite: true                    // すでに実行中の同じアニメーションを上書き
                });
                return;                // ここで処理を終了
            }

            if (self.direction !== lastDirection) {                // 前回とスクロール方向が変わった場合のみ実行
                if (self.direction === 1) {                    // 下方向へスクロールしている場合
                    gsap.to(header, {                        // ヘッダーを上方向へ隠す
                        y: "-100%",                        // ヘッダー自身の高さ分だけ上へ移動
                        duration: .55,                        // 0.55秒かけて移動
                        ease: "power3.out",                        // 動き始めを速く、終了時を滑らかにする
                        overwrite: true                        // 実行中のアニメーションを上書き
                    });
                }

                if (self.direction === -1) {                    // 上方向へスクロールしている場合
                    gsap.to(header, {                        // ヘッダーを元の位置へ戻す
                        y: 0,                        // 上方向への移動を0に戻す
                        duration: .55,                        // 0.55秒かけて表示
                        ease: "power3.out",                        // 滑らかに表示
                        overwrite: true                        // 実行中のアニメーションを上書き
                    });
                }

                lastDirection = self.direction;                // 今回のスクロール方向を保存
            }
        }
    });


    /* ==========================================
    MOBILE HAMBURGER MENU
    スマートフォン用メニューの開閉を制御
    ========================================== */

    const hamburgerButton = document.querySelector(".hamburger-button");    // スマートフォン用ハンバーガーボタンを取得
    const mobileMenu = document.querySelector(".mobile-menu");    // スマートフォン用メニュー本体を取得
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");    // メニュー内の各リンクを取得

    if (hamburgerButton && mobileMenu) {
        // ハンバーガーボタンとメニューが存在する場合のみ実行

hamburgerButton.addEventListener("click", () => {
    const isOpen = hamburgerButton.classList.toggle("is-open");

    mobileMenu.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    if (isOpen) {
        /* ==========================================
        メニューを開いた時
        各ボタンを0.13秒間隔で順番に表示
        ========================================== */

        lenis.stop();
        // メニュー表示中は背景ページのスクロールを停止

        mobileMenuLinks.forEach((link, index) => {
            // メニュー内のリンクを1つずつ処理

            gsap.fromTo(
                link,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    delay: index * 0.16,
                    ease: "power2.out",
                    overwrite: true
                }
            );
        });

    } else {
        /* ==========================================
        メニューを閉じた時
        ========================================== */

        lenis.start();
        // Lenisのスクロールを再開
    }
});


        mobileMenuLinks.forEach((link) => {
            // メニュー内の各リンクを1つずつ処理

            link.addEventListener("click", () => {
                // メニュー項目をクリックしたときに実行

                hamburgerButton.classList.remove("is-open");            // ハンバーガーボタンを通常状態へ戻す
                mobileMenu.classList.remove("is-open");                // メニューを閉じる
                hamburgerButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenu.setAttribute(
                    "aria-hidden",
                    "true"
                );

                document.body.classList.remove(
                    "menu-open"
                );
                // 背景ページのスクロール制限を解除
                lenis.start();                // Lenisのスクロールを再開
            });
        });
    }


    /* ==========================================
    HERO
    ========================================== */

    const heroTL = gsap.timeline();    // HERO表示用のGSAPタイムラインを作成
    // 複数のアニメーションを順番に実行するために使用
    heroTL
        .fromTo(
            ".hero-title",            // HEROタイトルをアニメーション対象にする
            {
                opacity: 0,                // 開始時は完全に透明
                filter: "blur(70px)",                // 開始時は70pxぼかす
                letterSpacing: ".25em"                // 開始時は文字間隔を広くする
            },
            {
                opacity: 1,                // 最終的に完全表示
                filter: "blur(0px)",                // ぼかしをなくす
                letterSpacing: ".1em",                // CSSで設定している通常の文字間隔へ戻す
                duration: 2,                // 2秒かけてアニメーション
                ease: "power3.out"                // 最後に滑らかに止まる動き
            }
        )

        .fromTo(
            ".hero-lead-item",            // HERO説明文3行をアニメーション対象にする
            {
                opacity: 0,                // 開始時は透明
                y: 40                // 開始位置を40px下にする
            },
            {
                opacity: 1,                // 最終的に表示
                y: 0,                // 元の位置へ移動
                duration: 1,                // 1秒かけて表示
                stagger: .2,                // 3つの文章を0.2秒ずつ時間差で表示
                ease: "power3.out"                // 滑らかに表示
            },

            "-=1"            // HEROタイトルのアニメーション終了1秒前から開始
            // タイトルと説明文の表示を少し重ねる
        );

    /* ==========================================
    HERO SCROLL
    ========================================== */

    gsap.to(".video-wrap", {        // 背景動画全体をスクロールに合わせて変化させる
        y: -300,        // スクロールに合わせて背景動画全体を少しだけ上方向へ移動
        opacity: 0,        // スクロールに合わせて動画を透明にする
        filter: "blur(30px)",        // スクロールに合わせて動画を30pxまでぼかす
        ease: "none",        // スクロール量と完全に比例した動きにする
        scrollTrigger: {            // ScrollTrigger設定
            trigger: ".section-hero",            // HEROセクションを基準にする
            start: "top top",            // HERO上端が画面上端に来た時から開始
            end: "bottom top",            // HERO下端が画面上端に来た時に終了
            scrub: true            // スクロール量とアニメーションをリアルタイム同期
        }
    });

    gsap.to(".hero-content", {        // HEROタイトルと説明文をスクロール時に上へ移動
        y: -180,        // 最終的に180px上へ移動
        opacity: 0,        // スクロールに合わせて透明にする
        ease: "none",        // スクロールと比例した一定の動き
        scrollTrigger: {            // ScrollTrigger設定
            trigger: ".section-hero",            // HEROセクションを基準にする
            start: "top top",            // HERO開始位置から動作
            end: "bottom top",            // HERO終了位置まで動作
            scrub: true            // スクロールと同期
        }
    });
    /* ==========================================
    BUSINESS
    ========================================== */

    const businessSection = document.querySelector(".section-business");    // BUSINESSセクション全体を取得
    const businessSticky = document.querySelector(".business-sticky");    // スクロール中に固定されるBUSINESS画面を取得
    const businessTitle = document.querySelector(".business-title-trigger");    // 「事業内容」タイトル部分を取得
    const businessContainer = document.querySelector(".business-container");    // 左画像と右テキストをまとめたコンテナを取得
    const images = gsap.utils.toArray(".biz-img-panel");    // BUSINESS 01〜04の画像を配列として取得
    const texts = gsap.utils.toArray(".biz-text-content");    // BUSINESS 01〜04のテキストを配列として取得
    const totalItems = images.length;    // BUSINESSの項目数を取得

    /* ==========================================
    BUSINESS 初期状態
    ========================================== */

    gsap.set(images, {        // すべてのBUSINESS画像を初期状態に設定
        opacity: 0,        // 完全に透明
        visibility: "hidden",        // 表示しない
        force3D: true        // GPUを利用してアニメーションを滑らかにする
    });


    gsap.set(texts, {        // すべてのBUSINESSテキストを初期状態に設定
        opacity: 0,        // 完全に透明
        visibility: "hidden",        // 非表示
        force3D: true        // GPU描画を使用
    });

    gsap.set(businessContainer, {        // BUSINESS全体コンテナの初期状態
        opacity: 0,        // 初期状態では透明
        visibility: "hidden"        // 表示しない
    });

    /* ==========================================
    BUSINESS SCROLL
    ========================================== */

    ScrollTrigger.create({        // BUSINESS全体のスクロール進行を監視
        trigger: businessSection,        // BUSINESSセクションを基準にする
        start: "top top",        // BUSINESS上端が画面上端に来た時から開始
        end: "bottom bottom",        // BUSINESS下端が画面下端に来るまで実行

        onUpdate: (self) => {            // スクロール位置が変わるたびに実行
            const p = self.progress;            // BUSINESSセクション全体の進行度

            /* 背景：黒 → 緑 */
            const greenProgress = gsap.utils.clamp(0, 1, p / 0.12);
            gsap.set(businessSticky, {
                backgroundColor: gsap.utils.interpolate("#000000", "#00a73c", greenProgress)
            });

            /* 事業内容タイトル */
            const titleProgress = gsap.utils.clamp(0, 1, p / 0.22);
            const titleY = gsap.utils.interpolate(0, -295, titleProgress);
            const titleOpacity = gsap.utils.clamp(0, 1, titleProgress * 5);

            gsap.set(businessTitle, {
                opacity: titleOpacity,
                y: titleY,
                force3D: true
            });

            /* BUSINESS開始前 */
            if (p < 0.22) {
                gsap.set(businessContainer, { opacity: 0, visibility: "hidden" });
                gsap.set(images, { opacity: 0, visibility: "hidden" });
                gsap.set(texts, { opacity: 0, visibility: "hidden" });
                return;
            }

            /* BUSINESSコンテナ表示 */
            const containerProgress = gsap.utils.clamp(0, 1, (p - 0.22) / 0.05);
            gsap.set(businessContainer, {
                visibility: "visible",
                opacity: containerProgress
            });

            /* BUSINESS進行度 */
            const businessProgress = gsap.utils.clamp(0, 1, (p - 0.22) / 0.78);
            const crossFade = 0.080;
            const firstBusinessFade = 0.080;

            /* 左画像 */
            images.forEach((image, i) => {
                const itemStart = i / totalItems;
                const itemEnd = (i + 1) / totalItems;
                const fadeWidth = i === 0 ? firstBusinessFade : crossFade;
                const moveStart = Math.max(0, itemStart - fadeWidth);
                const moveEnd = itemEnd;

                const moveProgress = gsap.utils.clamp(0, 1, (businessProgress - moveStart) / (moveEnd - moveStart));
                const imageY = gsap.utils.interpolate(45, -45, moveProgress);

                let fadeIn;
                if (i === 0) {
                    fadeIn = gsap.utils.clamp(0, 1, businessProgress / firstBusinessFade);
                } else {
                    const fadeStart = itemStart - crossFade;
                    fadeIn = gsap.utils.clamp(0, 1, (businessProgress - fadeStart) / crossFade);
                }

                let fadeOut;
                if (i === totalItems - 1) {
                    fadeOut = 1;
                } else if (i === 0) {
                    fadeOut = gsap.utils.clamp(0, 1, (itemEnd - businessProgress) / firstBusinessFade);
                } else {
                    fadeOut = gsap.utils.clamp(0, 1, (itemEnd - businessProgress) / crossFade);
                }

                const imageOpacity = Math.min(fadeIn, fadeOut);
                const isVisible = imageOpacity > 0.001;

                gsap.set(image, {
                    y: imageY,
                    opacity: imageOpacity,
                    visibility: isVisible ? "visible" : "hidden",
                    zIndex: i + 1,
                    force3D: true
                });
            });

            /* 右テキスト */
            texts.forEach((text, i) => {
                const itemStart = i / totalItems;
                const itemEnd = (i + 1) / totalItems;
                const fadeWidth = i === 0 ? firstBusinessFade : crossFade;
                const moveStart = Math.max(0, itemStart - fadeWidth);

                const textMoveProgress = gsap.utils.clamp(0, 1, (businessProgress - moveStart) / (itemEnd - moveStart));
                const textY = gsap.utils.interpolate(25, -25, textMoveProgress);

                let fadeIn;
                if (i === 0) {
                    fadeIn = gsap.utils.clamp(0, 1, businessProgress / firstBusinessFade);
                } else {
                    const fadeStart = itemStart - crossFade;
                    fadeIn = gsap.utils.clamp(0, 1, (businessProgress - fadeStart) / crossFade);
                }

                let fadeOut;
                if (i === totalItems - 1) {
                    fadeOut = 1;
                } else if (i === 0) {
                    fadeOut = gsap.utils.clamp(0, 1, (itemEnd - businessProgress) / firstBusinessFade);
                } else {
                    fadeOut = gsap.utils.clamp(0, 1, (itemEnd - businessProgress) / crossFade);
                }

                const textOpacity = Math.min(fadeIn, fadeOut);
                const isVisible = textOpacity > 0.001;

                gsap.set(text, {
                    y: textY,
                    opacity: textOpacity,
                    visibility: isVisible ? "visible" : "hidden",
                    zIndex: i + 1,
                    force3D: true
                });
            });
        },

        onLeaveBack: () => {
            gsap.set(images, { opacity: 0, visibility: "hidden" });
            gsap.set(texts, { opacity: 0, visibility: "hidden" });
            gsap.set(businessContainer, { opacity: 0, visibility: "hidden" });
        }
    });
    /* ==========================================
    GROUP COMPANY
    ========================================== */

    gsap.to(".group-bg", {
        y: -70,
        ease: "none",
        scrollTrigger: {
            trigger: ".section-group",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    ScrollTrigger.create({
        trigger: ".section-group",
        start: "top top",
        end: "+=80%",
        pin: true,
        pinSpacing: true
    });

    gsap.fromTo(
        ".group-inner",
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: .8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".section-group",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        }
    );

    const isMobileWidth = window.matchMedia("(max-width: 768px)").matches;
    const buttonDelay = isMobileWidth ? 0.7 : 0.5;
    const buttonStagger = isMobileWidth ? 0.25 : 0.13;

    gsap.fromTo(
        ".btn-item",
        { y: 50, opacity: 0 },
        {
            delay: buttonDelay,
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: buttonStagger,
            ease: "none",
            force3D: true,
            overwrite: "auto",
            scrollTrigger: {
                trigger: ".section-group",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        }
    );

    /* ==========================================
    MAP
    ========================================== */

    gsap.fromTo(
        ".map-info",
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".section-map",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        }
    );

    /* ==========================================
    MAP → FOOTER COLOR 同期変化
    ========================================== */

    gsap.fromTo(
        ".footer",
        { backgroundColor: "#00a73c" },
        {
            backgroundColor: "#000000",
            ease: "none",
            scrollTrigger: {
                trigger: ".footer",
                start: "top bottom",
                end: "top top",
                scrub: true
            }
        }
    );

    gsap.fromTo(
        ".map-right",
        { backgroundColor: "#00a73c" },
        {
            backgroundColor: "#000000",
            ease: "none",
            scrollTrigger: {
                trigger: ".footer",
                start: "top bottom",
                end: "top top",
                scrub: true
            }
        }
    );

    /* ==========================================
    FOOTER CONTENT FADEIN
    ========================================== */

    gsap.fromTo(
        ".footer-inner",
        { opacity: 0, y: 45 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".footer",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        }
    );

    /* ==========================================
    REFRESH
    ========================================== */

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

});

/* ==================== FOOTER RANDOM LIGHT ==================== */

const footerLight = document.querySelector(".footer-light");

if (footerLight) {
    let startTime = performance.now();
    let currentSettings = createRandomSettings();
    let nextSettings = createRandomSettings();
    let cycleDuration = random(14000, 24000);

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createRandomSettings() {
        return {
            width: random(18, 30),
            height: random(8, 18),
            centerX: random(-5, 5),
            centerY: random(-5, 5),
            scale: random(0.9, 1.2)
        };
    }

    function lerp(start, end, progress) {
        return start + (end - start) * progress;
    }

    function interpolateSettings(current, next, progress) {
        return {
            width: lerp(current.width, next.width, progress),
            height: lerp(current.height, next.height, progress),
            centerX: lerp(current.centerX, next.centerX, progress),
            centerY: lerp(current.centerY, next.centerY, progress),
            scale: lerp(current.scale, next.scale, progress)
        };
    }

    function animateFooterLight(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = elapsedTime / cycleDuration;

        if (progress >= 1) {
            currentSettings = nextSettings;
            nextSettings = createRandomSettings();
            cycleDuration = random(14000, 24000);
            startTime = currentTime;
        }

        const cycleProgress = Math.min((currentTime - startTime) / cycleDuration, 1);
        const settings = interpolateSettings(currentSettings, nextSettings, cycleProgress);
        const angle = cycleProgress * Math.PI * 2;

        const x = Math.sin(angle) * settings.width;
        const y = Math.sin(angle * 2) * settings.height;

        const positionX = x + settings.centerX;
        const positionY = y + settings.centerY;

        footerLight.style.transform = `
            translate(-50%, -50%)
            translate(${positionX}vw, ${positionY}vh)
            scale(${settings.scale})
        `;

        requestAnimationFrame(animateFooterLight);
    }

    requestAnimationFrame(animateFooterLight);
}

/* ==================== FOOTER LINK SLOT TEXT ==================== */
/*
   フッターリンクの日本語 → 英語切り替えアニメーション

   通常時：
   日本語を表示

   マウスホバー時：
   日本語が1文字ずつ上へ移動し、
   下から英語表記が現れます。


   --------------------------------------------------
   日本語                    英語
   --------------------------------------------------
   ホーム                    HOME
   会社情報                  COMPANY
   安全への取り組み          SAFETY
   関係会社                  GROUP COMPANY
   採用情報                  RECRUIT
   プライバシーポリシー      PRIVACY POLICY
   --------------------------------------------------


   【今回の変更ポイント】

   日本語と英語を同じ1文字スロットに入れず、

       日本語
       ↓
       英語

   を完全に別の要素として作ります。

   そのため、

       GROUP COMPANY
       PRIVACY POLICY

   のように日本語より英語の文字数が多い場合でも、
   英語の文字間隔が不自然になりません。
*/


/* ==================================================
   日本語 → 英語 対応表
   ================================================== */

const footerEnglishTextMap = {

    "ホーム": "HOME",

    "会社情報": "COMPANY",

    "安全への取り組み": "SAFETY",

    "関係会社": "GROUP COMPANY",

    "採用情報": "RECRUIT",

    "プライバシーポリシー": "PRIVACY POLICY"

};


/* ==================================================
   フッターリンクを取得
   ================================================== */

document.querySelectorAll(".footer-links a").forEach((link) => {

    /*
       HTML内の

       <span class="footer-link-text">
           ホーム
       </span>

       という文字を取得します。
    */

    const textElement = link.querySelector(".footer-link-text");

    if (!textElement) {
        // 対象となる文字要素がない場合は処理しない
        return;
    }


    /*
       元の日本語文字列を取得。
    */

    const japaneseText = textElement.textContent.trim();


    /*
       日本語に対応する英語を取得。

       対応表に登録されていない場合は、
       日本語をそのまま使用します。
    */

    const englishText =
        footerEnglishTextMap[japaneseText] || japaneseText;


    /*
       --------------------------------------------------
       元の文字を一度削除
       --------------------------------------------------
    */

    textElement.textContent = "";


    /* ==================================================
       日本語側を作成
       ================================================== */

    const japaneseElement = document.createElement("span");

    japaneseElement.className = "footer-link-japanese";


    /*
       日本語を1文字ずつ分解します。

       例：

       ホーム

       ↓

       ホ
       ー
       ム

       として個別のspanにします。
    */

    [...japaneseText].forEach((char, index) => {

        const charElement = document.createElement("span");

        charElement.className = "footer-link-jp-char";

        charElement.textContent = char;


        /*
           1文字ずつ少しずつ時間差をつけます。

           これまで使用していた

               index * 0.015

           の動きを維持します。
        */

        charElement.style.transitionDelay =
            `${index * 0.018}s`;


        japaneseElement.appendChild(charElement);

    });


/* ==================================================
   英語側を作成
   ================================================== */

const englishElement = document.createElement("span");

englishElement.className = "footer-link-english";


/*
   英語も1文字ずつspanに分けます。

   ただし、日本語のような固定幅のスロットにはせず、
   各英字自身の自然な横幅をそのまま使用します。

   そのため、

       GROUP COMPANY
       PRIVACY POLICY

   のような英語も自然な文字間隔を維持できます。
*/
[...englishText].forEach((char, index) => {

    const englishChar = document.createElement("span");

    englishChar.className = "footer-link-en-char";

    /*
       英語の文字をそのまま設定。
       スペースも保持されます。
    */
    englishChar.textContent = char;


    /*
       1文字ずつ少しずつ遅らせます。

       例：

       G → 0秒
       R → 0.015秒
       O → 0.030秒
       U → 0.045秒
       P → 0.060秒

       というように、
       左から順番に下から上へ動きます。
    */
    englishChar.style.transitionDelay =
        `${index * 0.011}s`;


    englishElement.appendChild(englishChar);

});



    /* ==================================================
       日本語・英語をリンク文字領域へ追加
       ================================================== */

    textElement.appendChild(japaneseElement);

    textElement.appendChild(englishElement);


    /* ==================================================
       日本語と英語の幅を自動調整
       ================================================== */

    /*
       日本語より英語のほうが長い場合でも、
       英語の最後まで表示できるようにします。

       例：

       関係会社
       ↓
       GROUP COMPANY

       プライバシーポリシー
       ↓
       PRIVACY POLICY

       のように英語のほうが長くても、
       .footer-link-text の幅が不足しないようにします。
    */

    requestAnimationFrame(() => {

        const japaneseWidth = japaneseElement.offsetWidth;
        const englishWidth = englishElement.offsetWidth;

        /*
           日本語・英語のうち、
           長いほうの幅を文字表示領域に設定します。
        */
        textElement.style.width =
            `${Math.max(japaneseWidth, englishWidth)}px`;

    });

});


/* ==========================================
【PC・モバイル完全分離 レスポンシブ対応版】別ページからのアクセスリンク制御
PC環境とモバイル環境のレイアウトの違いを完全に分離して個別に処理します。
PC環境はユーザーが微調整した完璧な位置（10）を確実にキープし、
モバイル環境は画面の高さ（window.innerHeight）が変わっても自動で追従して100%正確に着地させます。
========================================== */
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('go') === 'map') {
    // URLに「?go=map」が含まれている場合（例: index.html?go=map）
    
    // ブラウザ自前の瞬間移動による座標の狂いを防ぐため、読み込み直後は強制的に最上部（0）でキープさせます
    window.scrollTo(0, 0);

    // ページの全要素（巨大背景動画、画像、Googleマップなど）の読み込みが100%すべて完了した段階で動作
    window.addEventListener("load", () => {
        
        // 520vhあるBUSINESSやGROUP COMPANYの固定（Pin）処理によるレイアウトの伸縮を確定させます
        ScrollTrigger.refresh();

        // 画面幅（768px以下かどうか）を判定して、PCとモバイルで処理を完全に切り替えます
        const isMobileWidth = window.matchMedia("(max-width: 768px)").matches;
        
        // 最新のブラウザの「画面1面分の高さ（100vh）」を取得
        const vh = window.innerHeight;

        let finalScrollTarget = 0;

        if (isMobileWidth) {
            /* 
               📱 モバイル（スマートフォン）環境の処理
               スマホ時はPCのような巨大な固定Pin留め余白が発生せず、各セクションが縦に素直に並びます。
               画面の高さが変わっても、以下の「画面の高さ（vh）を基準にした計算式」により、
               常にMAPセクションがスマホ用固定ヘッダー（高さ65px分）のすぐ下にピタッと自動追従します。
            */
            // 【スマホ用の位置調整】
            // もしスマホでMAPを「もっと下」に下げたい場合は、お尻の「- 65」のマイナスを大きく（例: -100）してください。
            // もしMAPを「もっと上」に上げたい場合は、マイナスを小さく（例: -30）してください。
            finalScrollTarget = (1 + 5.2 + 1) * vh + 680;

        } else {
            /* 
               🖥️ パソコン（PC）環境の処理
               PC環境はお客様が微調整して「一番綺麗に合った」と教えてくださった
               ベース座標に、調整値「10」を足した完璧な位置をそのまま100%固定で採用します。
            */
            const pcBaseCoordinate = (1 + 5.2 + 1 + 0.8) * vh;
            finalScrollTarget = pcBaseCoordinate + 10;
        }

        // すべてのレイアウト配置がブラウザ側に落ち着くのを「0.5秒（500ms）」確実に待ちます
        setTimeout(() => {
            
            // ライブラリの順序エラーを回避するため、ブラウザの最上位命令「window.scrollTo」を直接発火
            // behavior: "smooth" で、ブラウザ標準の滑らかな自動スクロールを強制実行します。
            window.scrollTo({
                top: finalScrollTarget, // PCとスマホで個別に割り出された完璧な着地ピクセル数
                behavior: "smooth"     // スルスルと流れるように滑らかに移動させる設定
            });

        }, 500); // ➔ 0.5秒間おとなしく待ってから安全に発火させます
    });
}

; // ➔ main.js 全体を閉じる記述
