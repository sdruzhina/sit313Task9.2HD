import React, { useContext } from 'react';
import { Menu, Button, Container, Segment } from 'semantic-ui-react'
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./App";

function PageHeader() {
  // User auth context
  const { state: authState } = useContext(AuthContext);

  const requesterMenu = 
    authState.user && authState.user.isRequester 
      ? <Menu.Item 
        as={NavLink}
        to='requester'
        activeClassName='active'
        name='Requester'
      />
      : null;

  const workerMenu = 
    authState.user && authState.user.isWorker 
      ? <Menu.Item 
        as={NavLink}
        to='worker'
        activeClassName='active'
        name='Worker'
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
            {workerMenu}

            {loginLogoutButton}
          </Container>
        </Menu>
      </Segment>
    </div>
  );
}

export default PageHeader;
