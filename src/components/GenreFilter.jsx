function GenreFilter({ genreState, setGenre, genres }) {
    const clickhandler = (index) => {
        const genre = genres[index];

        let genreCopy = [...genreState];

        if (genreCopy.includes(genre)) {
            let i = genreCopy.indexOf(genre);
            genreCopy.splice(i, 1);
        } else {
            genreCopy.push(genre);
        }

        setGenre(genreCopy);
    };
    return (
        <div className="genre-filter">
            <h5>Genres</h5>
            {genres.map((genre, index) => {
                return (
                    <label htmlFor={genre}>
                        <input
                            type="checkbox"
                            name={genre}
                            key={index}
                            onClick={() => clickhandler(index)}
                        />
                        {genre}
                    </label>
                );
            })}
        </div>
    );
}

export default GenreFilter;
