import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas sobre el AuthReducer", () => {
  test("Debe retornar estado por defecto ", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });
  test('Login --- Debe autenticar y colocar el "name" del usuario ', () => {
    const action = {
      type: types.login,
      payload: {
        name: "Adrian",
      },
    };
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      name: "Adrian",
    });
  });
  test('Logout -- Debe borrar el "name" del usuario y dejar el logged en false ', () => {
    const action = {
      type: types.logout,
    };
    const state = authReducer({ logged: true, name: "Adrian" }, action);
    expect(state).toEqual({ logged: false });
  });
});
