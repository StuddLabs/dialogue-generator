
import styled from "styled-components"
import Button from "../../component/Button"; // Compoment
import Dialogue from "../Dialogue"; // Page

// Structure
function Wellcome() {
    function start() {
        Dialogue()
    }

    return (
        <WellcomeWrapper>
            <h1>Wellcome!!!</h1>
            <Button onClick={start}>Start</Button>
        </WellcomeWrapper >
    )
}

// Style
const WellcomeWrapper = styled.div`
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

export default Wellcome;
