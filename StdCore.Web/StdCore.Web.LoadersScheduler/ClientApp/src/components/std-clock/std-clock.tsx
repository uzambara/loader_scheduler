import React, {useEffect, useState} from "react";
import * as styles from "./std-clock.scss";
import moment from "moment";

export function StdClock() {
    const [time, setTime] = useState(moment());

    useEffect(() => {
        const timeInterval = setInterval(() => setTime(moment()), 1000);
        return () => clearInterval(timeInterval);
    }, []);

    return <div className={styles.clock}>
        {time.format("DD MMMM HH:mm:ss")}
    </div>
}
