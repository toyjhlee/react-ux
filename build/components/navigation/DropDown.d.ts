import React from 'react';
interface MenuItemProps {
    active?: boolean;
}
interface DropDownProps {
    label: string;
    children: React.ReactNode;
}
declare function DropDown(props: DropDownProps): JSX.Element;
declare namespace DropDown {
    var defaultProps: {
        menuList: never[];
    };
    var Item: import("styled-components").StyledComponent<"li", any, MenuItemProps, never>;
}
export default DropDown;
