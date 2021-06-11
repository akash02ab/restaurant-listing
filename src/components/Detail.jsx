function compare( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

function Detail({ restaurants, start, end }) {
    return (
        <div className="details">
            <div className="head">
                <h4>Name</h4>
                <h4>City</h4>
                <h4>State</h4>
                <h4>Contact</h4>
                <h4>Genre</h4>
            </div>
            {restaurants
                .sort(compare)
                .map((restaurant, index) => {
                    return (
                        <div className="restaurant" key={index}>
                            <p>{restaurant.name}</p>
                            <p>{restaurant.city}</p>
                            <p>{restaurant.state}</p>
                            <p>{restaurant.telephone}</p>
                            <p>{restaurant.genre}</p>
                        </div>
                    );
                })
                .filter((data, index) => index >= start && index < end)}
        </div>
    );
}

export default Detail;
