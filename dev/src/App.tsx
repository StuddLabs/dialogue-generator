import Wellcome from "./page/Wellcome";

type AppProps = {
  isStart?: boolean,
  userName?: string
}

function App(props: AppProps) {
  return (
    <>
      {/* {props.isStart ? <Wellcome /> : true} */}
      <Wellcome />
    </>
  )
}

export default App;

