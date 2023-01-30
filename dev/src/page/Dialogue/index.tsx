
import styled from "styled-components"

// Structure
function Dialogue() {
    return (
        <DialogueWrapper>
            <h1>Dialogue Page</h1>
        </DialogueWrapper >
    )
}

// Style
const DialogueWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 8px;
    font-size: 80px;
  }
`

export default Dialogue;
