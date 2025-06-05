import { ReactNode } from 'react';
import IconForest from './IconForest';
import IconIsland from './IconIsland';
import IconMountain from './IconMountain';

type PipWrapperProps = {
    className?: string;
    children: ReactNode;
};
const PipWrapper = ({ className, children }: PipWrapperProps) => {
    return (
        <div
            className={`absolute aspect-square h-5 w-5 -translate-x-1/2 -translate-y-1/2 ${className ? className : ''}`}
        >
            {children}
        </div>
    );
};

const IconColorIdentities = () => {
    return (
        <div className="relative aspect-square w-full">
            <PipWrapper className={'top-1/3 left-1/3'}>
                <IconIsland />
            </PipWrapper>
            <PipWrapper className={'top-1/3 left-2/3'}>
                <IconMountain />
            </PipWrapper>
            <PipWrapper className={'top-2/3 left-1/2'}>
                <IconForest />
            </PipWrapper>
        </div>
    );
};

export default IconColorIdentities;
