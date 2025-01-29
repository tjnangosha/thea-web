import React from "react";
import iconThea from "../../icons/icon_thea.svg"

export const TheaLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <img src={iconThea} alt="icon" width="30" height="30" />
);

export const TheaLogoText: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <h1 style={props.style}>Project Thea Web</h1>
  );
};
