import { mount } from "enzyme";
import { SearchScreen } from "../../../components/search/SearchScreen";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Pruebas sobre el componente <Search/>", () => {
  test("Debe mostrarse correctamente con valores por defecto", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchScreen />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Buscar un Heroe");
  });

  test("Debe mostrar a Batman y el input con el valor del  queryString", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchScreen />
      </MemoryRouter>
    );
    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe mostrar un error en caso de que no se encuentre el heroe buscado", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman1233"]}>
        <SearchScreen />
      </MemoryRouter>
    );
    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      "No hay resultados que coincidan con tu busqueda"
    );
  });
  test("El navigate() debe llamar a la nueva pantalla ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchScreen />
      </MemoryRouter>
    );

    wrapper.find("input").simulate("change", {
      target: {
        name: "searchText",
        value: "batman",
      },
    });

    wrapper.find("form").prop("onSubmit")({
      preventDefault() {},
    });

    expect(mockNavigate).toHaveBeenCalledWith("?q=batman");
  });
});
