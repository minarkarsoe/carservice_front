import React from 'react'
import { Breadcrumb } from 'antd';
import { Divider } from 'antd';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { Icon } from 'antd';
import api from 'apis';//import { fetchEmployee, putEmployee, postEmployee, deleteEmployee } from '../../actions/Employee'
import { Card, Select } from 'antd';
import { fetchEmployee } from '../../actions/Employee';
import { fetchPosition } from '../../actions/Position';
import { fetchDepartment } from '../../actions/Department';
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom'
import other from '../../assets/img/other.png'
import psn from '../../assets/img/personal.svg'
import job from '../../assets/img/job.svg'
import contact from '../../assets/img/contact.svg'
import parent1 from '../../assets/img/parentinformation.svg'
import { Input } from 'antd';
import { Form, Checkbox } from 'antd';
import photo2 from '../../assets/img/s.svg';
import './acceptcss.css';
import { getUserInfo } from '../../utils'
// import { Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { noti } from 'utils/index';
const { Meta } = Card;
const apiUrl = "http://localhost:9991/"

const { Option } = Select;
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const InputGroup = Input.Group;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            id: this.props.match.params.id,
            data: [],
            preview: null,
            loading: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                }
                api.put(`employees/${values.id}`, values).then((result) => console.log(result))
                // this.props.history.push('/')
                noti('success', 'Successfully!', 'Emp has been updated successfully.')
            } else {
                noti('error', 'Unsuccessfully!', 'Fail to update.')
            }
        });
    };

    componentDidMount() {

        console.log("Date", this.getData());
        this.getAllEmployee();

    }
    getAllEmployee() {
        this.props.fetchPosition();
        this.props.fetchDepartment();
    }

    async getData() {
        const response = await api.get(`employees/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;
            console.log(data);

            let imgUrl = data.image ? apiUrl + data.image : '';
            this.setState({ data: data, preview: imgUrl })
            this.setInitialValues()
        }
    }
    setInitialValues = () => {
        const data = this.state.data;
        const { form } = this.props;
        if (data)
            form.setFieldsValue({
                id: data.id,
                name: data.name,
                phone: data.phone,
                parmanent_address: data.parmanent_address,
                temporary_address: data.temporary_address,
            });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const data = this.state.data;
        console.log();
        const prefixSelector = getFieldDecorator('phone', {
            initialValue: '95',
        })(
            <Select style={{ width: 70 }}>
                <Option value="01">+01</Option>

            </Select>,
        );
      
        return (
            <div>
                <Breadcrumb>

                    <Breadcrumb.Item style={{ color: '#4672bb' }}>View Service Man</Breadcrumb.Item>
                </Breadcrumb><br />
                <Breadcrumb>
                    <Breadcrumb.Item style={{ marginLeft: '30px' }}>A person who works is the maintainance and repair of equipment. </Breadcrumb.Item>
                </Breadcrumb><br />
                <h1><img src={photo2} style={{ width: '40px', height: '40px', fontSize: '70px', color: 'black', marginLeft: '40px' }}></img> Service Man Information</h1>


                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator("id")(<Input type="hidden" />)}
                    </Form.Item>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="serviceman image"
                            src={apiUrl + data.image} />
                        }
                    >
                    </Card>

                    <br /><br />


                    <div style={{ borderStyle: 'hidden', height: '250px', padding: '8px', marginLeft: '30px' }}>
                        <span className='c1'><img src={psn} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Personal Information</b></span>
                        <div style={{ height: '20px' }}></div>
                        <div >
                            <Row>
                                <Col span={13}>
                                    <h4>Code :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.code}</label>
                                </Col>
                                <Col span={7}>
                                    <Form.Item style={{
                                        width: '300px',
                                        margin: '0 300px 8px 0', display: 'inline-block'
                                    }} label="Name:">

                                        {getFieldDecorator('name', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }
                                            ]
                                        })(<Input style={{ marginLeft: '10px', display: 'inline-block' }}
                                            defaultplaceholder='Kyawsoeye' />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col span={13}>
                                    <h4>NRIC :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.nric}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>Date Of Birth :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.dob}</label>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div style={{ borderStyle: 'hidden', height: '250px', padding: '8px', marginLeft: '30px' }}>
                        <span className='c1'><img src={job} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Job Information</b></span>
                        <div style={{ height: '20px' }}></div>
                        <div >
                            <Row>
                                <Col span={13}>
                                    <h4>Position :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.posname}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>Department :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.depname}</label>
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col span={13}>
                                    <h4>Start Date :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.start_date}</label>
                                </Col>
                            </Row>
                        </div>
                    </div>


                    <div style={{ borderStyle: 'hidden', height: '250px', padding: '8px', marginLeft: '30px' }}>
                        <span className='c1'><img src={contact} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Contact Information</b></span>
                        <div style={{ height: '20px' }}></div>
                        <div >
                            <Row>
                                <Col span={13}>
                                    <h4>Email :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.email}</label>
                                </Col>
                                <Col span={7}>
                                    <Form.Item style={{
                                        width: '300px',
                                        margin: '0 300px 8px 0',
                                        display: 'inline-block'
                                    }} label="Phone No:">
                                        {getFieldDecorator('phone', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please',
                                                }]
                                        })(<Input addonBefore={prefixSelector} style={{ marginLeft: '10px', display: 'inline-block' }}
                                            placeholder='45004463' />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col span={13}>
                                    <Form.Item style={{
                                        width: '300px',
                                        margin: '0 300px 8px 0', display: 'inline-block'
                                    }} label="Permanent Address:">

                                        {getFieldDecorator('parmanent_address', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please ',
                                                }
                                            ]
                                        })(<Input style={{ marginLeft: '10px', display: 'inline-block' }}
                                            placeholder='No 5A,Building 6,Sample Street,Dagon,Ygn ' />)}
                                    </Form.Item>
                                </Col>
                                <Col span={7}>
                                    <Form.Item style={{
                                        width: '300px',
                                        margin: '0 300px 8px 0', display: 'inline-block'
                                    }} label="Temporary Address:">

                                        {getFieldDecorator('temporary_address', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Insert Please ',
                                                }
                                            ]
                                        })(<Input style={{ marginLeft: '10px', display: 'inline-block' }}
                                            placeholder='No 5A,Building 6,Sample Street,Dagon,Ygn ' />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </div>






                    <div style={{ height: '200px', padding: '8px', marginLeft: '30px' }}>
                        <span className='c1'><img src={parent1} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Parent Information</b></span>
                        <div style={{ height: '20px' }}></div>
                        <div >
                            <Row>
                                <Col span={13}>
                                    <h4>Father Name :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.father_name}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>Mother Name :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.mother_name}</label>
                                </Col>
                            </Row>
                        </div>
                    </div>


                    <div style={{ borderStyle: 'hidden', height: '200px', padding: '8px', marginLeft: '30px' }}>
                        <span className='c1'><img src={other} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Other Information</b></span>
                        <div style={{ height: '20px' }}></div>
                        <div >
                            <Row>
                                <Col span={13}>
                                    <h4>Education :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.education}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>Social Media Link :</h4>
                                    <label style={{ color: '#4672bb' }}>{data.social_media_link}</label>
                                </Col>
                            </Row>

                        </div>
                    </div>


                    <div>

                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit"
                                    style={{ marginLeft: '30px', backgroundColor: '#4672bb', width: '100px', padding: '4px' }}>
                                    Edit
</Button>


                                <Link to="/schedule">
                                    <Button
                                        style={{ marginLeft: '50px', width: '100px', padding: '4px' }}>
                                        Cancel</Button></Link></Form.Item></Form>

                    </div> </Form>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        position: state.position.list,
        department: state.department.list,
    };
}
const ProfileV = Form.create()(Profile);
export default connect(
    mapStateToProps,
    { fetchEmployee, fetchPosition, fetchDepartment }
)(ProfileV);