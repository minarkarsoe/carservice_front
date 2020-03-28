import React from 'react'
import { Row, Col, Icon, Input, Select,Button } from 'antd';
import photo from '../../assets/img/cl.svg';
import job from '../../assets/img/job.svg';
import machine from '../../assets/img/m.svg';
import photo1 from '../../assets/img/custf.svg';
import ScrollTable from './CustomScrollTable';
import history from '../../router/history'
import api from 'apis';
import { connect } from "react-redux";
import moment from 'moment'
import {getUserInfo} from '../../utils'


class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            complain: null,
            schedule: null,
            employeelist: [],
            complainlist: [],
            loading: true,
        }
    }

    componentDidMount() {
        this.getData();
        this.getComplainlist();
        console.log(getUserInfo());
    }

    async getData() {
        const response = await api.get(`schedule/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;
            const complain = await api.get(`complain/${data.comp_id}`);
            const employees = await api.get(`employeeschedule/${data.id}`);
            this.setState({ schedule: data, complain: complain.data.data, employeelist: employees.data.data, loading: false })
        }
    }
    async getComplainlist() {
        const response = await api.get(`complain`);
        if (response && response.status == 200) {
            this.setState({ complainlist: response.data.data });
        }
    }

    async startJob() {
        let { schedule } = this.state;
        if (schedule.schedule_status === "Assigned") {
            schedule.schedule_status = "On Going";
        } else if (schedule.schedule_status === "On Going") {
            schedule.schedule_status = "Job Done";
        }
        schedule.created_at = moment(schedule.created_at).format('YYYY/MM/DD')
        schedule.updated_at = moment(schedule.updated_at).format('YYYY/MM/DD')
        delete schedule.compo
        delete schedule.complain_job_title
        delete schedule.mno
        delete schedule.amount
        delete schedule.customer_name
        delete schedule.customer_phno
        delete schedule.distance
        delete schedule.location
        delete schedule.date
        delete schedule.description
        delete schedule.j_description
        delete schedule.model_number
        delete schedule.mod_id
        api.put(`schedule/${schedule.id}`, schedule);
        history.push('/job')
    }

    render() {
        const { complain, loading, complainlist, schedule } = this.state;
        if (loading) return (<div></div>);

        const dataSource = complainlist;

        const { workinghr, mod_no, complain_no, dep_name,
            fup_no,
            wyear,
            description,
            customer_phno,
            customer_name,
            distance,
            job_title,
            date,
            amount,
            complain_job_title,
            job_description, location } = complain;

        const columns = [
            {
                title: 'Model No',
                dataIndex: 'mod_no',
                align:'center'
            },
            {
                title: 'FUP No',
                dataIndex: 'fup_no',
                align:'center'
            },
            {
                title: 'Complain No',
                dataIndex: 'complain_no',
                align:'center'
            },
            {
                title: 'Date',
                dataIndex: 'date',
                align:'center'
            },
            {
                title: 'Status',
                dataIndex: 'complain_status',
                align:'center'
            },
        ];
        return (
            <div >
                <h3 style={{ color: 'blue' }}>Assign Schedule</h3>
                <h4>
                    An expression of dissatisfaction made to an organization related to its products or
                    View services or the complains -handling processs itself where a response or resolution is
                    explicity or implicity expected.
                </h4>
                <br></br>
                <div style={{ padding: "20px", width: '100%', borderWidth: '1px', borderStyle: 'solid' }}>
                    <span className='c1'> <img src={photo} style={{ width: '40px', height: '40px', fontSize: '40px', marginRight: '20px' }} /><b>Complain information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>

                        <Row>
                            <Col span={16}>
                                <h3>Complain No:</h3>
                                <span>{complain_no}</span>
                            </Col>
                            <Col span={7}>
                                <h3>Model no:</h3>
                                <span>{mod_no}</span>
                            </Col>

                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row>
                            <Col span={16}>
                                <h3>Warranty:</h3>
                                <span>{wyear}</span>
                            </Col>
                            <Col span={4}>
                                <h4>Warranty Description:</h4>
                                <span>{description}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '20px' }}>
                            <Col span={16}>
                                <h3>FUP No:</h3>
                                <span>{fup_no}</span>
                            </Col>
                            <Col span={8}>
                                <h3>Working Hour:</h3>
                                <span>{workinghr}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '15px' }}>
                            <Col span={16}>
                                <h3>Amount:</h3>
                                <span>{amount}</span>
                            </Col>
                        </Row>

                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ padding: '20px', width: '100%', borderWidth: '1px', borderStyle: 'solid' }}>
                    <span className='c1'><img src={photo1} style={{ width: '40px', height: '40px', marginRight: '20px' }} /><b>Customer Information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                        <Row>
                            <Col span={16}>
                                <h3>Customer Name:</h3>
                                <span>{customer_name}</span>
                            </Col>
                            <Col span={8}>
                                <h3>Customer Ph No:</h3>
                                <span>{customer_phno}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row>
                            <Col span={16}>
                                <h3>Distance:</h3>
                                <span>{distance}</span>
                            </Col>
                            <Col span={8}>
                                <h3>Location:</h3>
                                <span>{location}</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ padding: '20px', width: '100%', borderWidth: '1px', borderStyle: 'solid' }}>
                    <span className='c1'><img src={job} style={{ width: '40px', height: '40px', marginRight: '20px' }} /><b>Job Information</b></span>

                    <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={16}>
                                <h3>Job Title:</h3>
                                <span>{complain_job_title}</span>
                            </Col>
                            <Col span={8}>
                                <h3>Department:</h3>
                                <span>{dep_name}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={16}>
                                <h3>Complain Job Title:</h3>
                                <span>{job_title}</span>
                            </Col>
                            <Col span={8}>
                                <h3>Description:</h3>
                                <span>{job_description}</span>
                            </ Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={16}>
                                <h3>Date:</h3>
                                <span>{date}</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ padding: '20px', width: '100%', borderWidth: '1px' }}>
                    <span className='c1'><img src={machine} style={{ width: '40px', marginRight: '20px' }} /><b>Machine History</b></span>
                    <div style={{  textAlign: 'center' }}>
                        <ScrollTable
                            dataSource={dataSource}
                            columns={columns}
                        />
                        <br />
                        {
                            schedule.schedule_status !== "Job Done" ?
                                <Button
                                    style={{ margin: '5px', width: '95px', height: '35px', backgroundColor: '#4672bb', color: 'white' }}
                                    onClick={() => this.startJob()}
                                >
                                    {schedule.schedule_status === "Assigned" ? "Job Start" : "Job Done"}
                                </Button>
                                : ""
                        }
                        <Button style={{ margin: '5px', width: '95px', height: '35px', backgroundColor: 'white', color: 'black' }} onClick={() => history.push('/job')}>Cancel</Button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
    };
}
export default connect(
    mapStateToProps
)(Schedule);