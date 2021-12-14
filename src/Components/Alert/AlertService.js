import Swal from "sweetalert2";

export function alertServiceInfoTimer(
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

export function alertServiceConfirm(title, confirmButtonText) {
  Swal.fire({
    title,
    showDenyButton: true,
    showCancelButton: true,
    denyButtonText: `No ${confirmButtonText || "Confirmar"}`,
    confirmButtonText: confirmButtonText || "Confirmar",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire(confirmButtonText || "Hecho", "", "success");
    } else if (result.isDenied) {
      Swal.fire("No se han hecho los cambios", "", "info");
    }
  });
}
export function alertServiceError(title, text) {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
}
