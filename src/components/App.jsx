import { useState, useEffect, useRef } from "react";
import Detail from "./Detail";
import GenreFilter from "./GenreFilter";

function App() {
    const [restaurantData, setRestaurantData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [genre, setGenre] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const inputRef = useRef();

    const clickhandler = (option) => {
        if (option) {
            let count = restaurantData.length;
            if (start + 10 >= count) return;
            setStart(start + 10);
            setEnd(Math.min(end + 10, count));
        } else {
            if (start === 0) return;
            setStart(start - 10);
            setEnd(start);
        }
    };

    const changehandler = (event) => {
        if(inputRef.current.value === "") setSearchFilter("");
    }

    const handleKey = (event) => {
        if(event.key === 'Enter') {
            console.log('herer')
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

    const applyFilter = () => {
        return restaurantData.filter((restaurant) =>
                (restaurant.name.includes(searchFilter) ||
                 restaurant.city.includes(searchFilter) ||
                 restaurant.genre.includes(searchFilter)) &&
                 (genre.length === 0 || genre.filter((gen) => restaurant.genre.includes(gen)).length)
        );
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container">
            <h1>Restaurant Detail</h1>

            <div className="search-field">
                <input type="text" ref={inputRef} onChange={changehandler}/>
                <button onClick={() => setSearchFilter(inputRef.current.value)} onKeyPress={(e) => handleKey(e)}>
                    Search
                </button>
            </div>

            <div className="box">
                <GenreFilter genreState={genre} setGenre={setGenre} />
                {searchFilter === "" && genre.length === 0 ? (
                    <Detail
                        restaurants={restaurantData}
                        start={start}
                        end={end}
                    />
                ) : (
                    <Detail
                        restaurants={applyFilter(restaurantData)}
                        start={start}
                        end={end}
                    />
                )}
            </div>

            <div className="row">
                <button onClick={() => clickhandler(0)}>Prev</button>
                <button onClick={() => clickhandler(1)}>Next</button>
            </div>
        </div>
    );
}

export default App;
