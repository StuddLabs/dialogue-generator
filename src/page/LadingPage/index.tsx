
import styled from "styled-components"

// Structure
function LadingPage() {
  return (
    <LadingPageWrapper>
      <h1>Lading Page</h1>
    </LadingPageWrapper >
  )
}

// Style
const LadingPageWrapper = styled.div`
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

export default LadingPage;
