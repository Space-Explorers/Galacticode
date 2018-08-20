import React from 'react'
import {Editor} from './index'

const Results = props => {
  const {results, loading} = props

  return (
    <div className="promptresults">
      {/* show when there are no results and we aren't loading any */}
      {!results.stats && !loading && <p>Your results will be shown here.</p>}

      {/* show results once they exist and loading is false */}
      {results.stats &&
        !loading && (
          <div>
            <div id="results-stats">
              <p><b>Time: </b>{results.stats.duration}ms </p>
              <p><b>Passed: </b>{results.stats.passes}</p>
              <p><b>Failed: </b>{results.stats.failures}</p>
            </div>
            <div>
              <h3>Results:</h3>
              {results.stats.passPercent === 100 ? (
                <p>Congratulations! All tests passed!</p>
              ) : (
                <div className="output-editor">
                  <Editor
                    value={results.error}
                    showGutter={false}
                    readOnly={true}
                    maxLines={10}
                    showLineNumbers={false}
                  />
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
