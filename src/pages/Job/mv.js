import React from 'react'
import { Col, Row, Form, Avatar, Buttom, DatePicker, Select, Input, Radio } from 'antd'
import photo from '../../assets/img/b.svg';
import photo1 from '../../assets/img/b.svg';
import './viewcss.css'

import job from '../../assets/img/b.svg'
import moment from 'moment';
import cl from '../../assets/img/cl.svg';
import ci from '../../assets/img/ci.svg';
import Job from '../../assets/img/job.svg';
import m from '../../assets/img/m.svg';
import { Link, Route } from 'react-router-dom'
import { connect } from "react-redux";
import schedule from '../../assets/img/schedule.svg'

import { fetchComplain } from '../../actions/Complain'

import api from 'apis';

const uuidv4 = require('uuid/v4');


const radioStyle = Radio.style;
const InputGroup = Input.Group;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const Options = [
    {
        value: '',
        label: ''
    }
]

class machineview1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: [],
        }
    }

    componentDidMount() {
        this.getData();
        this.getAllComplain();
    }

    getModelName(id) {
        api.get(`models/${id}`).then(result => this.setState({ model_no: result.data.data.model_no }))

    }

    async  getData() {
        const response = await api.get(`complain/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;
            this.setState({ data: data })
            this.getModelName(data.mod_id)
        }
    }

    getAllComplain() {
        console.log(this.props.fetchComplain())
    }

    getComplainbyId(id) {
        this.props.fetchComplain(id);
    }

    state = {
        startValue: null,
        endValue: null,
        endOpen: false,

    };

    disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = value => {
        this.onChange('startValue', value);
    };

    onEndChange = value => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };
    render() {
        const data = this.state.data;
        const { complain_no, wyear, workinghr, fup_no, description } = this.state.data;
        const { startValue, endValue, endOpen } = this.state;
        function onChange(dates, dateStrings) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        }

        let dataSource = this.props.complain;

        dataSource.map(d => {
            let uuid = uuidv4();
            d.key = uuid;
        })


        return (

            <div>
                <h3><b>View Machine History</b></h3>
                <br></br>
                <div style={{ padding: '40px', width: '1000px', height: '450px', borderWidth: '1px', borderStyle: 'solid', marginLeft: '50px' }}>
                    <span className='c1'><img src={cl} style={{ width: '40px', height: '40px', fontSize: '27px', marginRight: '20px' }} /><b>Complain Information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '60px' }}>

                        <Row>
                            <Col span={14}>
                                <h3>Complain No :</h3>
                                <label>{complain_no}</label>
                            </Col>
                            <Col span={9}>
                                <h3>Model no :</h3>
                                <label style={{ color: 'blue' }}>{this.state.model_no}</label>
                            </Col>

                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row>
                            <Col span={14}>
                                <h3>Warranty :</h3>
                                <label>{wyear}</label>
                            </Col>
                            <Col span={9}>
                                <h3>Warranty Description :</h3>
                                <label>{description}</label>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '20px' }}>
                            <Col span={14}>
                                <h3>FUP No :</h3>
                                <label>{fup_no}</label>
                            </Col>
                            <Col span={9}>
                                <h3>Working Hour :</h3>
                                <label>{workinghr}</label>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        {/* <Row style={{ marginBotton: '15px' }}>
                            <Col span={14}>
                                <h3>Amount:</h3>
                                <label>aaaa</label>
                            </Col>
                        </Row> */}

                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ padding: '40px', width: '1000px', height: '350px', borderWidth: '1px', borderStyle: 'solid', marginLeft: '50px' }}>
                    <span className='c1'> <img src={ci} style={{ width: '40px', height: '40px', marginRight: '20px' }} /><b>Customer Information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '60px' }}>
                        <Row>
                            <Col span={14}>
                                <h3>Customer Name :</h3>
                                <label>{data.customer_name}</label>
                            </Col>
                            <Col span={9}>
                                <h3>Customer Ph No :</h3>
                                <label>{data.customer_phno}</label>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row>
                            <Col span={14}>
                                <h3>Distance :</h3>
                                <label>{data.distance}</label>
                            </Col>
                            <Col span={9}>
                                <h3>Location :</h3>
                                <label>{data.location}</label>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ padding: '40px', width: '1000px', height: '410px', borderWidth: '1px', borderStyle: 'solid', marginLeft: '50px' }}>
                    <span className='c1'><img src={Job} style={{ width: '40px', height: '40px', marginRight: '20px' }} /><b>Job Information</b></span>

                    <div style={{ paddingLeft: '80px', paddingTop: '60px' }}>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={14}>
                                <h3>Job Title :</h3>
                                <label>{data.complain_job_title}</label>
                            </Col>
                            <Col span={9}>
                                <h3>Department :</h3>
                                <label>{data.dep_name}</label>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={14}>
                                <h3>Complain Job Title :</h3>
                                <label>{data.job_title}</label>
                            </Col>
                            <Col span={9}>
                                <h3>Description :</h3>
                                <label>{data.job_description}</label>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={14}>
                                <h3>Date :</h3>
                                <label>{data.date}</label>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ padding: '40px', width: '1000px', height: '700px', borderColor: 'gray', borderWidth: '1px', borderStyle: 'solid', marginLeft: '50px' }}>
                    <span className='c1'><img src={schedule} style={{ width: '40px', height: '40px', marginRight: '20px' }} /><b>Schedule</b></span>

                    <div style={{ paddingLeft: '80px', paddingTop: '60px' }}>

                        <Row>
                            <Col span={14}><div>
                                <h3>Start Date & End Date :</h3>
                                <RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    showTime
                                    format="YYYY/MM/DD HH:mm:ss"
                                    onChange={onChange}
                                /></div>
                            </Col>
                            <Col span={9}>
                                <h3>Service Charge :</h3>
                                <InputGroup compact>
                                    <Select defaultValue="Option1">
                                        <Option value="Option1">MMK</Option>
                                        <Option value="Option2">Dollor</Option>
                                    </Select>
                                    <Input style={{ width: '240px' }} />

                                </InputGroup>

                            </Col>

                        </Row>
                        <div style={{ height: '20px', paddingLeft: '60px', paddingTop: '6px' }}></div>
                        <Row>
                            <Col span={14}>
                                <h3>Amount :</h3>
                                <InputGroup compact>
                                    <Select defaultValue="Option1">
                                        <Option value="Option1">MMK</Option>
                                        <Option value="Option2">Dollor</Option>
                                    </Select>
                                    <Input style={{ width: '280px' }} />

                                </InputGroup>
                            </Col>
                            <Col span={9}>
                                <h3>Inspection :</h3>
                                <Radio.Group onChange={this.onChange} >
                                    <Radio style={radioStyle} value={1}>
                                        Yes
                                </Radio>
                                    <Radio style={radioStyle} value={2}>
                                        No
                                </Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '20px' }}>
                            <Col span={14}>
                                <h3>Watching List :</h3>
                                <Radio.Group onChange={this.onChange}>
                                    <Radio style={radioStyle} value={1}>
                                        Yes
                                </Radio>
                                    <Radio style={radioStyle} value={2}>
                                        No
                                </Radio>
                                </Radio.Group>
                            </Col>
                            <Col span={9}>
                                <h3>Job Title :</h3>
                                <Input style={{ width: '320px', marginLeft: '1px', display: 'inline-block' }} placeholder='Service' />
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '15px' }}>
                            <Col span={14}>
                                <h3>Job Code :</h3>
                                <Input style={{ marginLeft: '10px', display: 'inline-block', width: '350px', margin: '0 300px 8px 0' }} placeholder='1200,000' />
                            </Col>
                            <Col span={9}>
                                <h3>Job Description :</h3>
                                <TextArea rows={4} style={{ width: '320px', height: '100px' }} />
                            </Col>
                        </Row>
                        <Row style={{ marginBotton: '10px' }}>
                            <Col span={14}>
                                <h3>Job Status :</h3>
                                <Input style={{ marginLeft: '10px', display: 'inline-block', width: '350px', margin: '0 300px 8px 0' }} placeholder='Accept' />
                            </Col>
                        </Row>

                    </div>
                </div>
                <div>
                    {/* <button style={{width:'95px',height:'35px',backgroundColor:'#4672bb',color:'white',marginLeft:'420px',marginTop:'60px'}} onClick={() => this.acceptHandler(this.props.match.params.id)} >Accept</button>
                <button style={{width:'95px',height:'35px',backgroundColor:'yellow',color:'red',marginLeft:'20px',marginTop:'60px'}}  onClick={() => this.RejectHandler(this.props.match.params.id)}>Reject</button> */}

                    <Link to={"/job/Views/" + data.id}><button style={{ width: '95px', height: '35px', backgroundColor: '#4672bb', marginLeft: '500px', marginTop: '80px', borderColor: 'gray', color: 'white' }}>Back</button></Link>
                </div>
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
        complain: state.complain.list,
    };
}

export default connect(
    mapStateToProps,
    { fetchComplain }
)(machineview1);
