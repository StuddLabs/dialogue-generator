
import styled from "styled-components"

// Structure
function Singin() {
    return (
        <SinginWrapper>
            <h1>Singin Page</h1>
        </SinginWrapper >
    )
}

// Style
const SinginWrapper = styled.div`
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

export default Singin;
