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
import { fetchCpl, postCpl } from '../../actions/Cpl';
import {fetchComplain} from '../../actions/Complain';
import {fetchSchedule} from '../../actions/Schedule';
import { Link } from 'react-router-dom'

const { TextArea } = Input;
const { Option } = Select;
class CreateCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
          data: [],
          loading: false,
          compData: {
            id: '',
            compo: '',
            customer_name:''
        },
        };
      }

    componentDidMount() {
        this.getAllCpl();
    }
    getAllCpl() {
        this.props.fetchCpl();
        this.props.fetchComplain();
        this.props.fetchSchedule();
    }
    handleSubmit = e => {
        const { compData } = this.state;
        console.log(compData)
        e.preventDefault();
        this.props.form.validateFieldsAndScrodata.ll((err, fieldsValue) => {
            if (!err) {
                const values = {
                  schedule_id : compData.schedule_id,
                  invoice : fieldsValue.invoice,
                  ammount : fieldsValue.ammount,
                  schedule_status : "Completed",
                  paymentdate:fieldsValue.paymentdate,
                  created_by : "",
                  updated_by : ""
                };
                // delete values.schedule_id
                 delete values.schedule_status
            api.post("customerpayment", values).then(result => {
              if (result) {
                this.props.form.resetFields();

              }
            });
            noti("success", "Successfully!", "'Customer Payment Lists has been created successfully.");
          } else {
            noti("error", "Unsuccessfully!", "Fail to Create.");
          }
        });
      };
      _handleChange= (data) =>{
        let { compData } = this.state;
        compData.schedule_id = data.id;
        compData.compo = data.compo;
        compData.customer_name = data.customer_name;
        this.setState({...this.state, compData});
        console.log(compData);
    }
   


    render() {
        const renderComplain = (
            <Select style={{
                width: '240px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select department" onChange={this._handleChange}>
                {this.props.schedules.map((item, index) => {
                    return <Option key={index} value={item}>{item.compo}</Option>
                })}
            </Select>
        )
        const { getFieldDecorator } = this.props.form;
        const { compData } = this.state;

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Configuration</Breadcrumb.Item>

                    <Breadcrumb.Item style={{ color: '#4672bb' }}>Create Customer Payment Lists</Breadcrumb.Item>
                </Breadcrumb>
                <h3>Create Customer Payment Lists</h3>

                <p>Payment methods used in a modern business context include cash,checks,credits or debit cards,money orders.</p>

                <Form onSubmit={this.handleSubmit} >

                    <Col span={16}>
                        <Form.Item label="Customer Name:">

                           
                                <Input placeholder="Enter Name" style={{ width: '300px' }} value={compData.customer_name} />

                        </Form.Item></Col>
                    <Col span={16}>
                        <Form.Item label="Complain No">

                        {getFieldDecorator('schedule_id', {
                                    rules: [{ required: true, message: 'Please select department' }],
                                })
                                    (renderComplain)
                                }

                        </Form.Item></Col>
                    <Col span={16}>
                        <Form.Item label="Invoice No:">
                            {getFieldDecorator('invoice', {
                                rules: [{ required: true, message: 'Insert Please' }],
                            })
                                (<Input placeholder=" Enter Invoice No" style={{ width: '300px' }} />)}
                            
                            </Form.Item></Col>

                    <Col span={16}>
                        <Form.Item label="Amount:">
                            {getFieldDecorator('ammount', {
                                rules: [{ required: true, message: 'Insert Please' }],
                            })
                                (<Input placeholder=" Enter Amount" style={{ width: '300px' }} />)}
                            
                            </Form.Item></Col>
                    <Col span={16}>
                        <Form.Item label="Payment Date:">
                            {getFieldDecorator('paymentdate', {
                                rules: [{ required: true, message: 'Insert Please' }],
                            })
                            (
                                <DatePicker
                                    dateRender={current => {
                                        const style = {};
                                        if (current.date() === 1) {
                                            style.border = '1px solid #1890ff';
                                            style.borderRadius = '50%';
                                        }
                                        return (
                                            <div className="ant-calendar-date" style={style}>
                                                {current.date()}
                                            </div>
                                        );
                                    }}
                                />
                            )} </Form.Item></Col>
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


const Cpl = Form.create()(CreateCustomer);

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        cpl: state.cpl.list,
        complain: state.complain.list,
        schedules: state.schedule.list,
    
    };
}


export default connect(
    mapStateToProps,
    { fetchCpl, postCpl,fetchComplain,fetchSchedule}
)(Cpl);
