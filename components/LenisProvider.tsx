"use client";

import { ReactLenis } from "lenis/react";
import React, { PropsWithChildren } from "react";

const LenisProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
