import * as React from 'react';
import { SVGProps } from 'react';

const FileSvg = (props: SVGProps<SVGSVGElement>) => (
	<svg width={33} height={33} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			d="M25.5 28.288h-18a1 1 0 0 1-1-1v-22a1 1 0 0 1 1-1h12l7 7v16a1 1 0 0 1-1 1Z"
			stroke="#9898A2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M19.5 4.288v7h7" stroke="#9898A2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default FileSvg;
