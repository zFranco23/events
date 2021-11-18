import moment from "moment"



export const prepareDataEvents = ( events ) => {

    const cleanData = events.map(( event) => ({
        ...event,
        end : moment(event.end).toDate(),
        start : moment(event.start).toDate(),
    }))
    return cleanData;
}