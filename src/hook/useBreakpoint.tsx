import { useEffect, useState } from "react";

const BREAKPOINTS = {
  mobileToTablet: 768,
  tabletToSmallLaptop: 1024,
  smallLaptopToDesktop: 1300,
};

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < BREAKPOINTS.mobileToTablet) {
        setBreakpoint("mobile");
      } else if (window.innerWidth < BREAKPOINTS.tabletToSmallLaptop) {
        setBreakpoint("tablet");
      } else if (window.innerWidth < BREAKPOINTS.smallLaptopToDesktop) {
        setBreakpoint("small-laptop");
      } else {
        setBreakpoint("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}
