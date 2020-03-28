import React from 'react';
import photo from '../../assets/img/cl.svg';
import photo1 from '../../assets/img/custf.svg';
import photo2 from '../../assets/img/d.svg';
import { Col, Row, Form, Avatar, Buttom, Breadcrumb, Card } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';//date
import { fetchComplain, postComplain } from '../../actions/Complain';
import { fetchCpl, putCpl } from '../../actions/Cpl';
import { fetchModel } from '../../actions/model';
import { fetchDepartment } from '../../actions/Department';
import { fetchMachine } from '../../actions/Machine';
import { Select } from 'antd';
import './view.css';
import { Button } from "antd";
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom'
import history from '../../router/history'
import api from 'apis';
import { noti } from 'utils/index';

const { TextArea } = Input;
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

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            data: [],
            compData: {
                id: '',
                cmplain_no: '',
                customer_name:''
            },
            preview: null,
            loading: false
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                api.put(`customerpayment/${values.id}`, values).then((result) => console.log(result))
                noti('success', 'Successfully!', 'Complain has been updated successfully.')
            } else {
                noti('error', 'Unsuccessfully!', 'Fail to update.')
            }
        });history.push('/complains')
    };

    componentDidMount() {
        this.getData();
        this.getAllCpl();
    }

    getAllCpl() {
        this.props.fetchCpl();
        this.props.fetchComplain();
    }

    async getData() {
        const response = await api.get(`customerpayment/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;
            this.setState({ data: data, compData: {id: data.comp_id} })
            this.setInitialValues()
        }
    }

    setInitialValues = () => {
        const data = this.state.data;
        const { form } = this.props;
        if (data)
            form.setFieldsValue({
                id: data.id,
                comp_id: data.comp_id,
                invoice: data.invoice,
                ammount: data.ammount,
                paymentdate: data.paymentdate
            });
    };

    _handleChange= (data) =>{
        let { compData } = this.state;
        compData.id = data.id;
        compData.complain_no = data.complain_no;
        compData.customer_name = data.customer_name;
        this.setState({...this.state, compData});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { compData } = this.state;

        const renderComplain = (
            <Select style={{
                width: '240px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select department" onChange={this._handleChange}>
                {this.props.complain.map((item, index) => {
                    return <Option key={index} value={item}>{item.complain_no}</Option>
                })}
            </Select>
        )
        
        return (
            <div >

                <h3><div style={{ color: '#4672bb' }}>Edit Customer Payment List</div></h3>
                <br></br>
                <div style={{ fontSize: '10.5 px' }}>An expression of dissactisfaction made to an organization related to its products or services or the complaints-handling process itself where a response or resolution is explicity or implicity expected.</div>

                <br></br>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator("id")(<Input type="hidden" />)}
                    </Form.Item>
                    <Col span={16}>
                        <Form.Item label="Customer Name:">

                            {getFieldDecorator('customer_name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Insert Please',
                                    }]
                            })
                                (<Input placeholder="Enter Name" style={{ width: '300px' }} value={compData.customer_name}  />)}

                        </Form.Item></Col>
                    <Col span={16}>
                        <Form.Item label="Complain No">

                            {getFieldDecorator('complain_no', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Insert Please',
                                    }]
                            })
                                (renderComplain)}

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

                        {/* <Form {...formItemLayout} onSubmit={this.handleSubmit}>
<Form.Item {...tailFormItemLayout}> */}
                        <Button type="primary" htmlType="submit"
                            style={{ marginLeft: '400px', backgroundColor: '#4672bb', width: '100px', padding: '4px' }}>
                            Save
</Button>


                        <Button
                            style={{ marginLeft: '50px', width: '100px', padding: '4px' }}><Link to="/complains/">
                                Cancel</Link></Button>
                        {/* </Form.Item>
</Form> */}

                    </div></Form>
                <br />


            </div>
        )
    }
}

const Complain = Form.create()(Edit);

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        complain: state.complain.list,
        cpl: state.cpl.list
    };
}
export default connect(
    mapStateToProps,
    { fetchComplain, postComplain, fetchCpl, putCpl }
)(Complain);
