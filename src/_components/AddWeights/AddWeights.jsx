import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions/user.actions';
import './AddWeights.scss'


function AddWeights() {
    const dispatch = useDispatch();
  
    return (
        <div className="">
                <h1>Add Weights</h1>
                
        </div>
    );
}

export { AddWeights };