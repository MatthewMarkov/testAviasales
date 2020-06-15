import {getSearchIdRequest, getTickets} from "../api";

const initialState = {
    ticketsArray: [],
    isFetching: false,
    sortedTickets: []
}
function copy(aObject) {
    if (!aObject) {
        return aObject;
    }

    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
        v = aObject[k];
        bObject[k] = (typeof v === "object") ? copy(v) : v;
    }

    return bObject;
}
const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TICKETS_PACK' :
            return {
                ...state,
                ticketsArray: action.ticketsPack
            }
        case 'IS_FETCHING':
            return {
                ...state, isFetching: action.boolean,
            };
        case 'FIND_THE_CHEAPEST' :
            return {
                ...state,
                ticketsArray: [ ...state.ticketsArray].sort(( a, b ) => a.price - b.price),
                sortedTickets: [ ...state.sortedTickets].sort(( a, b ) => a.price - b.price)
            }
        case 'FIND_THE_FASTEST' :
            return {
                ...state,
                sortedTickets: [ ...state.sortedTickets].sort(( a, b ) =>
                    (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration)),
                ticketsArray: [ ...state.ticketsArray].sort(( a, b ) =>
                    (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration))
            }
        case 'ONE_TRANSFER_TICKETS' :
            debugger
            let ticketsWithOneTransfer = [state.ticketsArray.filter((ticket) => ticket.segments[0].stops.length === 1 && ticket.segments[1].stops.length === 1)]
            debugger
            return {
                ...state,
                sortedTickets: [...state.sortedTickets, ...ticketsWithOneTransfer[0]]
            }
        case 'TWO_TRANSFER_TICKETS' :
            let ticketsWithTwoTransfers = [state.ticketsArray.filter((ticket) => ticket.segments[0].stops.length === 2 && ticket.segments[1].stops.length === 2)]
            return {
                ...state,
                sortedTickets: [ ...state.sortedTickets, ...ticketsWithTwoTransfers]
            }
        case 'THREE_TRANSFER_TICKETS' :
            let ticketsWithThreeTransfers = [state.ticketsArray.filter((ticket) => ticket.segments[0].stops.length === 3 && ticket.segments[1].stops.length === 3)]
            return {
                ...state,
                sortedTickets: [ ...state.sortedTickets, ...ticketsWithThreeTransfers]
            }
        case 'WITHOUT_TRANSFER' :
            let ticketsWithoutTransfer = [state.ticketsArray.filter((ticket) => ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0)]
            return {
                ...state,
                sortedTickets: [ ...state.sortedTickets, ...ticketsWithoutTransfer]
            }
        default:
            return state;
    }
}

const setTicketsPack = (ticketsPack) => ({
    type: 'GET_TICKETS_PACK', ticketsPack
})
const isFetching = (boolean) => ({
    type: 'IS_FETCHING', boolean
})
const theCheapest = () => ({
    type: 'FIND_THE_CHEAPEST'
})
const theFastest = () => ({
    type: 'FIND_THE_FASTEST'
})
const oneTransfer = () => ({
    type: 'ONE_TRANSFER_TICKETS'
})
const twoTransfer = () => ({
    type: 'TWO_TRANSFER_TICKETS'
})
const threeTransfer = () => ({
    type: 'THREE_TRANSFER_TICKETS'
})
const withoutTransfer = () => ({
    type: 'WITHOUT_TRANSFER'
})


export const getTicketsThunk = () => async (dispatch) => {
    const searchId = await getSearchIdRequest()
    dispatch(getTicketsPack(searchId))
    dispatch(isFetching(true))
}
const getTicketsPack = (searchId) => async (dispatch) => {
    const response = await getTickets(searchId)
    if (response.data.stop === false) {
    dispatch(setTicketsPack(response.data.tickets))
    }
}
export const getTheCheapestTickets= () => (dispatch) => {
    dispatch(theCheapest())
}
export const getTheFastestTickets= () => (dispatch) => {
    dispatch(theFastest())
}
export const getOneTransferTickets= () => (dispatch) => {
    debugger
    dispatch(oneTransfer())
}
export const getTwoTransferTickets= () => (dispatch) => {
    dispatch(twoTransfer())
}
export default ticketReducer;