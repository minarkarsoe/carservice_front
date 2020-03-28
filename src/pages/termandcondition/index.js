import React from 'react'
import logo from '../../assets/img/logo.png'
import { Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader ,Button,Checkbox } from 'antd';
// import { Checkbox } from 'antd';
import { Link } from 'react-router-dom'

class term extends React.Component {
    
    render(){
        function onChange(e) {
            console.log(`checked = ${e.target.checked}`);
          }
        return(
            <div>
        <div style={{marginLeft:'350px'}}>
           <h2 style={{color:'#4672bb',align:'center',fontSize:'35px',fontFamily:'Times New Roman'}}><img src={logo} alt='aa' style={{width:'140px',height:'120px'}}/><b></b></h2>
           <h3 style={{marginLeft:'70px',marginTop:'1px'}}><small>Website:<a>www.ford@gmail.com</a></small></h3>
           <h3 style={{marginLeft:'70px',marginTop:'1px'}}><small>Email:<a>fordcompany123@gmail.com</a></small></h3>
           <h3 style={{marginLeft:'70px',marginTop:'1px'}}><small>Address:7a Thitsar Street,East Dagon,Yangon</small></h3>
           <h3 style={{marginLeft:'70px',marginTop:'1px'}}><small>Phone:9250603076</small></h3>
</div>
<div>
            <h1 style={{fontSize:'30px',fontFamily:'Times New Roman'}}>Terms and Conditions</h1><b></b><hr />
            <p style={{marginLeft:'800px',fontFamily:'Calibri',fontSize:'15px'}}><small>Effective Date December 3rd,2014</small></p>
            <p style={{fontSize:'19px',fontFamily:'Arial'}}>Welcome to www.corporate.ford.com Ford Motor Company's corporate website(the "Site"). This Site is operated by Ford Motor Company (hereinafter "Ford") 
                and the content on the Site is owned by Ford or its afiliated companies and by affiliates and third parties that post on the Site through a license 
                from Ford, but for whom Ford assumesno direct responsibility. Please read these terms and conditions and the Privacy Policy contained on the Site, as
                 they, together with any additional terms to which you agree when using particular elements of the Site, constitute the entire aggreement regarding 
                 the Site and set forth the legally binding terms governing your visit to this Site. These Terms and Conditions apply to all persons who visit this 
                 Site ("Visitors"), regardless of your level of participation.</p>
<br /><br />
            <h1 style={{fontSize:'20px',fontFamily:'Calibri',fontWeight:'bold'}}>United States Site and Pricing</h1>
            <p style={{fontSize:'19px',fontFamily:'Arial'}}>Ford administers this Site from Michigan, United States of America and this Site is only intended for viewing in the United States.All materials and 
                information contained on this Site apply to the United States market only.Ford makes on representation that the Site is appropriate or available for 
                use outside the United States.If you choose to access the Site from outside the United States,you do so at your own initiative and are responsible for compliance 
                with applicable laws.
                    
                    
                
            </p>
            <br /><br />
      
            <h1 style={{fontSize:'20px',fontFamily:'Calibri',fontWeight:'bold'}}>Depiction of Vehicles</h1>
            <p style={{fontSize:'19px',fontFamily:'Arial'}}>Any Vehicles shown on this Site are for general illustration only.</p><br />
       
        <h1 style={{fontSize:'20px',fontFamily:'Calibri',fontWeight:'bold'}}>Limited Licenses</h1>
        <p style={{fontSize:'19px',fontFamily:'Arial'}}>Copyright 2010.Ford Mortor Company.All rights reserved.Tis Site,including all materials,is protected by worldwide copyright laws and treatly provisions whether or not a copyright notice
            is present on the materials.All text images,graphic,animaton,videos,music,sounds and other materials on this Site
            are subject to the copyrights and other intellectual property rights of Ford its affillated companies and its licensors.

        </p>
<br /><br />
        <h1 style={{fontSize:'20px',fontFamily:'Calibri',fontWeight:'bold'}}>Linking,crawiling and archieving</h1>
        <p style={{fontSize:'19px',fontFamily:'Arial'}}>If you would like to link to this Site,you must comply with the following guidelines:<br /><br />
            (a)do not incorporate any content from this Site in to your site(e.g., by in-lining,framing or creating
            other browser or border environments arround the website content).You may only link to notreplicate,
            the Site content.<br /><br />
            (b)you may not use any Ford trademarks,logos,design or service marks in your links;<br /><br />
            (c)you may not create the apperance of a relationship or affillation with Ford; and<br /><br />
            (d)your site may not containoffensive,distasteful,illegal or inappropriate content.
        </p>
   <br /><br />
        <h1 style={{fontSize:'20px',fontFamily:'Calibri',fontWeight:'bold'}}>Other Conditions/Restrictions</h1>
        <p style={{fontSize:'19px',fontFamily:'Arial'}}>This Site is intended as aresource and discussion forum for people interested in Ford Mortor Companyvehicles projects and initiatives.Unfortunately,this isn't the place to address warranty or customer
            service quesitions or concerns or products sold by Ford Mortor Company.If you have a question about
            a Ford MortorCompany product,please contact Ford's Customer Relationship Center calling 1 800-392-3673 in the united States or 
            1 800-565-3673 in Canada during normal business hours. </p>
    </div><br /><br />
 
    <Checkbox onChange={onChange}>I accept this terms and conditions</Checkbox> */}
   <div style={{marginLeft:'500px'}}>   <Link to="/">
                            <Button style={{ marginLeft: '50px', width: '100px', padding: '4px' }} type="primary">
                               GO</Button></Link></div>
    </div> 
    
        )
    }
}
export default term;