import React from 'react'

const Results = props => {
  const {results, loading} = props

  return (
    <div className="prompt results">
      {/* show when there are no results and we aren't loading any */}
      {!results && !loading && <p>Your results will be shown here.</p>}

      {/* show results once they exist and loading is false */}
      {results &&
        !loading && (
          <div>
            <div>
              <p>Time: {results.stats.duration}ms </p>
              <p>Passed: {results.stats.passes}</p>
              <p>Failed: {results.stats.failures}</p>
            </div>
            <div>
              <h3>Results:</h3>
              {results.stats.passPercent === 100 ? (
                <p>Congratulations! All tests passed!</p>
              ) : (
                <div>
                  {results.error.map((fail, idx) => (
                    <p key={idx}>{fail.err.message}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      {/* show loading screen when loading is true */}
      {loading && <p>Processing...</p>}
    </div>
  )
}

export default Results
