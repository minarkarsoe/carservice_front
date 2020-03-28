import React from 'react'
import { Row, Col } from 'antd';
import { Divider } from 'antd';
import photo from '../../assets/img/cl.svg';
import job from '../../assets/img/d.svg';
import machine from '../../assets/img/m.svg';
import photo1 from '../../assets/img/custf.svg';
import ScrollTable from './CustomScrollTable';
import SelectTable from './SelectTable';
import api from 'apis';
import { fetchComplain } from '../../actions/Complain'
import { fetchEmployee } from '../../actions/Employee';

import { connect } from "react-redux";
const uuidv4 = require('uuid/v4');

class AssignSchedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            data: []
        }
    }

    componentDidMount() {
        this.getData();
        this.props.fetchComplain()
        this.props.fetchEmployee()
    }

    async getData() {
        const response = await api.get(`complain/${this.state.id}`);
        if (response && response.status == 200) {
            this.setState({ data: response.data.data })
        }

    }

    render() {

        const dataSource = this.props.cpl;
        dataSource.map(d => {
            let uuid = uuidv4();
            d.key = uuid;
        })
        let dataService = this.props.employee;
        dataService.map(d => {
            let uuid = uuidv4();
            d.key = uuid;
        })

        const { workinghr, mod_no, complain_no, dep_name,
            fup_no,
            wyear,
            description,
            customer_phno,
            customer_name,
            name,
            distance,
            job_title,
            date,
            amount,
            complain_job_title,
            job_description, location } = this.state.data;

        const columns = [
            {
                title: 'Model No',
                dataIndex: 'mod_no',
                width: 100

            },
            {
                title: 'FUP No',
                dataIndex: 'fup_no',
                width: 100
            },
            {
                title: 'Complain No',
                dataIndex: 'complain_no',
                width: 100,

            },
            {
                title: 'Date',
                dataIndex: 'date',
                width: 100,

            },
            {
                title: 'Status',
                dataIndex: 'status',
                width: 100,

            },
        ];

        return (
            <div >
                <h3 style={{ color: 'blue' }}>Assign Schedule</h3>
                <h4>
                    An expression of dissatisfaction made to an organization related to its products or
                            View     services or the complains -handling processs itself where a response or resolution is
                    explicity or implicity expected.
                </h4>
                <br></br>
                <div className="AssignAcceptSheduleContainer">
                    <img src={photo} style={{ width: '40px', height: '40px', fontSize: '80px', color: 'black', marginRight: '20px' }} /><span className='a1'><b>Complain Information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>

                        <Row>
                            <Col span={16}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Complain No:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{complain_no}</span>
                            </Col>
                            <Col span={7}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Model no:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{mod_no}</span>
                            </Col>

                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginTop: '40px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Warranty:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{wyear}</span>
                            </Col>
                            <Col span={4}>
                                <h3  style={{ width: '240px' }}>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                   Warranty Description:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{description}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginTop: '40px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    FUP No:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{fup_no}</span>
                            </Col>
                            <Col span={8}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Working Hour:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{workinghr}</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="AssignAcceptSheduleContainer">
                    <img src={photo1} style={{ width: '40px', height: '40px', marginRight: '20px' }} /><span className='a1'><b>Customer Information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                        <Row>
                            <Col span={16}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Customer Name:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{customer_name}</span>
                            </Col>
                            <Col span={8}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Customer Ph No:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{customer_phno}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginTop: '30px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Distance:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{distance}</span>
                            </Col>
                            <Col span={8}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Location:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{location}</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="AssignAcceptSheduleContainer">
                    <img src={job} style={{ width: '40px', height: '40px', marginRight: '20px' }} /><span className='a1'><b>Job Information</b></span>

                    <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Job Title:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{complain_job_title}</span>
                            </Col>
                            <Col span={8}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Department:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{dep_name}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '40px', marginTop: '30px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Complain Job Title:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{job_title}</span>
                            </Col>
                            <Col span={8}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Description:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{job_description}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '40px', marginTop: '30px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AssignAcceptSheduleHeaderSpan"> 
                                    Date:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{date}</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="AssignAcceptSheduleContainer">
                    <img src={machine} style={{ width: '40px', height: '40px', marginRight: '20px' }} />
                    <span className='a1'><b>Machine History</b></span>

                    <ScrollTable
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
                <br />
                <br />
                <div className="AssignAcceptSheduleContainer" style={{marginTop: 60}}>
                    <span className='a1'><b>Assign Schedule</b></span>
                    <SelectTable
                        complain={this.state.data}
                        dataSource={dataService}
                    />
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
        complain: state.complain.list,
        employee: state.employee.list,
        cpl: state.cpl.list,
        //   servicemen: state.service.list
    };
}
export default connect(
    mapStateToProps,
    { fetchComplain, fetchEmployee }
)(AssignSchedule);