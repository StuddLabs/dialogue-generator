
import styled from "styled-components"

// Structure
function Editor() {
    return (
        <EditorWrapper>
            <h1>Editor Page</h1>
        </EditorWrapper >
    )
}

// Style
const EditorWrapper = styled.div`
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

export default Editor;
