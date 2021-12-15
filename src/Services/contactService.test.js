import contactService from "./contactService";
import contactSerivce from "./contactService";
localStorage.setItem(
  "token",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9vbmdhcGkuYWxrZW15Lm9yZ1wvYXBpXC9sb2dpbiIsImlhdCI6MTYzOTIzMDY1MywiZXhwIjoxNjM5MjM0MjUzLCJuYmYiOjE2MzkyMzA2NTMsImp0aSI6ImNaUnM2RThUY2JvejkwSzMiLCJzdWIiOjEwODAsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.O0ePNVLdiXtJQUBMz0NURZxKu3Ntv5metGQkphtTYzQ"
);

let newContact = {
  name: "Juan",
  email: "test@gmail.com",
  message: "soy un nuevo user",
};
let searchId = 11;
let newName = "Juan";
let editContact = {
  id: searchId,
  name: newName,
};

describe("contactService test", () => {
  it("should return the contacts from the API, GET", async () => {
    const response = await contactSerivce.get();
    expect(response.data.success).toBe(true);
  });
  it("should post a new contact to the API", async () => {
    const response = await contactSerivce.create(newContact);
    expect(response.data.success).toBe(true);
  });
  it(`should return a contact with a id of ${searchId}`, async () => {
    const response = await contactSerivce.getById(searchId);
    expect(response.data.data.id).toBe(searchId);
  });
  it("should edit the name of the contact", async () => {
    const response = await contactSerivce.edit(editContact);
    expect(response.data.data.name).toBe(newName);
  });
  it("should delete the contact", async () => {
    const response = await contactService.delete(searchId);
    expect(response.data.success).toBe(true);
  });
});
