import slides from "./slidesService";

test("useSlides return an object", () => {
  expect(typeof slides).toBe("object");
});

test("slides should contains a function getSlides", () => {
  expect(typeof slides.get).toBe("function");
});
test("slides should contains a function getSlide", () => {
  expect(typeof slides.getAll).toBe("function");
});
test("slides should contains a function createSlide", () => {
  expect(typeof slides.create).toBe("function");
});
test("slides should contains a function updateSlide", () => {
  expect(typeof slides.update).toBe("function");
});
test("slides should contains a function deleteSlide", () => {
  expect(typeof slides.delete).toBe("function");
});
