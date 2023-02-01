
import styled from "styled-components"

// Structure
function Home() {
    return (
        <HomeWrapper>
            <h1>Home Page</h1>
        </HomeWrapper >
    )
}

// Style
const HomeWrapper = styled.div`
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

export default Home;
