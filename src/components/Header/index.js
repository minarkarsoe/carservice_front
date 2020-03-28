import React from 'react'
import RightContent from './RightContent'
import styles from './index.module.less'

export default React.memo((props) => {
    const {
        isMobile,
    } = props
    
    const getHeadWidth = () => {
        const { collapsed } = props;
        return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
      };
    const getHeadWidthMobile = () => {
    return  'calc(100% - 0px)' ;
    };

    const width = getHeadWidth();
    const widthmobile = getHeadWidthMobile();
    return (
            <div style={ isMobile ? { widthmobile } : { width }} className={styles.header}>
                <RightContent />  
            </div>
    )
})