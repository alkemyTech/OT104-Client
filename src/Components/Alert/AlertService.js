import Swal from "sweetalert2";

export function alertServiceTimer(
  position,
  icon,
  title,
  showConfirmButton,
  timer
) {
  Swal.fire({
    position,
    icon,
    title,
    showConfirmButton,
    timer,
  });
}

export function alertServiceSimple(text) {
  Swal.fire(text);
}

export function alertServiceError(title, text) {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
}
