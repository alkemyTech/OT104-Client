import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Image({ ...props }) {
  return (
    <div>
      <LazyLoadImage {...props} effect="blur" />
    </div>
  );
}
