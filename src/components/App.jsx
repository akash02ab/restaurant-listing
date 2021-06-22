import { useState, useEffect, useRef } from "react";
import Detail from "./Detail";
import GenreFilter from "./GenreFilter";
//https://gist.github.com/McLarenCollege/279e016d6061ba5e21a9f6d31dac2636

let count;

function App() {
    const [restaurantData, setRestaurantData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [genre, setGenre] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const inputRef = useRef();

    const clickhandler = (option) => {
        if (option) {
            if (start + 10 >= count) return;
            setStart(start + 10);
            setEnd(Math.min(end + 10, count));
        } else {
            if (start === 0) return;
            setStart(start - 10);
            setEnd(start);
        }
    };

    const changehandler = () => {
        if(inputRef.current.value === "") setSearchFilter("");
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
            
            let allGenre = [];
            
            data.forEach(item => {
                item.genre.split(',').forEach((gen) => {
                    if(!allGenre.includes(gen)) {
                        allGenre.push(gen);
                    }
                });
            });
            
            setGenres(allGenre)
            
            count = data.length;
        } catch (err) {
            console.error(err);
        }
    };

    const applyFilter = () => {
        const filteredData =  restaurantData.filter((restaurant) =>
                (restaurant.name.includes(searchFilter) ||
                 restaurant.city.includes(searchFilter) ||
                 restaurant.genre.includes(searchFilter)) &&
                 (genre.length === 0 || genre.filter((gen) => restaurant.genre.includes(gen)).length)
        );

        count = filteredData.length;
        return filteredData;
    };

    const removeFilter = () => {
        count = restaurantData.length;
        return restaurantData;
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container">
            <h1>Restaurant Detail</h1>

            <div className="search-field">
                <input type="text" ref={inputRef} onChange={changehandler}/>
                <button onClick={() => setSearchFilter(inputRef.current.value)}>
                    Search
                </button>
            </div>

            <div className="box">
                <GenreFilter genreState={genre} setGenre={setGenre} genres={genres} />
                {searchFilter === "" && genre.length === 0 ? (
                    <Detail
                        restaurants={removeFilter()}
                        start={start}
                        end={end}
                    />
                ) : (
                    <Detail
                        restaurants={applyFilter()}
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
