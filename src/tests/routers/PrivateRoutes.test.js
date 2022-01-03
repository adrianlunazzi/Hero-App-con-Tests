const { mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");
const { AuthContext } = require("../../auth/authContext");
const { PrivateRoute } = require("../../routers/PrivateRoute");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => <span>Saliendo de aqui</span>,
}));

describe("Pruebas sobre las Rutas Privadas", () => {
  Storage.prototype.setItem = jest.fn();

  test("Mostrar el componente si usuario esta autenticado. Guardar info del user en localStorage", () => {
    const contextValue = {
      user: {
        logged: true,
        name: "Adrian",
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/"]}>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.text().trim()).toBe("Private Component");
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
  });
  test("Debe bloquear el componente si no esta autenticado", () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/"]}>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.text().trim()).toBe("Saliendo de aqui");
  });
});
