import moment from 'moment';
import 'moment-duration-format';
import { FC, useEffect, useState } from 'react';
import styles from './Clock.module.css';

const padNum = (num: number): string => String(num).padStart(2, '0');

const Clock: FC<{aboutPage?: boolean}> = ({aboutPage}) => {
    const [clock, setClock] = useState(moment());

    const theEnd = moment('2050-01-01 00:00:00');
    const timeBetween = moment.duration(theEnd.diff(clock));
    const years = timeBetween.years();
    const months = timeBetween.months();
    const days = timeBetween.days();
    const hours = timeBetween.hours();
    const minutes = timeBetween.minutes();
    const seconds = timeBetween.seconds();

    const timeSpaceFixCSS = aboutPage ? styles['time-space-fix-aboutpage'] : styles['time-space-fix']

    useEffect(() => {        
        const doomsdayClock = setInterval(() => setClock(moment()), 1000);
        return () => clearTimeout(doomsdayClock);
    }, []);

    return (
        <>
            <div className={aboutPage ? styles['clock-container-aboutpage'] : styles['clock-container']}>
                <p className={styles['clock-container__p']}>
                    <span className={timeSpaceFixCSS}>{years}</span> {years === 1 ? 'year, ' : 'years, '}
                    <span className={timeSpaceFixCSS}>{months}</span> {months === 1 ? 'month, ' : 'months, '}
                    <span className={timeSpaceFixCSS}>{days}</span> {days === 1 ? 'day' : 'days'}
                </p>
                <p className={styles['clock-container__p']}>
                    <span className={timeSpaceFixCSS}>{padNum(hours)}</span>  {hours === 1 ? 'hour : ' : 'hours : '}
                    <span className={timeSpaceFixCSS}>{padNum(minutes)}</span>  {minutes === 1 ? 'minute : ' : 'minutes : '}
                    <span className={timeSpaceFixCSS}>{padNum(seconds)}</span> {seconds === 1 ? 'second' : 'seconds'}
                </p>
            </div>
        </>
    );
};

export default Clock;