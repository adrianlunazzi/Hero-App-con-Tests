import React, { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getHeroById } from "../../helpers/getHeroById";

export const HeroScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const hero = useMemo(() => getHeroById(id), [id]);

  if (!hero) {
    return <Navigate to="/" />;
  }

  const { superhero, alter_ego, publisher, first_appearance, characters } =
    hero;
  const handleReturn = () => {
    navigate(-1);
  };
  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`/assets/${id}.jpg`}
          alt={superhero}
          className="img-thumbnail animate__animated animate__flipInY"
        />
      </div>
      <div className="col-8">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter Ego: </b>
            {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {publisher}
          </li>
          <li className="list-group-item">
            <b>First Appereance: </b>
            {first_appearance}
          </li>
        </ul>
        <h5 className="mt-3">Characters</h5>
        <p>{characters}</p>
        <button className="btn btn-outline-info" onClick={handleReturn}>
          Volver
        </button>
      </div>
    </div>
  );
};
