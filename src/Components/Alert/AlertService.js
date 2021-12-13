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

export function alertServiceConfirm(
  title,
  showDenyButton,
  showCancelButton,
  confirmButtonText,
  denyButtonText
) {
  Swal.fire({
    title,
    showDenyButton,
    showCancelButton,
    confirmButtonText,
    denyButtonText,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}
