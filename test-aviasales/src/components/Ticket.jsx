import React from "react";
import s from './Ticket.module.scss'

const Ticket = ({price, carrier, segments}) => {
    const Transfer = ({i}) => {
        if (segments[i].stops.length > 1) {
            return "ПЕРЕСАДКИ"
        } else if (segments[i].stops.length === 1) {
            return "ПЕРЕСАДКА"
        } else if (segments[i].stops.length === 0) {
            return "БЕЗ ПЕРЕСАДОК"
        }
    }
    const getTimeFromMin = (min) => {
        let hours = Math.trunc(min/60);
        let minutes = min % 60;
        return hours + 'ч ' + minutes + 'м';
    };
    const dataAndTime = segments[0].date.split('T')
    const data = dataAndTime[0]
    const separateTime = dataAndTime[1].split(':')
    const fullTime = separateTime[0] + ':' + separateTime[1]

    return (
        <div className={s.ticketWrapper}>
                <div className={s.price}>{price.toLocaleString('ru')} Р</div>
                <div className={s.logo}><img src={`//pics.avs.io/99/36/${carrier}.png`}/></div>
            <div className={s.InCountry}>
                <div className={s.firstRow}>{segments[0].origin}-{segments[0].destination}</div>
                <div className={s.secondRow}>{data + ' ' + fullTime}</div>
            </div>
            <div className={s.InTravelTime}>
                <div className={s.firstRow}>В ПУТИ</div>
                <div className={s.secondRow}>{getTimeFromMin(segments[0].duration)}</div>
            </div>
            <div className={s.InTransfer}>
                <div className={s.firstRow}>{segments[0].stops.length > 0 && segments[0].stops.length} <Transfer i={0}/></div>
                <div className={s.secondRow}>{segments[0].stops.map((el) => el + ' ')}</div>
            </div>
            <div className={s.OutCountry}>
                <div className={s.firstRow}>{segments[1].origin}-{segments[1].destination}</div>
                <div className={s.secondRow}>{data + ' ' + fullTime}</div>
            </div>
            <div className={s.OutTravelTime}>
                <div className={s.firstRow}>В ПУТИ</div>
                <div className={s.secondRow}>{getTimeFromMin(segments[1].duration)}</div>
            </div>
            <div className={s.OutTransfer}>
                <div className={s.firstRow}>{segments[1].stops.length > 0 && segments[1].stops.length} <Transfer i={1}/></div>
                <div className={s.secondRow}>{segments[1].stops.map((el) => el + ' ')}</div>
            </div>
        </div>
    )
}
export default Ticket