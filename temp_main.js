function generate_dialogue(dialogue) {
    const dy = get_diolgue(dialogue)
    let count = 0
    let phases = ""
    let trust_array = []
    let trust_array_temp = []
    let exp = /\[(\w+)\s(\w+)\]|\$(\w+)|\[(\w+)\]|\[(.+)\]/g

    dy.phases
        .forEach((phase, idx) => {
            if (idx === 0) {
                // Name info
            } else {
                const box = phase.split(": ")
                trust_array_temp.push(phase.match(exp))

                phases += /*html*/`
                    <div>
                        <p class="actor">${box[0]}: </p>
                        <p id="phase-${idx}">${box[1].replace(exp, () => Elinput(count++, idx))}<p>
                    </div>
                `
            }
        })

    let menu_elements = ""
    const btn_exist = $(`.menu button`)
    data.forEach(el => {
        const dialogue = el.id.slice(1)
        menu_elements += `<button id="${el.id.split("-")[1]}">${dialogue[0].toUpperCase() + dialogue.slice(1)}</button>`
    })

    $("#app").innerHTML = /*html*/`
        <div class="menu">${menu_elements}</div>
        <div class="container">
            <section>
                <div class="container_audio">
                    <audio>
                        <source src="${audio_url(dialogue)}" type="audio/mp3">
                    </audio>
                    <div class="btn_container"><button class="btn-loop"></button></div>
                    <div class="btn_container"><button class="btn-play-pause"></button></div>
                    <div class="btn_container"><button class="btn-stop"></button></div>
                </div>
                <div class="container_button">
                    <button class="btn-send">Send</button>
                </div>
            </section>
            <section class="dialogue_container">
                <h2>${dy.title}</h2>
                <div class="container_tip"></div>
                <div class="phases_container">${phases}</div>
            </section>
        </div>
    `

    if (btn_exist !== null) {
        const btn = document.getElementById(`${dialogue}`)
        if (!btn.className) {
            addClass(btn, "active")
            btn.style.background = "#22de8c"
        } else {
            removeClass(btn, "active")
            btn.style.background = "#519df5"
        }
    }

    const $audio = $(".container audio")
    const $loop = $(".container .btn-loop")
    const $playPause = $(".container .btn-play-pause")
    const $stop = $(".container .btn-stop")
    const $sendBtn = $(".container .btn-send")
    $audio.currentTime = dy.audio_init

    const $containerTip = $(".container_tip")
    $containerTip.style.display = "none"

    $$(".menu button").forEach(btn => {
        btn.addEventListener("click", () => {
            $audio.currentTime = dy.audio_init
            generate_dialogue(btn.id)
        })
    })


    $loop.addEventListener("click", () => {
        if (!$audio.loop) {
            $loop.parentNode.style.background = "#22de8c"
        } else {
            $loop.parentNode.style.background = "#519df5"
        }
        $audio.loop = !$audio.loop
    })

    $playPause.addEventListener("click", () => {
        $audio.currentTime === +dy.audio_init ? $("input").focus() : true

        if ($audio.paused) {
            $audio.play()
            $playPause.style.backgroundImage = icon_url("pause");
            $playPause.parentNode.style.background = "#22de8c"
            $(".btn-send").disabled = true
            $(".btn-send").style.background = "#e4e4e4"
            $(".btn-send").style.color = "#4444447d"

            $audio.addEventListener("ended", () => {
                $playPause.style.backgroundImage = icon_url("play");
                $playPause.parentNode.style.background = "#519df5"
                $audio.currentTime = dy.audio_init
                $(".btn-send").disabled = false
                $(".btn-send").style.background = "#519df5"
                $(".btn-send").style.color = "#fff"
            });
        } else {
            $audio.pause()
            $playPause.style.backgroundImage = icon_url("play");
            $playPause.parentNode.style.background = "#519df5"
            $(".btn-send").disabled = false
            $(".btn-send").style.background = "#519df5"
            $(".btn-send").style.color = "#fff"
        }
    })

    $stop.addEventListener("click", () => {
        $audio.pause()
        $audio.currentTime = dy.audio_init
        $playPause.style.backgroundImage = icon_url("play");
        $playPause.parentNode.style.background = "#519df5"

        if ($sendBtn.disabled) {
            $sendBtn.disabled = false
            $(".btn-send").style.background = "#519df5"
            $(".btn-send").style.color = "#fff"
        }
    })

    $sendBtn.addEventListener("click", () => {
        $audio.pause()
        $audio.currentTime = 0
        $playPause.style.backgroundImage = icon_url("play");
        $playPause.parentNode.style.background = "#519df5"
        $sendBtn.style.background = "#22de8c"
        $sendBtn.innerText = "Fineshed"

        $$(".container_audio button").forEach(btn_aud => {
            btn_aud.disabled = true
            btn_aud.parentNode.style.background = "#e4e4e4"
        })

        trust_array_temp
            .filter(el => el !== null)
            .forEach(el => {
                trust_array = [...trust_array, ...el]
            })
        trust_array = trust_array.map(word => word.replace(/[\[\]$]/g, ""))

        let temp = ""
        let wordTemp = ""
        let isEmpty = false
        let count = 0
        let boxTemp = []
        let allCorrect = true

        $$(".container input").forEach((el, idx) => {
            let text = el.parentNode.innerHTML
            const clx = "#phase-" + (el.className.split("-")[1]);

            if (el.value.length < 1) {
                el.value = "empty"
                isEmpty = true
            }

            let inputCount = (text.match(/<input/g) || []).length;
            if (inputCount === 1) {
                $(clx).innerHTML = text.replace(Elinput(idx, el.className.split("-")[1]), `<span class= "word-${idx}"> ${el.value}</span>`)
                const word = $(`.word-${idx}`)
                word.style.fontWeight = "700"
                if (trust_array[idx] === el.value) {
                    word.style.color = "#2ee141"
                } else {
                    word.style.color = "#ff2020"
                    allCorrect = false
                }
            } else {
                if (count === 0) {
                    temp = text.replace(Elinput(idx, el.className.split("-")[1]), `<span class= "word-${idx}"> ${el.value}</span>`)
                    count++

                    boxTemp.push({ ta: trust_array[idx], elValue: el.value, idxEl: idx })
                } else {
                    const clx = "#phase-" + (el.className.split("-")[1]);
                    $(clx).innerHTML =
                        temp.replace(Elinput(idx, el.className.split("-")[1]), () => `<span class= "word-${idx}"> ${el.value}</span>`)
                    count = 0
                    temp = ""

                    for (let i = 0; i < 2; i++) {
                        if (i === 0) {
                            const { idxEl, ta, elValue } = boxTemp[0]
                            const word = $(`.word-${idxEl}`)
                            word.style.fontWeight = "700"
                            if (ta === elValue) {
                                word.style.color = "#2ee141"
                            } else {
                                word.style.color = "#ff2020"
                                allCorrect = false
                            }
                        } else {
                            const word = $(`.word-${idx}`)
                            word.style.fontWeight = "700"
                            if (trust_array[idx] === el.value) {
                                word.style.color = "#2ee141"
                            } else {
                                word.style.color = "#ff2020"
                                allCorrect = false
                            }
                        }
                    }
                }
            }
        })

        $containerTip.style.display = "block"
        $containerTip.style.border = "none"
        $containerTip.innerHTML = /*html */ `
            <button>Display</button>
            <span>Try one more time to unlock the hint</span>
        `

        const $tipBtn = $containerTip.querySelector("button")
        const $tipSpan = $containerTip.querySelector("span")
        if (!isEmpty) {
            $tipBtn.style.background = "#519df5"
            $tipBtn.style.color = "#fff"
            $tipSpan.innerText = "Click here to display the tips."

            $tipBtn.addEventListener("click", () => {
                $containerTip.innerHTML = ""
                $containerTip.style.border = "2px solid #c4c4c4"
                $containerTip.style.display = "flex"
                $containerTip.style.flexWrap = "wrap"
                $containerTip.style.flexBasis = "50%"
                $containerTip.style.justifyContent = "space-between"
                let tawidx = 5
                let ta_temp = ""
                trust_array
                    .sort(() => Math.random() - 0.5)
                    .forEach((ta_word, ta_idx) => {
                        $containerTip.innerHTML += `<p>${ta_word}</p>`
                        // .forEach((ta_word, ta_idx) => {
                        //     if (ta_idx < tawidx) {
                        //         ta_temp += `<p>${ta_word}</p>`
                        //     } else {
                        //         $containerTip.innerHTML += `<div>${ta_temp}</div>`
                        //         ta_temp = ""
                        //         tawidx += 5
                        //     }
                    })
            })

            allCorrect ? $tipBtn.click() : true
        }

        $sendBtn.addEventListener("click", () => {
            generate_dialogue(dialogue)
        })
    })

    let lastShortcut = new Date();
    let interval = 350

    // document.addEventListener("keydown", (e) => {
    //     function check_time(cmd) {
    //         e.preventDefault()
    //         if (new Date() - lastShortcut < interval) {
    //             return;
    //         } else {
    //             lastShortcut = new Date();
    //             const shortcuts = {
    //                 playPause: () => {

    //                 },
    //                 loop: () => $loop.click(),
    //                 stop: () => $stop.click(),
    //                 menu_nav: () => {
    //                     $stop.click()
    //                     const $btn_menu = $$(".menu button")[+e.key - 1]
    //                     $btn_menu !== undefined ? generate_dialogue($btn_menu.id) : true
    //                 },
    //             }
    //             shortcuts[cmd]()
    //         }
    //     }

    //     const box_number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    //     e.ctrlKey && e.key === "i" ? check_time("playPause") : true
    //     e.ctrlKey && e.key === "s" ? check_time("stop") : true
    //     e.ctrlKey && e.key === "l" ? check_time("loop") : true
    //     // e.altKey && box_number.includes(+e.key) ? check_time("menu_nav") : true

    // });
}