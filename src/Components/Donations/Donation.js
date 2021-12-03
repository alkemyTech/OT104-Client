import React from "react";
// import styles from './Donation.module.css';

function Donation(props) {
  return <div>{props.text}</div>;
}

Donation.propTypes = {
  text(props, propName, componentName) {
    if (props[propName] === undefined) {
      return new Error(
        `You need to pass a prop "${propName}:{'a message as string'}" for ${componentName} Component`
      );
    }
    if (typeof props[propName] !== "string") {
      return new Error(
        `You need to pass a string as a prop for ${componentName} Component`
      );
    }
  },
};
export default Donation;
