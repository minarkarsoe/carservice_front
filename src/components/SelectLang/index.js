
//react
import React from 'react';
import HeaderDropdown from '../HeaderDropdown'
//redux
import { connect } from 'react-redux'
import { setLocale } from '../../actions/locale'
//ant
import { Menu, Icon } from 'antd';
//css
import './index.css'
//image
import profile from '../../assets/img/profile.svg'
import notification from '../../assets/img/notification.svg'
import a from '../../assets/img/a.png'
import b from '../../assets/img/b.svg'
import c from '../../assets/img/c.svg'

const SelectLangComponent =  ({setLocale}) => {
    const locales = ['en', 'mn','on','sn'];
    const languageIcons = {
        'en': <span><img src={profile}  /></span>,
        'en':<span><img src={notification} style={{width:'25px',height:'50px',marginRight:'20px',marginTop:'0.7px'}}/><b>Notification</b><hr></hr></span>,
        'mn': <span><img src={c}  style={{width:'25px',height:'50px'}}/>Google developer Group added a new event new year</span>,
        'on': <span><img src={a}  style={{width:'25px',height:'50px'}}/>A page you like,Lucky Jewelly,changed its name to ..</span>,
        'sn': <span><img src={b}  style={{width:'25px',height:'50px'}}/>Han Ei Maw invite you to like Free Online Shopping!!</span>,
        
        
        };
    const languageLabels = {
        'en': '',
        'mn': '',
        'on': '',
        'sn': '',
      
    };
    const langMenu = (
        <Menu className='menu'>
            {locales.map(locale => (
                <Menu.Item key={locale} onClick={()=>setLocale(locale)}>
                    <span role="img" aria-label={languageLabels[locale]}>
                    {languageIcons[locale]}
                    </span>{' '}
                    {languageLabels[locale]}
                </Menu.Item>
            ))}        
        </Menu>
    );
   return (
        <HeaderDropdown  overlay={langMenu} placement="bottomRight">
            
            <img src={notification} alt='notificaton' style={{width:'35px',height:'35px',marginRight:'50px',marginTop:'10px'}} />
           
        </HeaderDropdown>
    )
}
function mapStateToProps(state){
    return{
        lang : state.locale.lang
    }
}
const SelectLang = connect( mapStateToProps, {setLocale})(SelectLangComponent)  
export default SelectLang