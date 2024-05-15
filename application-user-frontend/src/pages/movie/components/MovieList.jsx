import MovieItem from "./MovieItem";
import MovieItemHorizontal from "./MovieItemHorizontal";

function MovieList({ movies, type, showRank }) {
  // Định nghĩa một object để mapping giữa type và component tương ứng
  const MovieItemComponents = {
    MOVIE_ITEM: MovieItem,
    MOVIE_ITEM_HORIZONTAL: MovieItemHorizontal,
  };

  // Chọn component dựa trên type
  const SelectedMovieItem = MovieItemComponents[type];

  return (
    <>
      {movies && SelectedMovieItem && movies.map((movie, index) => (
        <SelectedMovieItem movie={movie} key={movie.id} index={index} showRank={showRank} />
      ))}
    </>
  )
}

export default MovieList