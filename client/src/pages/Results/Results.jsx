import { useParams } from "react-router-dom"
import "./results.css"

const Results = () => {
  let { id } = useParams()

  return (
    <section>
      <div className="results-container">
        <div className="results-card">
          <h1>Results</h1>
            
        </div>
      </div>
    </section>
  )
}

export default Results
