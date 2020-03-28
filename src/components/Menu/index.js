import React from 'react'
import { Menu } from 'antd';

import { MenuList, getDefaultSelectedKeys, getDefaultOpenKeys } from './menulist'
import { MenuTest } from './test2';
import { MenuTest1 } from './test';
export default ({ onselect, roleid }) => {
    const test = MenuTest;
    const test1 = MenuTest1;

    const list = MenuList
    const render = () => {
        if (roleid === 'super-admin') {
            return (
                <Menu

                    onSelect={onselect}
                    theme="light"
                    mode="inline"
                    selectedKeys={getDefaultSelectedKeys()}
                    defaultOpenKeys={getDefaultOpenKeys()}
                >
                    {list}
                </Menu>
            )
        } else if (roleid === 'guest') {

            return (
                <Menu

                    onSelect={onselect}
                    theme="light"
                    mode="inline"
                    selectedKeys={getDefaultSelectedKeys()}
                    defaultOpenKeys={getDefaultOpenKeys()}
                >
                    {test1}
                </Menu>
            )
        }
    }

    return (
        { render }
    )
}

