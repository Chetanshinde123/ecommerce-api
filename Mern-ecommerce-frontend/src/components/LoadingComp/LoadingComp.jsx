import ReactLoading from 'react-loading'

const LoadingComp = () => {
  return (
    <div style={{
        display:"flex",
        justifyContent: "center",
        alignItems : "center"
    }}>
        <ReactLoading type='spin' color='red' />
    </div>
  )
}

export default LoadingComp