import { useParams } from "react-router-dom"

const Results = () => {

  let { id } = useParams()
  
  return <div>{id}</div>
}

export default Results
