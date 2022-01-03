import { mount } from "enzyme";
import {
  MemoryRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();
jest.mock("react-router-dom"),
  () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  });
describe("Pruebas sobre componente <Navbar>", () => {
  const contextValue = {
    user: {
      logged: true,
      name: "Pedro",
    },
    dispatch: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Navbar />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test("Debe mostrarse correctamente el componente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Pedro");
  });

  test("debe llamar a la funcion logout, llamar al navigate y el dispatch con los argumentos ", () => {
    wrapper.find("button").prop("onClick")();
    expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.logout });
  });
});
