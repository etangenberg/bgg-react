import React from 'react';
import {connect} from 'react-redux';

const GameListDetails = () => (
    <div> 
        <code>{this.props.year}</code>
    </div>
);

const BoardgameItem = ({$, name, yearpublished, ...details}) => (
    <div>
        <h6>{name[0]._}</h6>
        <div>
            <code>{yearpublished}</code>
            {/* <GameListDetails year={yearpublished[0]._} {...details} /> */}
        </div>
    </div>
)

const BoardgameList = ({boardgames}) => {
    console.dir(boardgames);
    return (
    <div>
    {    
       boardgames && boardgames.length ?
        <div>
        {boardgames.map(game => <BoardgameItem key={game.$.objectid} {...game}/>)}
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
