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
import { fetchUser, postUser, putUser } from '../../actions/User';
import { fetchEmployee } from '../../actions/Employee';
import { Link } from 'react-router-dom'

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
        this.props.fetchEmployee();
    }
    async getData() {
        const response = await api.get(`users/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;
            console.log(data);


            this.setState({ data: data })
            this.setInitialValues()
        }
    }

    handleSubmit = e => {
        const { empData } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    e_id: empData.id,
                    user_name: fieldsValue.user_name,
                    password_hash: fieldsValue.password,
                    r_id: fieldsValue.r_id,
                    created_by: "",
                    updated_by: ""
                };
                api.put(`users/${values.id}`, values).then(result => {
                    if (result) {
                        this.props.form.resetFields();
                    }
                });
                noti("success", "Successfully!", "Machine has been created successfully.");
            } else {
                noti("error", "Unsuccessfully!", "Fail to Create.");
            }
        });
    };

    _handleChange = (data) => {
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
                width: '240px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select Employee code" onChange={this._handleChange}>
                {this.props.employees.map(item => {
                    return <Option value={item}>{item.code}</Option>
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
        const prefixSelector = getFieldDecorator('phone', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
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

                <Form onSubmit={this.handleSubmit} >

                    <Col span={16}>
                        <Form.Item label="User Name:">

                            {getFieldDecorator('user_name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Insert Please',
                                    }]
                            })
                                (<Input placeholder="Enter Name" style={{ width: '300px' }} />)}

                        </Form.Item></Col>
                    <Col span={16}>
                        <Form.Item label="Password">

                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Insert Please',
                                    }]
                            })
                                (<Input placeholder=" Enter Complain No" style={{ width: '300px' }} />)}

                        </Form.Item></Col>
                    <Col span={16}>
                        <Form.Item label="Comfirm Password:">
                            {getFieldDecorator('cpassword', {
                                rules: [{ required: true, message: 'Insert Please' }],
                            })
                                (<Input placeholder=" Enter Invoice No" style={{ width: '300px' }} />)}

                        </Form.Item></Col>

                    <Col span={16}>
                        <Form.Item style={{
                            width: '250px',
                            marginLeft: '260px',
                        }} label="Code:">

                            {getFieldDecorator('e_id', {
                                rules: [{ required: true, message: 'Please select Employee Code' }],
                            })
                                (renderEmployee)
                            }
                        </Form.Item></Col>
                    <Col span={16}>
                        <Form.Item style={{
                            width: '250px',
                            marginLeft: '260px',
                        }} label="Role:">

                            {getFieldDecorator('r_id', {
                                rules: [{ required: true, message: 'Please select Employee Code' }],
                            })
                                (renderRole)
                            }
                        </Form.Item></Col>
                    <Col span={16}>
                        <Form.Item label="NRIC:">
                            <Input placeholder=" Enter Amount" style={{ width: '300px' }} value={empData.nric} /></Form.Item></Col>
                    <Col span={16}>
                        <Form.Item label="Email:">
                            <Input placeholder=" Enter Amount" style={{ width: '300px' }} value={empData.email} /></Form.Item>
                    </Col>
                    <Form.Item style={{
                        width: '230px',

                        marginLeft: '200px',

                    }}
                        label="Phone No:">
                        <Input style={{
                            marginLeft: '1px',
                            width: '240px'
                        }} addonBefore={prefixSelector} placeholder="0 0000 0000" value={empData.phone} />
                    </Form.Item>
                    <div>


                        <Button type='primary'
                            htmlType="submit" style={{ marginLeft: '400px', backgroundColor: '#4672bb', width: '100px', padding: '4px' }}>
                            Submit</Button>
                        <Link to="/cpls/">
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
        employees: state.employee.list,


    };
}


export default connect(
    mapStateToProps,
    { fetchUser, postUser, putUser, fetchEmployee }
)(User);
