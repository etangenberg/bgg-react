import unionWith from 'lodash/unionWith';

export const boardgames = (state = [], {type, games}) => {
    const gameEquality = (a = {}, b = {}) => {
        return a.$.objectid == b.$.objectid;
    };

    if (type == "FETCHED_BOARDGAMES"){
        state = unionWith(state, games, gameEquality)
    }
    return state;
}