type ImageSizes = {
    mobile: string;
    tablet: string;
    small: string;
    desktop: string;
    large: string;
    ultra: string;
};

type Breakpoints = {
    mobile: number;
    tablet: number;
    small: number;
    desktop: number;
    large: number;
};

type Props = {
    src: string;
    alt: string;
    className?: string;
    sizes?: ImageSizes;
    breakpoints?: Breakpoints;
    loading?: 'lazy' | 'eager';
    fetchPriority?: 'high' | 'low' | 'auto';
};

const Picture = ({
    src,
    alt,
    className,
    sizes,
    breakpoints,
    loading,
    fetchPriority,
}: Props) => {
    const getBaseName = (filename: string): string => {
        const lastDot = filename.lastIndexOf('.');
        return lastDot !== -1 ? filename.substring(0, lastDot) : filename;
    };

    const getExtension = (filename: string): string => {
        const lastDot = filename.lastIndexOf('.');
        return lastDot !== -1 ? filename.substring(lastDot) : '.jpg';
    };

    const baseName = getBaseName(src);
    const extension = getExtension(src);

    return <picture></picture>;
};

export default Picture;
