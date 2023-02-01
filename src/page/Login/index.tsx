
import styled from "styled-components"

// Structure
function Login() {
    return (
        <LoginWrapper>
            <h1>Login Page</h1>
        </LoginWrapper >
    )
}

// Style
const LoginWrapper = styled.div`
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

export default Login;
