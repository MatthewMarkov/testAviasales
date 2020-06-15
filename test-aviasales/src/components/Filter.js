import React from "react";
import s from './Filter.scss'
import {connect} from "react-redux";
import {getOneTransferTickets, getTwoTransferTickets} from "../redux/ticket-reducer";

const Filter = (props) => {
    return (
        <div className={s.filterWrapper}>
            <div>КОЛЛИЧЕСТВО ПЕРЕСАДОК</div>
            <div><input type="checkbox" />Без пересадок</div>
            <div><input type="checkbox" onClick={() => props.getOneTransferTickets()}/>1 пересадка</div>
            <div><input type="checkbox" onClick={() => props.getTwoTransferTickets()}/>2 пересадки</div>
            <div><input type="checkbox"/>3 пересадки</div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    sortedTickets: state.ticketsPage.sortedTickets
})

export default connect(mapStateToProps, {getOneTransferTickets, getTwoTransferTickets}) (Filter)