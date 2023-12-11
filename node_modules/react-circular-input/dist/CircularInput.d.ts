/// <reference types="react" />
declare type DefaultHTMLProps = JSX.IntrinsicElements['svg'];
declare type Props = Omit<DefaultHTMLProps, 'onChange'> & {
    value: number;
    radius?: number;
    onChange?: (value: number) => void;
    onChangeEnd?: (value: number) => void;
    ref?: undefined;
    width?: undefined;
    height?: undefined;
    viewBox?: undefined;
    onClick?: undefined;
};
export declare function CircularInput({ value, radius, onChange, onChangeEnd, tabIndex, children, ...props }: Props): JSX.Element;
export {};
