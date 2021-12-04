import { useSlides } from "./slides";

const slides = useSlides();

test("useSlides return an object", () => {
  expect(typeof slides).toBe("object");
});

test("slides should contains a function getSlides", () => {
  expect(typeof slides.getSlides).toBe("function");
});
test("slides should contains a function getSlide", () => {
  expect(typeof slides.getSlide).toBe("function");
});
test("slides should contains a function createSlide", () => {
  expect(typeof slides.createSlide).toBe("function");
});
test("slides should contains a function updateSlide", () => {
  expect(typeof slides.updateSlide).toBe("function");
});
test("slides should contains a function deleteSlide", () => {
  expect(typeof slides.deleteSlide).toBe("function");
});
