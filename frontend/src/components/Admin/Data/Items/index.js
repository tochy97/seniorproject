import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

function Items(props) {
    const { isLoggedIn, username, isLoading, items, user } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            username:state.auth.username,
            isLoading:state.item.isLoading,
            user:state.auth.user, 
            items:state.item.items
    }), shallowEqual);
    useEffect(() => {
      if(isLoading){
        dispatch(fetchItems());
      }
    }, [setFilt,  isLoading,dispatch]);
    return (
        <div>
            
        </div>
    );
}

export default Items;