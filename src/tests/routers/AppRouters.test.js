import { AppRouter } from "../../routers/AppRouter";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";

describe("Pruebas sobre el AppRouter", () => {
  test("Se debe mostrar el login si el usuario no esta autenticado", () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    console.log(wrapper.html());
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text().trim()).toBe("Login");
  });
  test("Se debe mostrar el componente de Marvel si el usuario esta autenticado", () => {
    const contextValue = {
      user: {
        logged: true,
        name: "Adrian",
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
