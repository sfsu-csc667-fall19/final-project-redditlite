import React from "react"

import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Button
} from "reactstrap"

import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'
import { getJSDocParameterTags } from "typescript"

const NaviBar = ({ dispatch, username, email, isLoggedIn }) => {
  let history = useHistory()

  const accountLogOut = () => {
    dispatch(logoutUser())
    history.push('/')
  }

  const goHome = () => {
    history.push('/')
  }

  const goCreate = () => {
    history.push('/post/create')
  }

  return (
    <div>
      <Navbar className='nav' fixed="top">
        <div className="pointer">
          <NavbarBrand id="brand" onClick={ () => goHome() }>
            Reddit-Lite
          </NavbarBrand>
        </div>

        {
          isLoggedIn && (
            <Nav className="nav">
              <Button color="primary" onClick={ () => goCreate() }>
                <i className="fa fa-pencil"></i> Write Post
              </Button>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  { username } <i className="fa fa-user"></i>
                </DropdownToggle>

                <DropdownMenu right>
                  <DropdownItem onClick={ () => accountLogOut() }>
                    <i className="fa fa-sign-out"></i>Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          )
        }
      </Navbar>
    </div>
  )
}

const mapStateToProps = state => ({
  email: state.userReducer.email,
  username: state.userReducer.username,
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStateToProps)(NaviBar);
