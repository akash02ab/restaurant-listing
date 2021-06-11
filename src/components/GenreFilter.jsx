const genres = [
    'American',   'Asian',         'Bakery',
    'Belgian',    'Bistro',        'British',
    'Cafe',       'Coffee',        'Contemporary',
    'European',   'Freanch',       'Grill',
    'Hawaiian',   'International', 'Irish',
    'Italian',    'Japanese',      'Kosher',
    'Oysters',    'Pacific Rim',   'Polynesian',
    'Seafood',    'Seafood',       'Steak',
    'Sushi',      'Tea',           'Traditional',
    'Vegetarian', 'Vegetarian',    'Vietnamese'
];

function GenreFilter({ genreState, setGenre }) {
    const clickhandler = (index) => {
        const genre = genres[index];
        
        let genreCopy = [...genreState];
        
        if(genreCopy.includes(genre)) {
            let i = genreCopy.indexOf(genre);
            genreCopy.splice(i, 1);
        }
        else {
            genreCopy.push(genre);
        }

        setGenre(genreCopy);
    }
    return (
        <div className="genre-filter">
            <h5>Genres</h5>
            {
                genres.map((genre, index) => {
                    return (
                        <label htmlFor={genre}>
                        <input type="checkbox" name={genre} key={index} onClick={() => clickhandler(index)} />
                        {genre}
                        </label>
                    )
                })
            }            
        </div>
    )
}

export default GenreFilter;
