import React from 'react'

import {
    Form,
    Breadcrumb,
    Button,
    Input, Select
} from 'antd';
import { Col, Row } from 'antd';
import { connect } from "react-redux";
import api from 'apis';
import { noti } from 'utils/index';
import { fetchUser, postUser } from '../../actions/User';
import { fetchEmployee } from '../../actions/Employee';
import { Link } from 'react-router-dom'
import history from '../../router/history'
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
            role: null
        };
    }

    componentDidMount() {
        this.getAllData();
    }

    getAllData() {
        this.props.fetchUser();
        this.props.fetchEmployee();
    }

    handleSubmit = e => {
        const { empData } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err && fieldsValue.password === fieldsValue.cpassword) {
                const values = {
                    e_id: empData.id,
                    user_name: fieldsValue.user_name,
                    password_hash: fieldsValue.password,
                    email: empData.email,
                    created_by: "",
                    updated_by: ""
                };
                api.post("users", values).then(result => {
                    if (result) {
                        this.props.form.resetFields();
                    }
                }); history.push('/userrole/create')
                noti("success", "Successfully!", "User has been created successfully.");
            } else {
                noti("error", "Password Do not match!", "Fail to Create.");
            }
        });
    };

    _handleChange = (id) => {

        const data = this.props.employees.find(r=> r.id === id)
        let { empData } = this.state;
        empData.id = data.id;
        empData.code = data.code;
        empData.email = data.email;
        empData.phone = data.phone;
        empData.nric = data.nric;
        this.setState({ ...this.state, empData });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { empData } = this.state;

        const renderEmployee = (
            <Select style={{
                width: '300px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select Employee code" onChange={this._handleChange}>
                {this.props.employees.map(item => {
                    return <Option value={item.id}>{item.code}</Option>
                })}
            </Select>
        )
        const prefixSelector = getFieldDecorator('phone', {
            initialValue: '86',
        })(
            <Select style={{ width: "40px" }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Configuration</Breadcrumb.Item>

                    <Breadcrumb.Item style={{ color: '#4672bb' }}>Create New User</Breadcrumb.Item>
                </Breadcrumb>
                <h3>Create New User</h3>

                <p>Payment methods used in a modern business context include cash,checks,credits or debit cards,money orders.</p>

                <Form onSubmit={this.handleSubmit} style={{padding: '20px 100px', backgroundColor: 'white'}}>
                    <Col span={12}>
                        <Form.Item label="User Name:">

                            {getFieldDecorator('user_name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Insert Please',
                                    }]
                            })
                                (<Input style={{ width: '300px' }} />)}

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Password">
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Insert Please',
                                    }]
                            })
                                (<Input type="password" placeholder=" Enter Complain No" style={{ width: '300px' }} />)
                            }
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Comfirm Password:">
                            {getFieldDecorator('cpassword', {
                                rules: [{ required: true, message: 'Insert Please' }],
                            })
                                (<Input type="password" placeholder=" Enter Invoice No" style={{ width: '300px' }} />)}

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item style={{
                            width: '260px',
                            marginLeft: '0.5px',
                        }} label="Code:">

                            {getFieldDecorator('e_id', {
                                rules: [{ required: true, message: 'Please select Employee Code' }],
                            })
                                (renderEmployee)
                            }
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="NRIC:">
                            <Input placeholder=" Enter Amount" style={{ width: '300px' }} value={empData.nric} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email:">
                            <Input placeholder=" Enter Amount" style={{ width: '300px' }} value={empData.email} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Phone No:">
                            <Input style={{
                                marginLeft: '1px',
                                width: '300px'
                            }} addonBefore={prefixSelector} placeholder="0 0000 0000" value={empData.phone} />
                        </Form.Item>
                    </Col>
                    <br/>
                    <br/>
                    <br/>
                    <div span={24} style={{display: 'flex', justifyContent:'center', width: '100%'}}>
                        <Button type='primary'
                            htmlType="submit" >
                            Submit</Button>&emsp;
                        <Link to="/user/">
                            <Button>
                                Cancel
                            </Button>
                        </Link>
                    </div>  
                </Form>
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
        employees: state.employee.list,


    };
}


export default connect(
    mapStateToProps,
    { fetchUser, postUser, fetchEmployee }
)(User);
