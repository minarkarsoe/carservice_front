import React from 'react';
//component
import { Table, Divider, Tag } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
// import EditableTable from '../../components/InlineCustomTable/CustomTable';
// import Can from '../../../src/utils/Can';
// import Forbidden from '../Forbidden';
// import './index.css';
import { fetchAssign, putAssign, postAssign, deleteAssign } from '../../actions/Assign';
import { connect } from "react-redux";
import { Button } from 'antd';
import { Input, Popconfirm } from 'antd';
import { PageHeader, Typography } from 'antd';
import { Link, Route } from 'react-router-dom'
import { Select, Icon } from 'antd';
import { fetchComplain, putComplain, postComplain, deleteComplain } from '../../actions/Complain'
import { fetchMachines, fetchMachine, putMachine, postMachine, deleteMachine } from '../../actions/Machine';
import { fetchServices } from '../../actions/Service';
import api from 'apis';
import history from '../../router/history'
import { Checkbox } from 'antd';
// import getTime from './get_time'
const uuidv4 = require('uuid/v4');
const { Option } = Select;
const Search = Input.Search;
const { Paragraph } = Typography;

class rolePermission extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            data: []
        }
    }
    componentDidMount() {
        this.getAllComplain();
    }

    getAllComplain() {
        console.log(this.props.fetchComplain())
    }

    getComplainbyId(id) {
        this.props.fetchComplain(id);
    }
    // to delete assign
    btnClickAdd = () => {
        history.push('/assign/view')
    }

    delete = key => {
        const newData = this.props.assign;
        const index = newData.findIndex(item => key === item.key);
        const item = newData[index];

        this.deleteAssign(item.id);
        // message.success('Deleted !');
    };

    deleteAssign = (id) => {
        this.props.deleteAssign(id);
    }


    // RejectHandler = async(id) => {
    //     const data = await api.get(`complain/${id}`)
    //                     .then(result => result.data.data)
    //     let complain = {...data}
    //     complain.status = "REJECT"
    //     complain.created_at = getTime
    //     complain.updated_at = getTime
    //     console.log(complain)
    //     api.put(`complain/${id}`, complain).then(() => this.getAllComplain())
    // }

    // acceptHandler = async(id) => {
    //     let path = `/assign/accept/${id}`
    //     const data = await api.get(`complain/${id}`)
    //                     .then(result => result.data.data)
    //     let complain = {...data}
    //     complain.status = "ACCEPT"
    //     complain.created_at = getTime
    //     complain.updated_at = getTime
    //     console.log(complain)
    //     api.put(`complain/${id}`, complain).then(() => this.getAllComplain()).then(() => this.props.history.push(path))
    // }
    render() {
        function onChange(e) {
            console.log(`checked = ${e.target.checked}`);
        }
        return (
            <div>
                <div>
                    <h3 style={{ color: '#4872bb' }}>Role</h3><br />

                    <Paragraph>A role description explains the work an employee is expected to perform.
                  It covers the activities and accountability of the person who fills the role as well as the skills, knowledge and characteristics required.</Paragraph><br />
                    <h3><b>Permission</b></h3><br />
                    <h3>Controller Name</h3>
                    <Select style={{ marginLeft: '10px', display: 'inline-block', width: '20%', height: '10%', margin: '0 300px 8px 0' }} placeholder='Yamin Oo' color='blue'>
                        <Option value="1">Aye Aye</Option>
                        <Option value="2">Mya Mya</Option>
                        <Option value="3">Hla Hla</Option>
                        <Option value="4">Ko Ko</Option>
                        <Option value="5">Nyi Nyi</Option>
                    </Select>

                </div><br />
                <div style={{ width: '200px', height: '300px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#4672bb' }}>
                    <h4 style={{ marginLeft: '30px', marginTop: '20px' }}><b>Action</b></h4><br />
                    <div style={{ marginLeft: '30px', borderColor: 'black' }}>
                        <Checkbox onChange={onChange} style={{borderColor:'black'}}>View</Checkbox><br /><br />
                        <Checkbox onChange={onChange}>Edit</Checkbox><br /><br />
                        <Checkbox onChange={onChange}>Delete</Checkbox><br /><br />
                        <Checkbox onChange={onChange}>Accept</Checkbox><br /><br />
                        <Checkbox onChange={onChange}>Reject</Checkbox><br /><br />
                    </div>
                    </div>
                    <div>
                    <Link to="/role/" ><button  style={{width:'100px',height:'35px',backgroundColor:'#4672bb',marginLeft:'400px',marginTop:'80px',borderRadius:'5px',color:'white'}}>Submit</button></Link>
                     <Link to="/role/" ><button  style={{width:'100px',height:'35px',backgroundColor:'white',marginLeft:'10px',borderRadius:'5px',color:'black'}}>Cancel</button></Link>
                    </div>
                
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        // assigns: state.assign.list,
        complain: state.complain.list,
    };
}
export default connect(
    mapStateToProps,
    { fetchComplain, postComplain, putComplain, deleteComplain }
)(rolePermission);
