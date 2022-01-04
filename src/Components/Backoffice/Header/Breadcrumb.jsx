import { Breadcrumb as BreadcrumbBS } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const route = pathname.split("/").filter((n) => n) || [];

  return (
    <BreadcrumbBS className="mt-3">
      {route.map((item, index) => (
        <BreadcrumbBS.Item
          key={index.toString()}
          active
          style={{ textTransform: "capitalize" }}
        >
          {item}
        </BreadcrumbBS.Item>
      ))}
    </BreadcrumbBS>
  );
};

export default Breadcrumb;
