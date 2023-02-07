import { Elinput, icon_url } from "../../utils/snippets";
import "./_style.scss";


const domEL = (el) => document.createElement(el)

async function dialoguePage(db) {
    const dy = db[1]
    let count = 0
    let phases = ""
    let trust_array = []
    let trust_array_temp = []
    let exp = /\[(\w+)\s(\w+)\]|\$(\w+)|\[(\w+)\]|\[(.+)\]/g


    // Create explorer Input and Btns HTML
    let explorer_search = /*html */ `
        <div>
            <input type="text" placeholder="find here...">
            <!-- <img src="../../assets/img/search.svg"> -->
        </div>
    `
    let explorer_btns = ""
    db.forEach(el => {
        const dialogue = el.id.slice(1)
        explorer_btns += `<button id="explorer_btn-${el.id.split("-")[1]}">${dialogue[0].toUpperCase() + dialogue.slice(1)}</button>`
    })

    // Create Btns HTMl
    let audio_btns = ""
    const audio_box = ["loop", "play", "stop"]
    audio_box.forEach(el => {
        audio_btns += /*html*/ `
            <div class="btn_container">
                <button class="btn_${el}"></button>
            </div>
        `
    })

    // Create Phases
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


    return /*html*/ `
        <div id="dialoguePage">
            <nav>   
                <section class="sc-search">
                    ${explorer_search}
                </section>
                <section class="sc-mbtn">
                    ${explorer_btns}
                </section>
            </nav>
            <div class="wrapper">
                <header>
                    <section class="sc-audio">
                        ${audio_btns}
                    </section>
                    <section class="sc-process">
                        <button class="send-dialogue">Send</button>
                    </section>
                </header>
                <main>
                    <h2>${dy.title}</h2>
                    <section class="sc-tip"></section>
                    <section class="sc-phases">
                        ${phases}
                    </section>
                </main>
            </div>
            <article>
                <section class="sc-menu">
                    <button class="menu"></button>
                </section>
                <section class="sc-action">
                    <button class="help"></button>
                </section>
            </article>
        </div>
    `
}

export { dialoguePage };

