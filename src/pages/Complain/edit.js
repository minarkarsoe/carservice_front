import React from 'react';
import photo from '../../assets/img/cl.svg';
import photo1 from '../../assets/img/custf.svg';
import photo2 from '../../assets/img/d.svg';
import { Col, Row, Form, Avatar, Buttom, Breadcrumb, Card } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';//date
import { fetchComplain, postComplain } from '../../actions/Complain';
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
            id: this.props.match.params.id,
            data: [],
            machineData: {
                id: "",
                fup: "",
                mod_no: "",
            },
            preview: null,
            loading: false
        };
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                api.put(`complain/${values.id}`, values).then((result) => console.log(result))
                noti('success', 'Successfully!', 'Complain has been updated successfully.')
            } else {
                noti('error', 'Unsuccessfully!', 'Fail to update.')
            }
        });history.push('/complains')
    };

    componentDidMount() {
        this.getData();
        this.getAllComplain();
    }

    getAllComplain() {
        this.props.fetchModel();
        this.props.fetchDepartment();
        this.props.fetchMachine();
    }

    async getData() {
        const response = await api.get(`complain/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;
            this.setState({ data: data, machineData: {id: data.mac_id} })
            this.setInitialValues()
        }
    }

    onChange = (e) => {
        let preview = URL.createObjectURL(e.target.files[0]);

        this.setState({ preview: preview })

    }

    setInitialValues = () => {
        const data = this.state.data;
        const { form } = this.props;
        if (data)
            form.setFieldsValue({
                id: data.id,
                complain_no: data.complain_no,

            });
    };


    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    check = () => {
        this.props.form.validateFields(err => {
            if (!err) {
                console.info('success');
            }
        });
    };
    setInitialValues = () => {
        const data = this.state.data;
        const { form } = this.props;
        if (data)
            form.setFieldsValue({
                id: data.id,
                complain_no: data.complain_no,
                mod_id: data.mod_id,
                mac_id: data.mac_id,
                wyear: data.wyear,
                amount: data.amount,
                workinghr: data.workinghr,
                customer_name: data.customer_name,
                distance: data.distance,
                customer_phno: data.customer_phno,
                location: data.location,
                job_title: data.job_title,
                complain_job_title: data.complain_job_title,
                date: data.date,
                dep_id: data.dep_id,
                description: data.description,
                job_description: data.job_description,


            });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { machineData } = this.state;

        const renderModel = (
            <Select style={{
                width: '200px',
                marginleft: '10px',
                display: 'inline-block'
            }} 
            value={machineData.id}
            placeholder="Please select model no">
                {this.props.machine.map(item => {
                    return <Option value={item.id} key={item.id}>{item.mod_no}</Option>
                })}
            </Select>
        )
        const renderMachine = (
            <Select style={{
                width: '300px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select fup number">
                {this.props.machine.map(item => {
                    return <Option value={item.id} key={item.id}>{item.fup}</Option>
                })}
            </Select>
        )
        const renderDepartment = (
            <Select style={{
                width: '300px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select department">
                {this.props.department.map(item => {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                })}
            </Select>
        )

        const selectBefore = (
            <Select defaultValue="+95" style={{ width: 90 }}>
                <Option value="+95">+95</Option>
                <Option value="+96">+96/</Option>
            </Select>
        );
        
        return (
            <div >

                <h3><div style={{ color: '#4672bb' }}>Edit Complain</div></h3>
                <br></br>
                <div style={{ fontSize: '10.5 px' }}>An expression of dissactisfaction made to an organization related to its products or services or the complaints-handling process itself where a response or resolution is explicity or implicity expected.</div>

                <br></br>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator("id")(<Input type="hidden" />)}
                    </Form.Item>
                    
                    <Card className="ComplainContainer">
                        <img src={photo} style={{ width: '40px', height: '40px', fontSize: '80px', color: 'black', marginRight: '20px' }} /><span className='a1'><b>Complain Information</b></span>
                        <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                            <Row style={{ marginBotton: '40px' }}>
                                <Col span={16}>
                                    <Form.Item label="Complain No">

                                        {getFieldDecorator('complain_no', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }]
                                        })
                                            (<Input placeholder="Please Enter Complain No" style={{ width: '300px' }} />)}

                                    </Form.Item></Col>
                                <Col span={8}>
                                    <Form.Item label="Model no:">
                                        {renderModel}
                                    </Form.Item></Col>
                            </Row>
                            <Row style={{ marginBotton: '20px', marginTop: '20px' }}>
                                <Col span={16}>
                                    <Form.Item label="Warranty:"> {getFieldDecorator('wyear', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Insert Please',
                                            }]
                                    })(<Select
                                        showSearch
                                        style={{ width: 320 }}
                                        placeholder="Choose Warranty Year"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                      >
                                        <Option value="1 year">1 year</Option>
                                        <Option value="2 years">2 years</Option>
                                        <Option value="5 years">5 years</Option>
                                        <Option value="7 years">7 years</Option>
                                        <Option value="10 years">10 years</Option>
                                        <Option value="12 years">12 years</Option>
                                      </Select>)
                                       }
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Working Hour:">
                                        {getFieldDecorator('workinghr', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }]
                                        })
                                            (<Input placeholder="Please Enter Working Hours" style={{ width: '280px' }} />)}
                                    </Form.Item></Col>

                            </Row>
                            <Row style={{ marginBotton: '20px', marginTop: '20px' }}>
                                <Col span={16}>
                                    <Form.Item label="FUP No:">
                                        {getFieldDecorator('mac_id', {
                                            rules: [{ required: true, message: 'Please select machine' }],
                                        })
                                            (renderMachine)
                                        }
                                    </Form.Item>  </Col>

                                <Col span={8}>
                                    <Form.Item label="Warranty Description:">
                                        {getFieldDecorator('description', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }]
                                        })
                                            (<TextArea rows={4} style={{ width: '320px' }} />)}
                                    </Form.Item> </Col>
                            </Row>
                        </div>

                    </Card>
                    <br></br>
                    <br></br>

                    <Card className="ComplainContainer">
                        <img src={photo1} style={{ width: '40px', height: '40px', fontSize: '70px', color: 'black', marginRight: '20px' }} /><span className='a1'><b>Customer Information</b></span>
                        <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                            <Row style={{ marginBotton: '40px', marginTop: '20px' }}>
                                <Col span={16}>
                                    <h3>
                                        <span className="ComplainHeaderSpan">
                                            Customer Name:
                                        </span>
                                    </h3>
                                    {getFieldDecorator('customer_name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Insert Please',
                                            }]
                                    })
                                        (<Input placeholder="Please Enter Customer Name" style={{ width: '280px' }} />)}
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Customer Ph No:">
                                        {getFieldDecorator('customer_phno', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }]
                                        })
                                            (<Input addonBefore={selectBefore} placeholder="please enter your ph no" style={{ width: '300px' }} />)}
                                    </Form.Item> </Col>

                            </Row>

                            <Row style={{ marginBotton: '20px', marginTop: '60px' }}>
                                <Col span={16}>
                                    <Form.Item label="Distance:">
                                        {getFieldDecorator('distance', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }]
                                        })
                                            (<Input placeholder="300 Miles" style={{ width: '280px' }} />)}
                                    </Form.Item> </Col>
                                <Col span={8}>
                                    <Form.Item label="Location:">
                                        {getFieldDecorator('location', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }]
                                        })
                                            (<Input placeholder="Ayeyarwaddy" style={{ width: '300px' }} />)}
                                    </Form.Item> </Col>
                            </Row>

                        </div>




                    </Card>
                    <br></br>
                    <br></br>
                    <Card className="ComplainContainer">
                        <img src={photo2} style={{ width: '40px', height: '40px', fontSize: '70px', color: 'black', marginRight: '20px' }} /><span className='a1'><b>Job Information</b></span>
                        <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                            <Row style={{ marginBotton: '40px', marginTop: '30px' }}>
                                <Col span={16}>
                                    <h3>
                                        <span className="ComplainHeaderSpan">
                                            Job Title:
                                        </span>
                                    </h3>
                                    {getFieldDecorator('job_title', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Insert Please',
                                            }]
                                    })
                                        (<Input placeholder="Service" style={{ width: '280px' }} />)}
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Department:">
                                        {getFieldDecorator('dep_id', {
                                            rules: [{ required: true, message: 'Please select department' }],
                                        })
                                            (renderDepartment)
                                        }
                                    </Form.Item>  </Col>

                            </Row>
                            <Row style={{ marginBotton: '20px', marginTop: '40px' }}>
                                <Col span={16}>
                                    <h3>
                                        <span className="ComplainHeaderSpan">
                                            Complain Job Title:
                                        </span>
                                    </h3>
                                    {getFieldDecorator('complain_job_title', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Insert Please',
                                            }]
                                    })
                                        (<Input placeholder="No Signal" style={{ width: '280px' }} />)}
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Date:">
                                        {getFieldDecorator('date', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }]
                                        })
                                            (<Input placeholder="24/5/2016" style={{ width: '300px' }} />)}
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row style={{ marginBotton: '20px', marginTop: '20px' }}>
                                <Col span={8}>
                                    <Form.Item label=" Description:">
                                        {getFieldDecorator('job_description', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }]
                                        })
                                            (<TextArea placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 5, maxRows: 6 }} style={{ width: '340px' }} />)}
                                    </Form.Item>  </Col>


                            </Row>

                        </div>
                    </Card>
                    <br></br>
                    <br></br>

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
        model: state.model.list,
        department: state.department.list,
        machine: state.machine.list,
    };
}
export default connect(
    mapStateToProps,
    { fetchComplain, postComplain, fetchModel, fetchMachine, fetchDepartment }
)(Complain);
