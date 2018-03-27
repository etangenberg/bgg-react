import React from 'react';
import { connect } from 'react-redux';
import BoardgameList from './components/BoardgameList';

const AppDisplay = ({test}) => (
  <div>
    <h1>
      Isomorphic react
    </h1>
    <div>
      <BoardgameList  />
    </div>
  </div>
);

const mapStateToProps = (state, ownProps)=>
{
  return{
    ...state
  }
};

export default connect(mapStateToProps)(AppDisplay);
