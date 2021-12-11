import authReducer, { login, logout, register } from "./authReducer";

//function to generate random string
const generateRandomUserName = () => {
  return Math.random().toString(36).substring(7);
};

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  status: "",
};
const userLogin = {
  email: "emailo@gmailo.com",
  password: "passwordo",
};
const userLoginBad = {
  email: "emailo@gmailo.com",
  password: "passwordo-bad",
};

test("should return the initial state", () => {
  expect(authReducer(undefined, {})).toEqual(initialState);
});

test("should handle a valid user register", async () => {
  const dispatch = jest.fn();
  const userToRegister = {
    name: "string",
    email: `${generateRandomUserName()}@gmailo.com`,
    password: "passwordo",
  };
  const response = await register(userToRegister)(dispatch);
  expect(dispatch).toHaveBeenCalled();
  expect(response.type).toBe("auth/register/fulfilled");
  expect(response.payload).toBeInstanceOf(Object);
});

test("should handle a invalid user register", async () => {
  const dispatch = jest.fn();
  const response = await register({})(dispatch);
  expect(dispatch).toHaveBeenCalled();
  expect(response.type).toBe("auth/register/rejected");
  expect(response.error.name).toBe("Error");
});

test("should handle a login with valid credentials", async () => {
  const dispatch = jest.fn();
  const response = await login(userLogin)(dispatch);
  expect(dispatch).toHaveBeenCalled();
  expect(response.payload).toBeInstanceOf(Object);
});

test("should handle a login with invalid credentials", async () => {
  const dispatch = jest.fn();
  const response = await login(userLoginBad)(dispatch);
  expect(dispatch).toHaveBeenCalled();
  expect(response.type).toBe("auth/login/rejected");
  expect(response.error.message).toBe("Login Failed");
});

test("should handle a logout", async () => {
  const loggedState = {
    isAuthenticated: true,
    token: "ouivS2F5kZ0ixu",
    user: {},
    status: "fulfilled",
  };
  const loggedOut = await authReducer(loggedState, logout());
  expect(loggedOut).toEqual(initialState);
});
