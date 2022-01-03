import { heroes } from "../data/heroes";
export const getHeroById = (id = "") => {
  console.log("getHeroByID called");
  return heroes.find((hero) => hero.id === id);
};
