import './src/style/style.css'

/* To do
- [x] To build a Dialogue Head
- [x] To build a phase
*/

import data from "./src/database/data.js"

const $ = (value) => document.querySelector(value)
const $$ = (value) => document.querySelectorAll(value)
const exists = (origin, character) => origin.indexOf(character) > -1
const Elinput = (id, ph) => `<input id="${id}" class="ph-${ph}" autocomplete="off" type="text">`
const get_diolgue = (dialogue) => data.filter((el) => el.id === `$dialogue-${dialogue}`)[0]

const audio_url = (id) => `https://prod-files-dialogue-generator.s3.amazonaws.com/audio/audio-${id}.mp3`

const addClass = (element, clx) => element.classList.add(clx)
const removeClass = (element, clx) => element.classList.remove(clx)

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
            $playPause.style.backgroundImage = "url('src/assets/icons/pause.svg')";
            $playPause.parentNode.style.background = "#22de8c"
            $(".btn-send").disabled = true
            $(".btn-send").style.background = "#e4e4e4"
            $(".btn-send").style.color = "#4444447d"

            $audio.addEventListener("ended", () => {
                $playPause.style.backgroundImage = "url('src/assets/icons/play.svg')";
                $playPause.parentNode.style.background = "#519df5"
                $(".btn-send").disabled = false
                $(".btn-send").style.background = "#519df5"
                $(".btn-send").style.color = "#fff"
            });
        } else {
            $audio.pause()
            $playPause.style.backgroundImage = "url('src/assets/icons/play.svg')";
            $playPause.parentNode.style.background = "#519df5"
            $(".btn-send").disabled = false
            $(".btn-send").style.background = "#519df5"
            $(".btn-send").style.color = "#fff"
        }
    })

    $stop.addEventListener("click", () => {
        $audio.pause()
        $audio.currentTime = dy.audio_init
        $playPause.style.backgroundImage = "url('src/assets/icons/play.svg')";
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
        $playPause.style.backgroundImage = "url('src/assets/icons/play.svg')";
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
        let count = 0
        $$(".container input").forEach((el, idx) => {
            ""
            let text = el.parentNode.innerHTML
            const clx = "#phase-" + (el.className.split("-")[1]);

            el.value.length < 1 ? el.value = "empty" : true

            let inputCount = (text.match(/<input/g) || []).length;
            if (inputCount < 2) {
                $(clx).innerHTML = text.replace(Elinput(idx, el.className.split("-")[1]), `<span class= "word-${idx}"> ${el.value}</span> `)

                const word = $(`.word-${idx}`)
                word.style.fontWeight = "700"

                if (trust_array[idx] === el.value) {
                    word.style.color = "#2ee141"
                } else {
                    word.style.color = "#ff2020"
                }
            } else {
                if (count === 0) {
                    temp = text.replace(Elinput(idx, el.className.split("-")[1]), `<span class= "word-${idx}"> ${el.value}</span>`)
                    count++
                } else {
                    const clx = "#phase-" + (el.className.split("-")[1]);
                    $(clx).innerHTML =
                        temp.replace(Elinput(idx, el.className.split("-")[1]), () => `<span class= "word-${idx}"> ${el.value}</span>`)
                    count = 0
                    temp = ""

                    for (let i = idx; i < (idx + inputCount); i++) {
                        const word = $(`.word-${i - 1}`)
                        word.style.fontWeight = "700"


                        if (trust_array[idx] === el.value) {
                            word.style.color = "#2ee141"
                        } else {
                            word.style.color = "#ff2020"
                        }
                    }
                }
            }
        })

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

function create_dialogue() {
    $("#app").innerHTML = /*html*/`
        <form class= "create_container" >
            <div>
                <label for="title">Title</label>
                <input id="title" type="text">
            </div>
            <div>
                <label for="phases">Phases</label>
                <textarea id="phases" cols="30" rows="30"></textarea>
            </div>
            <button class="btn-send">Send</button>
        </form>
            `

    $(".create_container button").addEventListener("click", (e) => {
        e.preventDefault()
        const temp = {
            "id": "$dialogue-n",
            "title": $(".create_container #title").value,
            "phases": $("#phases").value.split("\n"),
            "audio_init": "0"
        }

        data.push(temp)
        console.log(temp);
    })
}

// create_dialogue()


; (() => {
    const dialogue_id = data[0].id.split("-")[1]
    generate_dialogue(dialogue_id)
    // create_dialogue()

    $(`.menu button`).style.background = "#22de8c"
})()