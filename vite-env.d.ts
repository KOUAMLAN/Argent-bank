/// <reference types="vite/client" />

declare module '*.svg?react' {
  import type { FunctionComponent, SVGProps } from 'react';

  // Fix: Renamed the component to `SvgrComponent` to avoid a duplicate identifier
  // conflict, which can occur if Vite's client types also define a component for this module.
  const SvgrComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
  export default SvgrComponent;
}

