import { PartLeft } from "../components/View/Parts/Left";
import { PartRight } from "../components/View/Parts/Right";
import { Children } from "react";

interface ThreePartsProps {
  children: React.ReactNode;
}

export const ThreeParts = ({ children }: ThreePartsProps) => {
  return (
    <>
      <PartLeft />
      <div className="w-[50%] mx-auto">
        {Children.map(children, (child) => (
          <div>{child}</div>
        ))}
      </div>
      <PartRight />
    </>
  );
};
