export declare type ObjectFit = 'contain' | 'cover' | 'original';
interface ImageProps {
    url: string;
    type: ObjectFit;
    disabledObjectFit: boolean;
}
declare function Image(props: ImageProps): JSX.Element;
declare namespace Image {
    var defaultProps: {
        type: string;
        disabledObjectFit: boolean;
    };
}
export default Image;
