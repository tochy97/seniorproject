import React, { useEffect } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchItems } from '../../../../redux/actionCreators/itemActionCreators';
import AddItem from './AddItem';
import ManageItem from './ManageItem';

function Items() {
  const dispatch = useDispatch();

  const { isLoggedIn, username, isLoading, items, user } = useSelector(
    (state) =>({
      isLoggedIn:state.auth.isLoggedIn, 
      username:state.auth.username,
      isLoading:state.item.isLoading,
      user:state.auth.user, 
      items:state.item.items
    }), 
  shallowEqual);

  useEffect(() => {
    if(isLoading){
      dispatch(fetchItems());
    }
  }, [isLoading,dispatch]);
  
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first" className='hoverMe'>Manage Items</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className='hoverMe'>Add Item</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <ManageItem />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <AddItem />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
      </Tab.Container>
    );
}

export default Items;