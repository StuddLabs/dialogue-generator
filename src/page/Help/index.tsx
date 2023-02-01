
import styled from "styled-components"

// Structure
function Help() {
    return (
        <HelpWrapper>
            <h1>Help Page</h1>
        </HelpWrapper >
    )
}

// Style
const HelpWrapper = styled.div`
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

export default Help;
