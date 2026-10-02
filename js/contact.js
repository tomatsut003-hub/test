/* ==================================================
   CONTACT PAGE
   お問い合わせページ専用JavaScript
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // お問い合わせページのHTML読み込みが完了してから処理を実行する

    /* ==================== お問い合わせページ判定 ==================== */

    const contactSection = document.querySelector(".section-contact");

    // お問い合わせページの要素が存在しない場合は処理を終了する
    if (!contactSection) {
        return;
    }

    /* ==================== 固定背景画像 ==================== */

    const contactBackground = document.querySelector(
        ".contact-fixed-background"
    );

    // 固定背景画像が存在する場合のみ処理する
    if (contactBackground) {

        // 固定背景画像を常に表示するための初期設定
        gsap.set(contactBackground, {
            autoAlpha: 1
        });

    }


    /* ==================== お問い合わせページのスクロール処理 ==================== */

    // お問い合わせページ内の各セクションを取得する
    const contactContents = gsap.utils.toArray(".contact-section");


    // お問い合わせページ内の各セクションを順番に処理する
    contactContents.forEach((section) => {

        // セクション内にある
        // 「ぼかし背景」を持つ要素を取得する
        const blurElements = section.querySelectorAll(
            ".contact-document"
        );

        /* ==================================================
           初期状態
           ================================================== */

        gsap.set(section, {
            y: 30
        });


        // ぼかし対象の要素が存在する場合のみ初期設定する
        if (blurElements.length > 0) {

            gsap.set(blurElements, {
                opacity: 0,
                backdropFilter: "blur(0px)"
            });
        }


        /* ==================================================
           ScrollTrigger
           ================================================== */

        ScrollTrigger.create({

            trigger: section,   // 各CONTACTセクションを監視対象にする
            start: "top 85%",   // 画面下側から少し上がった位置で開始する
            toggleActions: "play none none none",   // 一度表示したら基本的にその状態を維持する

            onEnter: () => {


                /* ==========================================
                   1. セクションを本来の位置へ移動
                   ========================================== */

                gsap.to(section, {
                    y: 0,   // 初期位置の30px下から元の位置へ戻す
                    duration: 1.0,  // 1秒かけて移動
                    ease: "power2.out"  // 最後に滑らかに停止する
                });


                /* ==========================================
                   2. お問い合わせフォームを表示
                   ========================================== */

                if (blurElements.length > 0) {

                    gsap.to(blurElements, {
                        opacity: 1,     // 透明状態から完全表示
                        backdropFilter: "blur(8px)",    // 徐々に背景をぼかす
                        duration: 1.2,  // 1.2秒かけて表示
                        ease: "power1.out"  // ゆっくり滑らかに表示
                    });
                }
            }
        });
    });


    /* ==================================================
       お問い合わせページの背景画像移動
       ================================================== */

    // 背景画像が存在する場合のみスクロール処理を設定する
    if (contactBackground !== null) {
        gsap.to(contactBackground, {
            y: "-15%",  // スクロールに合わせて背景画像を少し上へ移動する
            ease: "none",   // スクロール量に対して一定速度で移動
            scrollTrigger: {
                trigger: contactSection,    // お問い合わせページ全体を監視する
                start: "top top",   // ページ上端から開始
                end: "bottom bottom",   // ページ下端まで有効
                scrub: true // スクロール量と背景移動を同期する
            }
        });
    }

    /* ==================================================
       お問い合わせフォーム
       入力内容確認モーダル
       ================================================== */

    const contactForm = document.querySelector(".contact-form");

    // お問い合わせフォームが存在する場合のみ処理する
    if (contactForm) {

        /* ==================== 確認モーダル取得 ==================== */

        const contactModal = document.querySelector("#contact-modal");
        const modalBackButton = document.querySelector(
            "#contact-modal-back"
        );
        const modalSubmitButton = document.querySelector(
            "#contact-modal-submit"
        );

        /* ==================== 確認内容表示用要素 ==================== */

        const confirmName = document.querySelector("#confirm-name");
        const confirmKana = document.querySelector("#confirm-kana");
        const confirmTel = document.querySelector("#confirm-tel");
        const confirmEmail = document.querySelector("#confirm-email");
        const confirmMessage = document.querySelector("#confirm-message");


        /* ==================== 入力欄取得 ==================== */

        const nameInput = contactForm.querySelector(
            '[name="name"]'
        );

        const kanaInput = contactForm.querySelector(
            '[name="kana"]'
        );

        const telInput = contactForm.querySelector(
            '[name="tel"]'
        );

        const emailInput = contactForm.querySelector(
            '[name="email"]'
        );

        const messageInput = contactForm.querySelector(
            '[name="message"]'
        );


        /* ==================================================
           確認ボタンを押したとき
           ================================================== */

        contactForm.addEventListener("submit", (event) => {

            // 通常のフォーム送信を停止する
            event.preventDefault();


            /* ==================== HTML5入力チェック ==================== */

            // 必須項目やメールアドレス形式を確認する
            if (!contactForm.checkValidity()) {

                // ブラウザ標準の入力エラー表示を実行する
                contactForm.reportValidity();

                return;
            }


            /* ==================== 入力内容を確認画面へ反映 ==================== */

            // お名前を確認画面へ表示する
            if (confirmName && nameInput) {
                confirmName.textContent = nameInput.value;
            }

            // フリガナを確認画面へ表示する
            if (confirmKana && kanaInput) {
                confirmKana.textContent = kanaInput.value;
            }

            // 電話番号を確認画面へ表示する
            if (confirmTel && telInput) {
                confirmTel.textContent = telInput.value;
            }

            // メールアドレスを確認画面へ表示する
            if (confirmEmail && emailInput) {
                confirmEmail.textContent = emailInput.value;
            }

            // お問い合わせ内容を確認画面へ表示する
            if (confirmMessage && messageInput) {
                confirmMessage.textContent = messageInput.value;
            }


            /* ==================== モーダルを表示 ==================== */

            if (contactModal) {
                contactModal.classList.add("is-open");
                contactModal.setAttribute(
                    "aria-hidden",
                    "false"
                );

                // モーダル表示中はページ背面をスクロールさせない
                document.body.style.overflow = "hidden";
            }
        });

        /* ==================================================
           修正するボタン
           ================================================== */

        if (modalBackButton) {
            modalBackButton.addEventListener("click", () => {

                // モーダルを閉じて入力画面へ戻る
                if (contactModal) {
                    contactModal.classList.remove("is-open");
                    contactModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );
                }

                // ページのスクロールを元に戻す
                document.body.style.overflow = "";
            });
        }

        /* ==================================================
           Perl CGIへお問い合わせ内容を送信
           ================================================== */

        /*
           確認モーダルの「送信する」ボタンを押したときに実行します。

           現在のフォーム内容をURLSearchParamsへまとめ、
           WAKWAKサーバーのPerl CGIへPOST送信します。

           contact.html
               ↓
           入力内容を確認する
               ↓
           確認モーダル
               ↓
           送信する
               ↓
           /cgi-bin/contact.cgi
               ↓
           sendmail
               ↓
           会社指定メールアドレス
        */


        if (modalSubmitButton) {
            modalSubmitButton.addEventListener("click", async () => {

                /* ==================== 送信ボタンを一時的に無効化 ==================== */

                /*
                   送信処理中にボタンを何度もクリックされることを防ぎます。
                */

                modalSubmitButton.disabled = true;
                modalSubmitButton.textContent = "送信中";

                try {

                    /* ==================================================
                       フォームの現在の入力内容を取得
                       ================================================== */
                    /*
                       FormDataではなくURLSearchParamsを使用します。
                       これにより、
                       application/x-www-form-urlencoded
                       形式でPerl CGIへ送信できます。
                    */
                    const formData = new URLSearchParams();

                    /* ==================== 入力内容を追加 ==================== */

                    formData.append(
                        "name",
                        nameInput ? nameInput.value : ""
                    );

                    formData.append(
                        "kana",
                        kanaInput ? kanaInput.value : ""
                    );

                    formData.append(
                        "tel",
                        telInput ? telInput.value : ""
                    );

                    formData.append(
                        "email",
                        emailInput ? emailInput.value : ""
                    );

                    formData.append(
                        "message",
                        messageInput ? messageInput.value : ""
                    );


                    /* ==================================================
                       Perl CGIへ送信
                       ================================================== */

                    /*
                       WAKWAKのcgi-binに設置したcontact.cgiを呼び出します。

                       contact.htmlとcgi-binが同じサイト内にあるため、
                       /cgi-bin/contact.cgi を使用します。
                    */

                    const response = await fetch(
                        "/cgi-bin/contact.cgi",
                        {
                            method: "POST",

                            /* Perl CGIへ送信するデータ形式を指定します。 */

                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded; charset=UTF-8"
                            },

                            /*  URLSearchParamsを送信します。  */

                            body: formData.toString()
                        }
                    );


                    /* ==================================================
                       CGIから返ってきたJSONを取得
                       ================================================== */

                    const result = await response.json();



                            /* ==================================================
                            送信成功時  thanks.htmlに飛ぶ場合
                               ==================================================*/ 

                            if (result.success) {

                                // --------------------------------------------------
                                // フォームの入力内容をリセットする
                                // --------------------------------------------------
                                contactForm.reset();


                                // --------------------------------------------------
                                // 確認モーダルを閉じる
                                // --------------------------------------------------
                                if (contactModal) {
                                    contactModal.classList.remove("is-open");
                                    contactModal.setAttribute("aria-hidden", "true");
                                }


                                // --------------------------------------------------
                                // bodyのスクロールを元に戻す
                                // --------------------------------------------------
                                document.body.style.overflow = "";


                                // --------------------------------------------------
                                // メール送信が正常に完了した場合、
                                // お問い合わせ完了ページへ移動する
                                //
                                // alert()は使用せず、thanks.htmlで
                                // 「お問い合わせありがとうございました」
                                // を表示します。
                                // --------------------------------------------------
                                window.location.href = "thanks.html";

                            }

                        /* ==================================================
                        thanks.htmlに飛ばない場合 
                        ==================================================
                         CGI側でメール送信に成功した場合
                           =
                        if (result.success) {
                            
                            contactForm.reset();    //  フォームの入力内容をクリアします。 

                        // 確認モーダルを閉じます。  
                            if (contactModal) {
                                contactModal.classList.remove("is-open");
                                contactModal.setAttribute(
                                    "aria-hidden",
                                    "true"
                                );
                            }
                            
                            document.body.style.overflow = "";  //  bodyのスクロール禁止を解除します。

                            //  送信完了をユーザーへ知らせます。
                            alert(
                                "お問い合わせを送信しました。\n\n" +
                                "お問い合わせいただき、ありがとうございました。"
                            );
                        } 

                        ================================================= */


                            /* ==================================================                   
                            thanks.htmlに飛ぶ場合    
                            上記の CGI側でメール送信に成功した場合～上書き
                    
                            ==================================================
                            送信成功時
                            ================================================== 
                            if (result.success) {

                                // --------------------------------------------------
                                // フォームの入力内容をリセットする
                                // --------------------------------------------------
                                contactForm.reset();


                                // --------------------------------------------------
                                // 確認モーダルを閉じる
                                // --------------------------------------------------
                                if (contactModal) {
                                    contactModal.classList.remove("is-open");
                                    contactModal.setAttribute("aria-hidden", "true");
                                }

                                // --------------------------------------------------
                                // bodyのスクロールを元に戻す
                                // --------------------------------------------------
                                document.body.style.overflow = "";

                                // --------------------------------------------------
                                // メール送信が正常に完了した場合、
                                // お問い合わせ完了ページへ移動する
                                //
                                // alert()は使用せず、thanks.htmlで
                                // 「お問い合わせありがとうございました」
                                // を表示します。
                                // --------------------------------------------------
                                window.location.href = "thanks.html";

                            }

                    ================================================== */



                        /* ==================================================
                           CGI側でエラーが発生した場合
                           ================================================== */
                    else {
                        alert(
                            result.message ||
                            "メールを送信できませんでした。"
                        );
                    }
                } catch (error) {

                    /* ==================================================
                       通信そのものに失敗した場合
                       ================================================== */

                    console.error(
                        "お問い合わせ送信エラー:",
                        error
                    );

                    alert(
                        "お問い合わせの送信に失敗しました。\n\n" +
                        "通信環境をご確認のうえ、もう一度お試しください。"
                    );

                } finally {

                    /* ==================================================
                       送信ボタンを元の状態へ戻す
                       ================================================== */

                    modalSubmitButton.disabled = false;
                    modalSubmitButton.textContent = "送信する";
                }
            });
        }

        /* ==================================================
           モーダル背景をクリックして閉じる
           ================================================== */

        const modalOverlay = document.querySelector(
            ".contact-modal-overlay"
        );

        if (modalOverlay) {
            modalOverlay.addEventListener("click", () => {
                if (contactModal) {
                    contactModal.classList.remove("is-open");
                    contactModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );
                }
                // ページのスクロールを元に戻す
                document.body.style.overflow = "";
            });
        }
    }

    /* ==================================================
       LOAD
       ================================================== */

    window.addEventListener("load", () => {

        // ページ内の画像などの読み込み完了後に
        // ScrollTriggerの位置を再計算する
        ScrollTrigger.refresh();

    });

});