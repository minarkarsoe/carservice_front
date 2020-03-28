import React from 'react'

import {
    Form,
    Breadcrumb,
    Button, Icon,
    Upload, message, Divider,
    Input, Select, DatePicker
} from 'antd';
import { Col, Row, Card } from 'antd';
import { connect } from "react-redux";
import api from 'apis';
import { noti } from 'utils/index';
import { fetchUser, postUser } from '../../actions/User';
import { fetchEmployee } from '../../actions/Employee';
import { Link } from 'react-router-dom'
import history from '../../router/history'
const { TextArea } = Input;
const { Option } = Select;
class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            empData: {
                id: '',
                code: '',
                email: '',
                phone: '',
                nric: ''
            },
            user: null,
            role: null
        };
    }

    componentDidMount() {
        this.getAllData();
        this.getRoles();
    }

    async getRoles() {
        const res = await api.get('/roles');
        console.log(res.data.data)
        this.setState({ ...this.state, role: res.data.data })
    }


    getAllData() {
        this.props.fetchUser();

    }

    handleSubmit = e => {
        const { empData } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {

                    user_id: fieldsValue.user_id,

                    role_id: fieldsValue.role_id,
                    //   created_by : "",
                    //   updated_by : ""
                };
                api.post("user_roles", values).then(result => {
                    if (result) {
                        this.props.form.resetFields();
                    }
                });history.push('/user')
                noti("success", "Successfully!", "User Account has been created successfully.");
            } else {
                noti("error", "Unsuccessfully!", "Fail to Create.");
            }
        });
    };



    render() {


        const { getFieldDecorator } = this.props.form;


        const renderUser = (
            <Select style={{
                width: '240px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select User Name" >
                {this.props.user.map(item => {
                    return <Option value={item.id}>{item.user_name}</Option>
                })}
            </Select>
        )
        const renderRole = (
            <Select style={{
                width: '240px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select Role">
                {this.state.role ? this.state.role.map(item => {
                    return <Option value={item.id}>{item.name}</Option>
                }) : <option value={0}>No Role</option>}
            </Select>
        )

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Configuration</Breadcrumb.Item>

                    <Breadcrumb.Item style={{ color: '#4672bb' }}>Create New User With Role</Breadcrumb.Item>
                </Breadcrumb>
                <h3>Create New User With Role</h3>

                <p>Payment methods used in a modern business context include cash,checks,credits or debit cards,money orders.</p>

                <Form onSubmit={this.handleSubmit} >


                    <Col span={16}>
                        <Form.Item style={{
                            width: '250px',
                            marginLeft: '260px',
                        }} label="User Name:">

                            {getFieldDecorator('user_id', {
                                rules: [{ required: true, message: 'Please select Employee Code' }],
                            })
                                (renderUser)
                            }
                        </Form.Item></Col>
                    <Col span={16}>
                        <Form.Item style={{
                            width: '250px',
                            marginLeft: '260px',
                        }} label="Role:">

                            {getFieldDecorator('role_id', {
                                rules: [{ required: true, message: 'Please select Employee Code' }],
                            })
                                (renderRole)
                            }
                        </Form.Item></Col>

                    <div>


                        <Button type='primary'
                            htmlType="submit" style={{ marginLeft: '400px', backgroundColor: '#4672bb', width: '100px', padding: '4px' }}>
                            Submit</Button>
                        <Link to="/">
                            <Button style={{ marginLeft: '50px', width: '100px', padding: '4px' }}>
                                Cancel</Button></Link>
                    </div>  </Form>
            </div>



        );
    }
}


const User = Form.create()(CreateUser);

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        user: state.user.list,
        role: state.role.list


    };
}


export default connect(
    mapStateToProps,
    { fetchUser, postUser, }
)(User);
