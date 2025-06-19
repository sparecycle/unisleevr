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

    return (
        <picture>
            <source
                media={`(min-width: ${breakpoints?.large}px)`}
                srcSet={`${baseName}-${sizes?.ultra}${extension}`}
            />
            <source
                media={`(min-width: ${breakpoints?.desktop}px)`}
                srcSet={`${baseName}-${sizes?.large}${extension}`}
            />
            <source
                media={`(min-width: ${breakpoints?.small}px)`}
                srcSet={`${baseName}-${sizes?.desktop}${extension}`}
            />
            <source
                media={`(min-width: ${breakpoints?.tablet}px)`}
                srcSet={`${baseName}-${sizes?.small}${extension}`}
            />
            <source
                media={`(min-width: ${breakpoints?.mobile}px)`}
                srcSet={`${baseName}-${sizes?.tablet}${extension}`}
            />
            <img
                src={`${baseName}-${sizes?.mobile}${extension}`}
                alt={alt}
                className={`h-auto w-full ${className}`}
                loading={loading}
                fetchPriority={fetchPriority}
            />
        </picture>
    );
};

export default Picture;
