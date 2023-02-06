import { db } from "./src/database/db"
import App from "./src/App";

(async () => {
    const dialogue_id = db[0].id.split("-")[1]
    document.body.insertAdjacentHTML('afterbegin', await App(db))
    // $(`.menu button`).style.background = "#22de8c"
})();
