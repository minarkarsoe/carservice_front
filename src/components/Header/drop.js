import {Menu,Button} from 'antd';
import {Dropdown} from 'antd';
import React from 'react';
import profile from '../../assets/img/profile.svg'
import a from '../../assets/img/a.png'
import b from '../../assets/img/b.svg'
import c from '../../assets/img/c.svg'
import {getUserInfo} from '../../utils'
import {Link} from 'react-router-dom'
import styles from './profile.css';
import {Avatar} from 'antd';

const user = getUserInfo();
const imgurl = "http://localhost:9991/"
const menu= (
    
    <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" ><Link to='/profile'>

        <Avatar src={imgurl+user.image} size="large" />{user.user_name}</Link>
      </a>
      </Menu.Item>
  </Menu>
);

class MYdrop extends React.Component{
    render(){
        return(
            <span>
                <Dropdown overlay={menu} placement="bottomCenter" >
                    <Avatar src={imgurl+user.image} alt="noti" style={{width:'40px',height:'40px',marginRight: 20,}}/>
                </Dropdown>
            </span>
        )
    }
}
export default MYdrop