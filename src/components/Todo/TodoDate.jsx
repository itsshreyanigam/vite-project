import { useEffect, useState } from "react";
export const TodoDate = () => {
        const [dateTime, setDateTime] = useState("");
        useEffect(() => {
            const interval = setInterval(() => {
                const now = new Date();
                const today = now.toLocaleDateString();
                const time = now.toLocaleTimeString();
                setDateTime(`${today} - ${time}`); //update the date time every second
            }, 1000);
    
            return () => clearInterval(interval); //clean up the interval when component unmounts
        }, []);
        <h2 className="date-time">{dateTime}</h2>
};