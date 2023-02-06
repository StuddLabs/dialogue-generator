const base_url = import.meta.env.VITE_S3_URL

const $ = (value) => document.querySelector(value)
const $$ = (value) => document.querySelectorAll(value)
const exists = (origin, character) => origin.indexOf(character) > -1
const Elinput = (id, ph) => `<input id="${id}" class="ph-${ph}" autocomplete="off" type="text">`
const get_diolgue = (dialogue) => data.filter((el) => el.id === `$dialogue-${dialogue}`)[0]
const audio_url = (id) => `${base_url}/audio/audio-${id}.mp3`
const icon_url = (id) => `url('${base_url}/icons/${id}.svg')`

const addClass = (element, clx) => element.classList.add(clx)
const removeClass = (element, clx) => element.classList.remove(clx)


export {
    $, $$, exists, Elinput, get_diolgue, audio_url, icon_url, addClass, removeClass
}