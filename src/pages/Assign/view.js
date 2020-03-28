import React from 'react'
import { Col, Button, Row, Form, Avatar, Buttom, Table, Icon, Input, Select } from 'antd'
import photo from '../../assets/img/cl.svg';
import photo1 from '../../assets/img/custf.svg';
import job from '../../assets/img/d.svg';
import machine from '../../assets/img/m.svg'
import './viewcss.css';
import { Link, Route } from 'react-router-dom'
import ScrollTable from './CustomScrollTable';
import { fetchComplain, putComplain, postComplain, deleteComplain } from '../../actions/Complain'
import history from '../../router/history'
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants';
import api from 'apis';
import getTime from './get_time'
import { connect } from "react-redux";
const uuidv4 = require('uuid/v4');

{/* <Popconfirm
title="Are you sure reject?"
onConfirm={() => reject(record.id)}
okType="danger"
>
<a style={{ color: '#ff3333' }}>Reject</a>
</Popconfirm> */}
const reject = (id) => {
    api.put(`complain/reject/${id}`).then(result => {
        console.log('Succes')
    })

}  
//const apiUrl = "http://localhost:9991/"

class view extends React.Component {

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
    componentDidMount() {
        this.getData();
        this.getAllComplain();

    }

    getAllComplain() {
        console.log(this.props.fetchComplain())
    }

    getComplainbyId(id) {
        this.props.fetchComplain(id);
    }

    handleAppect = () => {
        console.log('accept')
    }

    async getData() {
        const response = await api.get(`complain/${this.state.id}`);
        if (response && response.status == 200) {
            this.setState({ data: response.data.data })
        }
    }

    // RejectHandler = async(id) => {
    //     const data = await api.get(`complain/${id}`)
    //                     .then(result => result.data.data)
    //     let complain = {...data}
    //     complain.status = "REJECT"
    //     complain.created_at = getTime
    //     complain.updated_at = getTime
    //     console.log(complain)
    //     api.put(`complain/${id}`, complain).then(() => this.getAllComplain())
    // }

    // acceptHandler = async(id) => {
    //     let path = `assign/accept/${id}`
    //     const data = await api.get(`complain/${id}`)
    //                     .then(result => result.data.data)
    //     let complain = {...data}
    //     complain.status = "ACCEPT"
    //     complain.created_at = getTime
    //     complain.updated_at = getTime
    //     console.log(complain)
    //     api.put(`complain/${id}`, complain)
    //         .then(() => this.getAllComplain())
    //         .then(() => this.props.history.push(path))
    // }


    render() {
        const data = this.state.data;
        console.log('Data => ', data );
        const columns = [
            {
                title: 'Complain No',
                width: '20%',
                dataIndex: 'complain_no',
                key: 'complain_no',

                align: 'center',
                sortDirections: ['ascend', 'descend'],
                sorter: (a, b) => a.name.length - b.name.length
            },

            {
                title: 'Model No',
                width: '20%',
                dataIndex: 'mod_no',
                key: 'mod_no',

                align: 'center',
                sortDirections: ['ascend', 'descend'],
                sorter: (a, b) => a.name.length - b.name.length
            },
            { title: 'FUP No', dataIndex: 'fup_no', key: '1', sortDirections: ['ascend', 'descend'], sorter: (a, b) => a.name.length - b.name.length },
            { title: 'Warranty', dataIndex: 'wyear', key: '2', sortDirections: ['ascend', 'descend'], sorter: (a, b) => a.name.length - b.name.length },
            { title: 'Warranty Description', dataIndex: 'description', key: '3' },
            {
                title: 'Status',
                key: 'complain_status',
                width: '20%',

                render: () => <a onClick={this.btnView}>Complete</a>,
                //   },
                // {
                //   title: 'Action',
                //   key: 'action',
                //   width:'90',
                //   render: (text, record) => (
                //     <span>
                //      <Link
                //         to={"/assign/mv/" +record.id} style={{ color: 'green' }}>
                //         View
                //       </Link></span>
                //   )}
            }]
        let dataSource = this.props.complain;
        dataSource.map(d => {
            let uuid = uuidv4();
            d.key = uuid;
        })



        return (
            <div>
                <h3 style={{ color: 'blue' }}>Accept Schedule</h3>
                <h4>
                    An expression of dissatisfaction made to an organization related to its products or
                    View     services or the complains -handling processs itself where a response or resolution is
                explicity or implicity expected.
                </h4>
                <br></br>

                <div className="AcceptSheduleContainer">
                    <img src={photo} style={{ width: '40px', height: '40px', fontSize: '80px', color: 'black', marginRight: '20px' }} />
                    <span className='a1'><b>Complain Information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>

                        <Row>
                            <Col span={16}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                    Complain No:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.complain_no}</span>
                            </Col>
                            <Col span={7}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                    Model no:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.mod_no}</span>
                            </Col>

                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginTop: '40px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                        Warranty:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.wyear}</span>
                            </Col>
                            <Col span={4}>
                                <h3 style={{ width: '240px' }}>
                                    <span className="AcceptSheduleHeaderSpan">
                                        Warranty Description:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px', width: "240px" }}>{data.description}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '20px', marginTop: '40px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                        FUP No:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.fup_no}</span>
                            </Col>
                            <Col span={8}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                        Working Hour:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.workinghr}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>

                    </div>
                </div>
               
                <br></br>
                <br></br>
                
                <div className="AcceptSheduleContainer">
                    <img src={photo1} style={{ width: '40px', height: '40px', marginRight: '20px' }} /> 
                    <span className='a1'><b>Customer Information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                        <Row>
                            <Col span={16} >
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                    Customer Name:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.customer_name}</span>
                            </Col>
                            <Col span={8} >
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                    Customer Ph No:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.customer_phno}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginTop: '30px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                    Distance:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.distance}</span>
                            </Col>
                            <Col span={8}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                    Location:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.location}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                    </div>
                </div>
                <br></br>
                <br></br>

                <div className="AcceptSheduleContainer">
                    <img src={job} style={{ width: '40px', height: '40px', marginRight: '20px' }} /> 
                    <span className='a1'><b>Job Information</b></span>

                    <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                        Job Title:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.complain_job_title}</span>
                            </Col>
                            <Col span={8}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                        Department:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.dep_name}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '40px', marginTop: '30px' }}>
                            <Col span={16}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                        Complain Job Title:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.job_title}</span>
                            </Col>
                            <Col span={8}>
                                <h3>
                                    <span className="AcceptSheduleHeaderSpan">
                                        Description:
                                    </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.job_description}</span>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '40px', marginTop: '30px' }}>
                            <Col span={16}>
                                <h3>
                                <span className="AcceptSheduleHeaderSpan">
                                    Date:
                                </span>
                                </h3>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>{data.date}</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br></br>
                <br></br>

                <div 
                    className="AcceptSheduleContainer"
                    // style={{ padding: '20px', width: '100%', borderWidth: '1px' }}
                >
                    <img src={machine} style={{ width: '40px', marginRight: '20px' }} />
                    <span className='a1'><b>Machine History</b></span>

                    <div style={{ textAlign: 'center' }}>
                        <ScrollTable columns={columns} dataSource={dataSource} customPagesize={3} />
                    </div>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    {
                        (data.complain_status === "Active") ? 
                            <Button style={{ backgroundColor: '#4672bb', width: '95px', padding: '4px', height: '35px' }}>
                                <Link style={{ display: 'block', color: '#ffffff' }} to={"/assign/accept/" + data.id}>
                                Accept
                                </Link>
                            </Button>
                        :
                        ''
                    }
                    <Link to="/assign">
                        <Button 
                            style={{ marginLeft: '20px', width: '95px', height: '35px', backgroundColor: 'white', color: 'black' }}
                        >
                        Cancel
                        </Button>
                    </Link>
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
        // assigns: state.assign.list,
        complain: state.complain.list,
    };
}
export default connect(
    mapStateToProps,
    { fetchComplain, postComplain, putComplain, deleteComplain }
)(view)