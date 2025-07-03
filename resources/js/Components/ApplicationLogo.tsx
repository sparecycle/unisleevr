import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            id="logo"
            data-name="unisleevr-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 117.84"
            // className="text-zinc-800 dark:text-zinc-200"
            {...props}
        >
            <polyline
                className="cls-1"
                points="70.77 6.4 70.77 83 62.54 91.24 13.24 91.24 5 83 5 6.67 7.9 5.68 30.23 25.83 30.21 104.6 38.46 112.84 87.76 112.84 96 104.6 96 28.01"
                stroke="#fff"
                strokeWidth={'10px'}
                strokeLinecap="square"
                strokeMiterlimit={10}
                fill="none"
            />
        </svg>
    );
}
