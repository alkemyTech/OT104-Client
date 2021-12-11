import slides from "./slidesService";
localStorage.setItem(
  "token",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9vbmdhcGkuYWxrZW15Lm9yZ1wvYXBpXC9sb2dpbiIsImlhdCI6MTYzOTIzMDY1MywiZXhwIjoxNjM5MjM0MjUzLCJuYmYiOjE2MzkyMzA2NTMsImp0aSI6ImNaUnM2RThUY2JvejkwSzMiLCJzdWIiOjEwODAsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.O0ePNVLdiXtJQUBMz0NURZxKu3Ntv5metGQkphtTYzQ"
);

const newSlide = {
  name: "Nombre",
  description: "string",
  image:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQI12OYWVsLAANGAZSo7q9/AAAAAElFTkSuQmCC",
  order: 0,
  user_id: 0,
};
let slideId;

test("slides should return an object", () => {
  expect(typeof slides).toBe("object");
});

test("slides should contains a function create", () => {
  expect(typeof slides.create).toBe("function");
});
test("slides.create() should return an object", async () => {
  const result = await slides.create(newSlide);
  expect(result.data.success).toBe(true);
  expect(typeof result.data).toBe("object");
  slideId = result.data.data.id;
});

test("slides should contains a function get", () => {
  expect(typeof slides.get).toBe("function");
});
test("slides.get() should return an object", async () => {
  const result = await slides.get(slideId);
  expect(typeof result.data.data).toBe("object");
});

test("slides should contains a function getAll", () => {
  expect(typeof slides.getAll).toBe("function");
});
test("slices.getAll() should return an array", async () => {
  const result = await slides.getAll();
  expect(result.data.success).toBe(true);
  expect(Array.isArray(result.data.data)).toBe(true);
});

test("slides should contains a function update", () => {
  expect(typeof slides.update).toBe("function");
});
test("slides.update() should return an object", async () => {
  const result = await slides.update(newSlide, slideId);
  expect(result.data.success).toBe(true);
  expect(typeof result.data.data).toBe("object");
});

test("slides should contains a function delete", () => {
  expect(typeof slides.delete).toBe("function");
});
test("slides.delete() should return success", async () => {
  const result = await slides.delete(slideId);
  expect(result.data.success).toBe(true);
});
