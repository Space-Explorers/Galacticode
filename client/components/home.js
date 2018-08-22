import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getAllPlanets} from '../store'
import {connect} from 'react-redux'

class Home extends Component {
  componentDidMount () {
    this.props.fetchPlanets()
  }

  render () {
    const {planets} = this.props
    return (
      <div className="planet-select">
        <div className="planet-header">
          <h2>SELECT A PLANET!</h2>
        </div>
        <div>
          {planets && (
            planets.map(planet => (
              <div className="planet" key={planet.id}>
                <Link to={`/planet/${planet.id}`}>
                  <img
                    className="planet-img"
                    src={planet.img}
                    width="150"
                    height="150"
                  />
                </Link>
              </div>
          )))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  planets: state.planets.allPlanets
})

const mapDispatchToProps = dispatch => ({
  fetchPlanets: () => dispatch(getAllPlanets())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
