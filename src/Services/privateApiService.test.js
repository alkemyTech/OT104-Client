import { patchRequest, postRequest } from "./privateApiService";

describe("patchRequest", () => {
  const baseURL = "https://jsonplaceholder.typicode.com/posts/";
  const id = 1;
  const data = {
    title: "foo",
    body: "bar",
    userId: 1,
  };
  const expectedData = {
    userId: 1,
    id: 1,
    title: "foo",
    body: "bar",
  };

  it("should return a promise", () => {
    expect(patchRequest(baseURL, id, data)).toBeInstanceOf(Promise);
  });

  it("should return a promise that resolves to the expected object", async () => {
    const response = await patchRequest(baseURL, id, data);
    expect(response.data).toEqual(expectedData);
  });

  it("should return error message when the id is not valid", async () => {
    const response = await patchRequest(baseURL, "/", data);
    expect(response.message).toEqual("Request failed with status code 404");
  });
});

describe("postRequest", () => {
  const url = "http://ongapi.alkemy.org/api/login";
  const dataBody = {
    email: "emailo@gmailo.com",
    password: "passwordo",
  };
  const expectedMessage = "user login okey";

  it("should return a promise", () => {
    expect(postRequest(url, dataBody)).toBeInstanceOf(Promise);
  });

  it("should return a promise that resolves to the expected object", async () => {
    const response = await postRequest(url, dataBody);
    expect(response.data.message).toEqual(expectedMessage);
  });

  it("should return error message when the id is not valid", async () => {
    const response = await postRequest(
      "http://ongapi.alkemy.org/api/categoriesss",
      dataBody
    );
    expect(response.message).toEqual("Request failed with status code 404");
  });
});
