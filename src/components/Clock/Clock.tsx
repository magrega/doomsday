import { useEffect, useState, FC } from 'react';
import moment from 'moment';
import './Clock.css';

const Clock: FC = () => {
    const [clock, setClock] = useState(moment());

    const theEnd = moment('2050-01-01 00:00:00');
    const timeBetween = moment.duration(theEnd.diff(clock));

    const zeroPad = (num: number) => String(num).padStart(2, '0');

    useEffect(() => { setInterval(() => setClock(moment()), 1000) }, []);

    return (
        <div className="clock-container">
            <p className='time'>{`${timeBetween.years()} years, ${timeBetween.months()} months, ${timeBetween.days()} days`}</p>
            <p className='time'>{`${zeroPad(timeBetween.hours())} hours : ${zeroPad(timeBetween.minutes())} minutes : ${zeroPad(timeBetween.seconds())} seconds`}</p>
        </div>
    );
};

export default Clock;