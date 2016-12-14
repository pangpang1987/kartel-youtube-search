import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

class DefaultHeader extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <IndexLink to="/" className="navbar-brand">
              <div className="brand-icon"></div>
              <span>Kartel Youtube Search Engine</span>
            </IndexLink>
          </div>
          <ul className="nav navbar-nav pull-right">
            <li>
              <IndexLink to="/" activeClassName="active" className="">
                search videos
              </IndexLink>
            </li>
            <li>
              <Link to="/my_videos" activeClassName="active">
                my videos
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export const Header = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
  </div>
)

export default DefaultHeader
