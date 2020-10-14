import React, { useContext } from 'react';
import { Menu, Button, Container, Segment } from 'semantic-ui-react'
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./App";

function PageHeader() {
  // User auth context
  const { state: authState } = useContext(AuthContext);

  const requesterMenu = 
    authState.user
      ? <Menu.Item 
        as={NavLink}
        to='requester'
        activeClassName='active'
        name='Tasks'
      />
      : null;

  const loginLogoutButton =
    authState.user 
      ? <Menu.Item as={Link} to='logout' position='right'>
          <Button inverted={true}>
            Logout {authState.user.name}
          </Button>
        </Menu.Item>
      : <Menu.Item as={Link} to='login' position='right'>
          <Button inverted={true}>
            Log in
          </Button>
        </Menu.Item>;

  return (
    <div>
        <Segment
          inverted
          textAlign='center'
          vertical
        >
        <Menu
          inverted
          pointing
          secondary
          size='large'
        >
          <Container>
            <Menu.Item>
              <h3>iCrowdTask</h3>
            </Menu.Item>
            {requesterMenu}
            {loginLogoutButton}
          </Container>
        </Menu>
      </Segment>
    </div>
  );
}

export default PageHeader;
