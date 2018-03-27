import React from 'react';
import {connect} from 'react-redux';

const Boardgame = ({$, name}) => (
    <div>
        <h4>{name[0]._}</h4>
    </div>
)

const BoardgameList = ({boardgames}) => {
    console.dir(boardgames);
    return (
    <div>
    {    
       boardgames && boardgames.length ?
        <div>
        {boardgames.map(game => <Boardgame key={game.$.objectid} {...game}/>)}
        </div> 
        :
        <div>Getting games...{boardgames.length}</div>
    }
    </div>
)};

const mapStateToProps = (boardgames) => (
    boardgames
);

export default connect(mapStateToProps)(BoardgameList);
