import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { HeroScreen } from "../../../components/Heroe/HeroScreen";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Pruebas sobre componente <HeroScreen/>", () => {
  test("No se debe mostrar HeroScreen si no hay un heroe en la URL ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <Routes>
          <Route path="/hero" element={<HeroScreen />} />
          <Route path="/" element={<h1>No Hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    expect(wrapper.find("h1").text().trim()).toBe("No Hero Page");
  });
  test("Debe mostrar un heroe si el parametro existe y lo encuentra ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroScreen />} />
          <Route path="/" element={<h1>No Hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    expect(wrapper.find(".row").exists()).toBe(true);
  });
  test("Debe regresar a la pantalla anterior", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
  test('Debe de mostrar el "no hero page" si no tenemos un heroe', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider32132132"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroScreen />} />
          <Route path="/" element={<h1>No Hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe("No Hero Page");
  });
});
