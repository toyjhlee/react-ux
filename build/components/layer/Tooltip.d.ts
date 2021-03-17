import React from 'react';
interface TooltipProps {
    isShow: boolean;
    clickable: boolean;
    'data-tip': string;
    children: React.ReactNode;
    onClick: () => void;
}
declare function Tooltip(props: TooltipProps): JSX.Element;
declare namespace Tooltip {
    var defaultProps: {
        isShow: boolean;
        clickable: boolean;
        onClick: () => void;
    };
}
export default Tooltip;
