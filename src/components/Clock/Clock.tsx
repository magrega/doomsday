import moment from 'moment';
import 'moment-duration-format';
import { FC, useEffect, useState } from 'react';
import './Clock.css';

const Clock: FC = () => {

    const [clock, setClock] = useState(moment());

    const theEnd = moment('2050-01-01 00:00:00');
    const timeBetween = moment.duration(theEnd.diff(clock)).format('YY [years], M [months], D [days] / HH [hours :] mm [minutes :] ss [seconds]');
    const timeBetweenYMD = timeBetween.slice(0, timeBetween.search('/'));
    const timeBetweenHMS = timeBetween.slice(timeBetween.search('/') + 1);

    useEffect(() => { 
        const doomsdayClock = setInterval(() => setClock(moment()), 1000);
        return () => clearTimeout(doomsdayClock);
     }, []);

    return (
        <div className='clock-container'>
            <p className='time'>{timeBetweenYMD}</p>
            <p className='time'>{timeBetweenHMS}</p>
        </div>
    );
};

export default Clock;