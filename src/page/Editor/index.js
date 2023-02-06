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