import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import styles from './index.module.less'
import { signOut } from 'actions/Auth'
import Profile from './drop.js'


const RightContent =  ({username,signOut}) => {

    const handleMenuClick = () => {
            signOut()
      };

    return (
        <div className={styles.right}>
            <Profile/>            
            <span className={`${styles.action} ${styles.account}`} style={{marginRight: 10}}
                onClick={handleMenuClick}
            >                    
                <span className={styles.name}>{username}<Icon type="logout" /></span>
            </span>
        </div>
    )
        }
function mapStateToProps (state) {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps,{signOut})(RightContent)