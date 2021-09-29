export const getInitialState = (auxiliarEvent , initState) => {
    if(auxiliarEvent){
        return auxiliarEvent;
    }else{
        return initState;
    }
}