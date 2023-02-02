import { useState, useRef } from "react";
import styled from "styled-components"
import Button from "../../component/Button";
import DialoguePhaseWrapper from "../../component/DialoguePhase";
import color from "../../style/color";

const data = [
  {
    "id": "$dialogue-13",
    "title": "Listen to two colleagues and complete this dialogue. ",
    "phases": [
      "[B = Bob; D = Daisy]",
      "B: What do you think? Which $laptop is better for the sales team?",
      "D: I'm not sure. This computer has a $bigger memory and I think it has a $better processor.",
      "B: And the other one?",
      "D: Well, it is $smaller.",
      "B: And $lighter.",
      "D: Yes, you'r e right. Lighter and smaller.",
      "B: But the bigger one is $cheaper.",
      "D: So what is our decision?",
      "B: I'm not sure. Let's go for a coffee and discuss this again."
    ],
    "audio_init": "8",
    // "audio_ended": "39"
  },
  {
    "id": "$dialogue-15",
    "title": "Listen to two colleagues discussing software and complete this dialogue.",
    "phases": [
      "[T = Tim ; S = Simone ]",
      "T: What do you think about these three photo imaging packages?",
      "S: It's a difficult choice . All three are very good but they have different strengths.",
      "T: I agree.",
      "S: Serif Image Plus has [the best] image $correction.",
      "T: OK.",
      "S: But Magic Extreme has the $fastest processing of images.",
      "T: You're right. Also, Serif has [the best] special $effects. But what about Snap Pro?",
      "S: Well, it has the $best dubbing options.",
      "T: And Snap Pro is the best for burning photos.",
      "S: I'm not sure. Serif has [the most] efficient $compression.",
      "T: Which is the most expensive?",
      "S: Oh, Serif Image Plus.",
      "T: And the cheapest?",
      "S: Snap Pro.",
      "T: Let's get Snap Pro then.",
      "S: I'm still not sure! "
    ],
    "audio_init": "8"
  },
  // {
  //     "id": "$dialogue-17",
  //     "title": "Listen and complete this dialogue.",
  //     "phases": [
  //         "[P = Paul; B = Brinitha ]",
  //         "P: Hi, Brinitha.",
  //         "B: Hi, Paul.",
  //         "P: How's it $going ?",
  //         "B: Fine, fine.",
  //         "P: What $are you $doing at the moment?",
  //         "B: Oh, I ['m installing] Nero.",
  //         "P: How are you getting on?",
  //         "B: Well, I ['m setting] up a network. I'm using Microsoft Server.",
  //         "P: Right. Where is Jackie today? Do you know?",
  //         "B: Yes. She is on a training course today. She's $learning about the new database system.",
  //         "P: What about Mary and Imran? Where are they?",
  //         "B: They [aren't coming] in today. They have a day off. "
  //     ],
  //     "audio_init": "7"
  // },
  {
    "id": "$dialogue-20",
    "title": "Listen to Sarah and George. Complete this dialogue.",
    "phases": [
      "[S = Sarah; G = George]",
      "S: George, I $need some information about our website.",
      "G: OK, what do you need to $know?",
      "S: Well, I need some information about website $traffic, you know, external visits to our website.",
      "G: OK.",
      "S: Could you do a report for me?",
      "G: Sure. $When do you need it by?",
      "S: Er, tomorrow morning, I'm $afraid. It's for the finance director.",
      "G: OK, what do you need to know $exactly?",
      "S: Well, the $number of visitors to our website last month, their movements and actions on the website, and where they're from.",
      "G: OK, I $can do that.",
      "S: Thanks very $much indeed."
    ],
    "audio_init": "6"
  }
]


// Structure
function Dialogue() {
  const id_first_el = data[0].id.split("-")[1]
  const base_url = "https://prod-files-dialogue-generator.s3.amazonaws.com"
  const audio_url = (id: string) => `${base_url}/audio/audio-${id}.mp3`
  const icon_url = (id: string) => `url('${base_url}/icons/${id}.svg')`

  const AudioPlayer = styled.audio``
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRefNow = audioRef.current

  const menuBtns = data.map((el) => {
    let elId = el.id.split("-")[1]
    let btnId = el.id.slice(1)
    return (
      <Button
        width={"100%"}
        fontSize={"13px"}
        fontWeight={"600"}
        letterSpacing={"1.4px"}
        id={elId}
        onClick={() => {
          alert(elId)
        }}
      >
        {btnId[0].toUpperCase() + btnId.slice(1)}
      </Button >
    )
  })

  const audioBtns = ["loop", "play", "stop"].map((el) => {
    const [backgroundColor, setBackgroundColor] = useState(`${color.button}`);
    const [backgroundImage, setBackgroundImage] = useState(icon_url(el))
    const [loop, setLoop] = useState(false);

    return (
      <Button
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        width={"40px"}
        height={"40px"}
        padding={"0"}
        onClick={() => {
          switch (el) {
            case "loop":
              setLoop(!loop);
              if (audioRefNow) {
                if (!loop) {
                  setBackgroundColor(`${color.button_hover}`)
                } else {
                  setBackgroundColor(`${color.button}`)
                }
                audioRefNow.loop = !loop
              }
              break;
            case "play":
              if (audioRefNow) {
                if (audioRefNow.paused) {
                  audioRefNow.play()
                  setBackgroundImage(icon_url("pause"))
                } else {
                  audioRefNow.pause()
                  // setBackgroundImage(icon_url("play"))
                }
              }
              break;
            case "stop":
              alert(el)
              break;
          }
        }}
      >
      </Button >
    )
  })

  return (
    <DialogueWrapper>
      <AudioPlayer ref={audioRef} src={audio_url(id_first_el)} />
      <nav>{menuBtns}</nav >
      <ActWrapper>
        <header>
          <section className="section-audio">{audioBtns}</section>
          <section className="section-process">Process</section>
        </header>
        <main>
          <h2>Title Dialogue Here</h2>
          <section className="section-box-tip"></section>
          <section className="section"></section>
        </main>
      </ActWrapper>
    </DialogueWrapper >
  )
}

// Style
const DialogueWrapper = styled.div`
      width: 100vw;
      height: 100vh;
      padding: 35px;
      display: flex;
      justify-content: center;
      align-items: center;

      nav {
        background: #000;
        width: 200px;
        height: 100%;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        gap: 10px
      }

      header {
        background: #c20f0f;
        width: 700px;
        height: 10%;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;

        .section-audio {
          display: flex;
          gap: 10px;
        }

        .section-process {
        
        }
      }

      main {
        .section-box-tip {

        }

        .section-dialogue-phase {
          
        }
      }
`


const ActWrapper = styled.section`
  height: 100%;
`

export default Dialogue;
