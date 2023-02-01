
import styled from "styled-components"
import Button from "../../component/Button"; // Compoment

// Structure
function Wellcome() {
  // const handleClick = () => {
  //   redirect("/editor")
  // };

  return (
    <WellcomeWrapper>
      <h1>Wellcome!!!</h1>
      <Button href="/login">Start</Button>
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
