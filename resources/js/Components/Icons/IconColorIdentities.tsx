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
        <div className={`aspect-square w-1/3 ${className ? className : ''}`}>
            {children}
        </div>
    );
};

const IconColorIdentities = () => {
    return (
        <div className="relative aspect-square">
            <PipWrapper>
                <IconIsland />
            </PipWrapper>
            <PipWrapper>
                <IconMountain />
            </PipWrapper>
            <PipWrapper>
                <IconForest />
            </PipWrapper>
        </div>
    );
};

export default IconColorIdentities;
