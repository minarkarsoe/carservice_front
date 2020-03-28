import React from 'react'

import { Select, Breadcrumb } from 'antd';
import { Button, Icon } from 'antd';
import { Divider } from 'antd';
import { Input, Typography } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { fetchModule, postModule } from '../../actions/Module';
// import Button from './button';
import api from 'apis';
import { noti } from 'utils/index';
import { connect } from "react-redux";
const moment = require('moment');
const { Paragraph } = Typography;



const { Option } = Select;
function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}


class EditModule extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            id: this.props.match.params.id,
            data: [],

        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue
                }

                api.put(`modules/${this.state.id}`, values);
                noti('success', 'Successfeully!', 'Machine has been edited successfully.')
            } else {
                noti('error', 'Unsuccessfully!', 'Fail to edit.')
            }
        });
    };

    componentDidMount() {
        this.getData();
        // this.props.fetchMachine();
    }


    async  getData() {
        const response = await api.get(`modules/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;

            this.setState({ data: data })
            this.setInitialValues();
        }
    }

    setInitialValues = () => {
        const data = this.state.data;
        const { form } = this.props;
        if (data)
            form.setFieldsValue({
                mname: data.mname,
                Controller_name: data.Controller_name,
                aname: data.aname,
                remark: data.remark
            });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>User Management</Breadcrumb.Item>
                    <Breadcrumb.Item style={{ color: '#4672bb' }}>Edit Module</Breadcrumb.Item>
                </Breadcrumb>
                <Paragraph>A module provides detailed information about the module and its supported components which is accessible in different manners.</Paragraph>
                <Form onSubmit={this.handleSubmit} >
                    <Card style={{ marginRight: '16px' }}>
                        <Row>
                            <Col span={8}>
                                <Form.Item label="Module No:">
                                    {getFieldDecorator('mname', {
                                        rules: [{
                                            message: 'Please input your FUP!'
                                        }]
                                    })(<Input maxLength={6} placeholder="Enter Module name" />)}
                                </Form.Item>
                            </Col>

                            <Col offset={4} span={8}>
                                <Form.Item label="Controller No:">
                                    {getFieldDecorator('Controller_name', {
                                        rules: [{
                                            message: 'Please input your FUP!'
                                        }]
                                    })(<Input maxLength={6} placeholder="Enter Controller Name" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <Form.Item label="Action:">
                                    {getFieldDecorator('aname', {
                                        rules: [{
                                            message: 'Please input your FUP!'
                                        }]
                                    })(<Input maxLength={6} placeholder="Enter Module name" />)}
                                </Form.Item>
                            </Col>

                            <Col offset={4} span={8}>
                                <Form.Item label="Remark:">
                                    {getFieldDecorator('remark', {
                                        rules: [{
                                            message: 'Please input your FUP!'
                                        }]
                                    })(<Input maxLength={6} placeholder="Enter Controller Name" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Button htmlType="submit" style={{ fontSize: '15', color: 'white', backgroundColor: '#4672bb',marginLeft:'35%',width:'100px' }}>Save</Button>
                        <Link to="/machine"><Button style={{ marginLeft: '10px', color: 'black',width:'100px' }}>Cancel</Button></Link>

                    </Card>


                </Form>
            </div>
        )
    }
}

const editModule = Form.create()(EditModule);

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        // complain: state.complain.list,
        modules: state.module.list,
        // department: state.department.list,
        // machine:state.machine.list,
    };
}
export default connect(
    mapStateToProps,
    { fetchModule, postModule }
)(editModule);