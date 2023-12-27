import * as React from 'react';
import { type SVGProps, type Ref, forwardRef, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' ref={ref} {...props}>
    <path
      fill='#000'
      d='M10.5 14.875a1.505 1.505 0 0 1-1.164-.56L5.653 9.852a1.837 1.837 0 0 1-.228-1.933A1.54 1.54 0 0 1 6.816 7h7.368a1.54 1.54 0 0 1 1.391.919 1.838 1.838 0 0 1-.227 1.933l-3.684 4.463a1.505 1.505 0 0 1-1.164.56Z'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;
