import React, { useState } from 'react';
import { Nav, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Loading from '../../Loading/Loading';
function Report(props) {
    const [tab,setTab] = useState("sections");
  
    const { mounted, user, error, status, isSet } = useSelector(
      (state) =>({
        mounted:state.account.mounted, 
        user:state.auth.user, 
        error:state.auth.error,
        status:state.auth.status,
        isSet:state.account.set
    }), shallowEqual);

    return (
        <Card className="py-5" style={{border:0}}>
            <h1 className='p-5 text-center'>Report</h1>
            {
                mounted
                ?
                    <Nav fill variant="tabs" className='justify-content-centered' defaultActiveKey="sections"  onSelect={(selectedKey) => setTab(selectedKey)}>
                        <Nav.Item>
                            <Nav.Link eventKey="sections"><h5>All</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="available"><h5>Available</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="checkedout"><h5>Checkedout</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="items"><h5>Overdue</h5></Nav.Link>
                        </Nav.Item>
                    </Nav>
                :
                <Loading/>
            }
        </Card>
    );
}

export default Report;