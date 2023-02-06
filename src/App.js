import { dialoguePage } from "./page/Dialogue";


async function App(db) {
    return /*html*/ ` 
        ${await dialoguePage(db)}
    `
}

export default App;