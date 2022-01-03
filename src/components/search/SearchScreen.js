import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
//import { heroes } from "../../data/heroes";
import { getHeroByName } from "../../helpers/getHeroByName";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../Heroe/HeroCard";
import { useMemo } from "react";

export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });
  const handleSearch = (e) => {
    console.log(searchText);
    e.preventDefault();

    navigate(`?q=${searchText}`);
  };

  const { searchText } = formValues;
  const heroesFiltered = useMemo(() => getHeroByName(q), [q]);

  return (
    <>
      <h1>Search </h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-info mt-4">
              Buscar
            </button>
          </form>
        </div>
        <div className="col-7">
          <h3>Resultados</h3>
          <hr />
          {q === "" ? (
            <div className="alert alert-info">Buscar un Heroe</div>
          ) : (
            heroesFiltered.length === 0 && (
              <div className="alert alert-danger">
                No hay resultados que coincidan con tu busqueda
              </div>
            )
          )}
          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
