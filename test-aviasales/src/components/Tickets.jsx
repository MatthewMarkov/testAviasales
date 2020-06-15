import React from "react";
import {getTheCheapestTickets, getTheFastestTickets, getTicketsThunk} from "../redux/ticket-reducer";
import {connect} from 'react-redux'
import Loader from "../Loader/Loader";
import Ticket from "./Ticket";
import s from './Tickets.module.scss'
import Toggle from "./Toggle";

class Tickets extends React.Component {
    componentDidMount() {
        this.props.getTicketsThunk()
    }

    render() {
        debugger
        const listOfUnsortedTickets = this.props.ticketsArray.map(
            (ticket) => (
                <Ticket price={ticket.price} carrier={ticket.carrier} segments={ticket.segments}/>
            )
        )
        debugger
        const listOfSortedTickets = this.props.sortedTickets.map(
            (ticket) => (
                <Ticket price={ticket.price} carrier={ticket.carrier} segments={ticket.segments}/>
            )
        )
        debugger
        return (
            <div>
                {this.props.isFetching ?
                    <div className={s.ticketsWrapper}>
                    <div className={s.buttons}>
                        <Toggle getTheCheapestTickets={this.props.getTheCheapestTickets}
                                getTheFastestTickets={this.props.getTheFastestTickets}/>
                    </div>
                    <div className={s.ticket}>
                        {this.props.sortedTickets ? listOfUnsortedTickets : listOfSortedTickets}
                    </div>
                    </div> : <Loader/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ticketsArray: state.ticketsPage.ticketsArray,
    sortedTickets: state.ticketsPage.sortedTickets,
    isFetching: state.ticketsPage.isFetching
})
export default connect(mapStateToProps, {getTicketsThunk, getTheCheapestTickets, getTheFastestTickets})(Tickets)


