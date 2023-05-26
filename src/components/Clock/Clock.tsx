import moment from 'moment';
import 'moment-duration-format';
import { FC, useEffect, useState } from 'react';
import './Clock.css';

const padNum = (num: number): string => String(num).padStart(2, '0');

const Clock: FC = () => {
    const [clock, setClock] = useState(moment());

    const theEnd = moment('2050-01-01 00:00:00');
    const timeBetween = moment.duration(theEnd.diff(clock));
    // const timeBetweenFormatted = timeBetween.format('YY [years], M [months], D [days] / HH [hours :] mm [minutes :] ss [seconds]');
    // const timeBetweenYMD = timeBetweenFormatted.slice(0, timeBetweenFormatted.search('/'));
    // const timeBetweenHMS = timeBetweenFormatted.slice(timeBetweenFormatted.search('/') + 1);

    const years = timeBetween.years();
    const months = timeBetween.months();
    const days = timeBetween.days();
    const hours = timeBetween.hours();
    const minutes = timeBetween.minutes();
    const seconds = timeBetween.seconds();

    useEffect(() => {        
        const doomsdayClock = setInterval(() => setClock(moment()), 1000);
        return () => clearTimeout(doomsdayClock);
    }, []);

    return (
        <>
            <div className='clock-container'>
                {/* <p className='time'>{timeBetweenYMD}</p> */}
                <p className='time'>
                    <span className='time-space-fix'>{years}</span> {years === 1 ? 'year, ' : 'years, '}
                    <span className='time-space-fix'>{months}</span> {months === 1 ? 'month, ' : 'months, '}
                    <span className='time-space-fix'>{days}</span> {days === 1 ? 'day' : 'days'}
                </p>
                <p className='time'>
                    <span className='time-space-fix'>{padNum(hours)}</span>  {hours === 1 ? 'hour : ' : 'hours : '}
                    <span className='time-space-fix'>{padNum(minutes)}</span>  {minutes === 1 ? 'minute : ' : 'minutes : '}
                    <span className='time-space-fix'>{padNum(seconds)}</span> {seconds === 1 ? 'second' : 'seconds'}
                </p>
            </div>
        </>
    );
};

export default Clock;