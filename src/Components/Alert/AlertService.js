import Swal from "sweetalert2";

export function alertServiceError(title, text) {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
}
