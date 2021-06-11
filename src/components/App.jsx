import { useState, useEffect } from "react";
import Detail from "./Detail";

function App() {
    const [restaurantData, setRestaurantData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);

    const clickhandler = (option) => {
        if(option) {
            let count = restaurantData.length;
            if(start + 10 >= count) return;
            setStart(start + 10);
            setEnd(Math.min(end + 10, count));
        }
        else {
            if(start === 0) return;
            setStart(start - 10);
            setEnd(start);
        }
    }

    const getData = async () => {
        try {
            let response = await fetch("http://128.199.195.196:3001/", {
                method: "GET",
                headers: {
                    Authorization: "Bearer iqi509189dxznal;,ggi",
                },
            });
            let data = await response.json();
            setRestaurantData(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container">
            <h1>Restaurant Detail</h1>
            <Detail restaurants={restaurantData} start={start} end={end} />
            <div className="row">
                <button onClick={() => clickhandler(0)}>Prev</button>
                <button onClick={() => clickhandler(1)}>Next</button>
            </div>
        </div>
    );
}

export default App;
