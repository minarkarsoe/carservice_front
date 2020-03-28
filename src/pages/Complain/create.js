import React from 'react'
import {
    Form,
    Breadcrumb,
    Button,
    Input, Select, DatePicker
} from 'antd';
import photo from '../../assets/img/cl.svg';
import photo1 from '../../assets/img/custf.svg';
import photo2 from '../../assets/img/d.svg';
import { Col, Row, Card } from 'antd';
import { connect } from "react-redux";
import api from 'apis';
import { noti } from 'utils/index';
import { fetchComplain, postComplain } from '../../actions/Complain';
import { fetchModel } from '../../actions/model';
import { fetchDepartment } from '../../actions/Department';
import { fetchMachine } from '../../actions/Machine';
import { Link } from 'react-router-dom'
import history from '../../router/history'

const { TextArea } = Input;
const { Option } = Select;

class CreateComplain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            id: this.props.match.params.id,
            machineData: {
                id: '',
                fup_no: '',
                mod_no: '',
            },
            preview: null,
            loading: true
        };

    }

    componentDidMount() {
        this.getAllComplain();
    }

    getAllComplain() {
        this.props.fetchModel();
        this.props.fetchDepartment();
        this.props.fetchMachine();
    }

    handleSubmit = e => {
        const { machineData } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    mac_id: machineData.id,
                    complain_status: 'Active',
                    'date': fieldsValue['date'].format('YYYY-MM-DD')
                }
                console.log(values)
                delete values.mod_id
                api.post('complain', values).then((result) => console.log(result))
                noti('success', 'Successfully!', 'Complain has been created successfully.')

            } else {
                noti('error', 'Unsuccessfully!', 'Fail to Create.')
            }

        }); history.push('/complains')
    };

    _handleChange = (id) => {
        let { machineData } = this.state;
        const data = this.props.machine.find(r => r.id===id)
        machineData.id = data.id
        machineData.fup_no = data.fup
        machineData.mod_no = data.mod_no
        this.setState({ ...this.state, machineData });
    }

    render() {
        const size = this.state.size;
        const { machineData } = this.state;
        const { getFieldDecorator } = this.props.form;

        const renderModel = (
            <Select style={{
                width: '200px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select model no" onChange={this._handleChange}>
                {this.props.machine.map((item, index) => {
                    return <Option key={index} value={item.id}>{item.mod_no}</Option>
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
                    return <Option value={item.id}>{item.name}</Option>
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
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Configuration</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Complain </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{ color: '#4672bb' }}>Create Complain</Breadcrumb.Item>
                </Breadcrumb>
                <h3>Create Complain</h3>

                <p> You can add Complain basic data by entering one by one using the following form.</p>

                <Form onSubmit={this.handleSubmit} >
                    <Card style={{ width: '1050px', height: '800px', borderColor: 'grey', padding: '40px' }}>
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
                                    <Form.Item label="Model no:" >
                                        {getFieldDecorator('mod_id', {
                                            rules: [{ required: true, message: 'Please select model number' }],

                                        })
                                            (renderModel)
                                        }
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
                                    })(
                                        <Select
                                            showSearch
                                            style={{ width: '240px' }}
                                            placeholder="Choose Warranty Year"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.props.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="1 year">1 year</Option>
                                            <Option value="2 years">2 years</Option>
                                            <Option value="5 years">5 years</Option>
                                            <Option value="7 years">7 years</Option>
                                            <Option value="10 years">10 years</Option>
                                            <Option value="12 years">12 years</Option>
                                        </Select>
                                    )}
                                    </Form.Item>
                                </Col>
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
                            <Row style={{ marginBotton: '20px', marginTop: '20px' }}>
                                <Col span={16}>
                                    <Form.Item label="FUP No:">
                                        {/* {getFieldDecorator('mac_id', {
                                            rules: [{ required: true, message: 'Please select machine' }],
                                        })
                                            (renderMachine)
                                        } */}
                                        <Input placeholder=" Enter Amount" style={{ width: '300px' }} value={machineData.fup_no} />
                                    </Form.Item>  </Col>

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
                        </div>
                    </Card>
                    <br></br>
                    <br></br>

                    <Card style={{ width: '1050px', height: '500px', borderColor: 'grey', padding: '40px' }}>
                        <img src={photo1} style={{ width: '40px', height: '40px', fontSize: '70px', color: 'black', marginRight: '20px' }} /><span className='a1'><b>Customer Information</b></span>
                        <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                            <Row style={{ marginBotton: '40px', marginTop: '20px' }}>
                                <Col span={16}>
                                    <h3>Customer Name:</h3>
                                    {getFieldDecorator('customer_name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Insert Please',
                                            }]
                                    })
                                        (<Input placeholder="Please Enter Customer Name" style={{ width: '300px' }} />)}
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
                                            (<Input placeholder="300 Miles" style={{ width: '300px' }} />)}
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
                    <Card style={{ width: '1050px', height: '700px', borderColor: 'grey', padding: '40px' }}>
                        <img src={photo2} style={{ width: '40px', height: '40px', fontSize: '70px', color: 'black', marginRight: '20px' }} /><span className='a1'><b>Job Information</b></span>
                        <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                            <Row style={{ marginBotton: '40px', marginTop: '30px' }}>
                                <Col span={16}>
                                    <h3>Job Title:</h3>
                                    {getFieldDecorator('job_title', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Insert Please',
                                            }]
                                    })
                                        (<Input placeholder="Service" style={{ width: '300px' }} />)}
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
                                    <h3>Complain Job Title:</h3>
                                    {getFieldDecorator('complain_job_title', {

                                        rules: [
                                            {
                                                required: true,
                                                message: 'Insert Please',
                                            }]
                                    })
                                        (<Input placeholder="No Signal" style={{ width: '300px' }} />)}
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Date:" >
                                        {getFieldDecorator('date', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your start date!'
                                            }]
                                        })(
                                            <DatePicker style={{ width: '300px' }}
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
                                        )}
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row style={{ marginBotton: '20px', marginTop: '20px' }}>
                                <Col span={16}>
                                    <Form.Item label=" Description:">
                                        {getFieldDecorator('job_description', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }]
                                        })
                                            (<TextArea placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 5, maxRows: 6 }} style={{ width: '300px' }} />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    <br></br>
                    <br></br>

                    <div>


                        <Button type='primary'
                            htmlType="submit"
                            size={size} style={{ marginLeft: '400px', backgroundColor: '#4672bb', width: '100px', padding: '4px' }}>
                            Submit</Button>
                        <Link to="/complains/">
                            <Button size={size} style={{ marginLeft: '30px', width: '100px', padding: '4px' }}>
                                Cancel</Button></Link>
                    </div>  </Form>
            </div>



        );
    }
}


const Complain = Form.create()(CreateComplain);

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
// function mapStateToProps(state) {
//     return {
//         lang: state.locale.lang,
//         isSignedIn: state.auth.isSignedIn,
//         roleid: state.auth.roleid,
//         isloaded: state.loading.isloaded,
//         position: state.position.list,
//     };
// }

export default connect(
    mapStateToProps,
    { fetchComplain, postComplain, fetchModel, fetchMachine, fetchDepartment }
)(Complain);
