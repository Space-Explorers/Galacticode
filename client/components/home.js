import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getAllPlanets, getUnlockedPlanets} from '../store'
import {connect} from 'react-redux'

const planetImg = (unlocked, planet) => {
  const found = unlocked.find(
    unlockedPlanet => unlockedPlanet.name === planet.name
  )
  if (found) return planet.unlockedImg
  else return planet.lockedImg
}

class Home extends Component {
  componentDidMount() {
    this.props.fetchPlanets()
    this.props.fetchUnlockedPlanets(this.props.user.id)
  }

  render() {
    const {planets, unlockedPlanets} = this.props
    console.log('UNLOCKED', unlockedPlanets)

    return (
      <div className="planet-select">
        <div className="planet-header">
          <h2>SELECT A PLANET</h2>
        </div>
        {planets &&
          unlockedPlanets &&
          planets.map(planet => {
            const src = planetImg(unlockedPlanets, planet)
            return (
              <div
                className="planet-img"
                id={`planet${planet.id}`}
                key={planet.id}
              >
                {src !== '/Gray_Planet.png' ? (
                  <Link to={`/planet/${planet.id}`}>
                    <img src={`${src}`} width="150" height="150" />
                    <p>{planet.name}</p>
                  </Link>
                ) : (
                  <div>
                    <img src={`${src}`} width="150" height="150" />
                    <p>{planet.name}</p>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  planets: state.planets.allPlanets,
  unlockedPlanets: state.planets.unlockedPlanets
})

const mapDispatchToProps = dispatch => ({
  fetchPlanets: () => dispatch(getAllPlanets()),
  fetchUnlockedPlanets: userId => dispatch(getUnlockedPlanets(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
