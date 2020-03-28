import React from 'react'
import { Breadcrumb } from 'antd'
import { Divider } from 'antd'
import { Button } from 'antd'
import { Row, Col } from 'antd'
import { Avatar } from 'antd'
import { Icon } from 'antd'
import api from 'apis' //import { fetchEmployee, putEmployee, postEmployee, deleteEmployee } from '../../actions/Employee'
import { Card } from 'antd'
import { fetchEmployee } from '../../actions/Employee'
import { fetchPosition } from '../../actions/Position'
import { fetchDepartment } from '../../actions/Department'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import other from '../../assets/img/other.png'
import psn from '../../assets/img/personal.svg'
import job from '../../assets/img/job.svg'
import contact from '../../assets/img/contact.svg'
import parent1 from '../../assets/img/parentinformation.svg'

// import { Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

const { Meta } = Card
const imgurl = 'http://localhost:9991/'

// const { Option } = Select;

class Employee extends React.Component {
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
		this.getData()
	}
	getAllEmployee() {
		this.props.fetchPosition()
		this.props.fetchDepartment()
	}

	async getData() {
		const response = await api.get(`employees/${this.state.id}`)
		if (response && response.status == 200) {
			this.setState({ data: response.data.data })
		}
	}

	render() {
		const data = this.state.data
		console.log()
		// const renderPosition = (
		//     <Select style={{
		//         width: '300px',
		//         marginleft: '10px',
		//         display: 'inline-block'
		//     }} placeholder="Please select position">
		//         {this.props.position.map(item => {
		//             return <Option value={item.id}>{item.name}</Option>
		//         })}
		//     </Select>
		// )
		// const renderDepartment = (
		//     <Select style={{
		//         width: '300px',
		//         marginleft: '10px',
		//         display: 'inline-block'
		//     }} placeholder="Please select department">
		//         {this.props.department.map(item => {
		//             return <Option value={item.id}>{item.name}</Option>
		//         })}
		//     </Select>
		// )
		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Item>Configuration</Breadcrumb.Item>
					<Breadcrumb.Item>
						<a href="employee">Employee</a>
					</Breadcrumb.Item>
					<Breadcrumb.Item style={{ color: '#4672bb' }}>View Employee</Breadcrumb.Item>
				</Breadcrumb>
				<br />
				<h1>View Employee</h1>
				<Breadcrumb>
					<Breadcrumb.Item>
						You can view Employee basic data by entering one by one using the following form.
					</Breadcrumb.Item>
				</Breadcrumb>
                <br />
                
                <div className="EmployeeContainer">

                    <div
							style={{
								width: '7rem',
								height: '7rem'
							}}>
							<img
								src={imgurl + data.image}
								style={{
									width: '100%',
									height: '100%',
									marginLeft: '2.3em',
									borderRadius: '7rem',
									objectFit: 'cover'
								}}
							/>
						</div>
                  
                    <br />
                    <br />

                    <div className="EmployeeFormDivider">
                        <span className="c1">
                            <img src={psn} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Personal Information</b>
                        </span>
                        <div style={{ height: '20px' }} />
                        <div>
                            <Row>
                                <Col span={13}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Code :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.code}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Name :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.name}</label>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={13}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            NRIC :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.nric}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Date Of Birth :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.dob}</label>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className="EmployeeFormDivider">
                        <span className="c1">
                            <img src={job} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Job Information</b>
                        </span>
                        <div style={{ height: '20px' }} />
                        <div>
                            <Row>
                                <Col span={13}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Position :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.posname}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Department :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.depname}</label>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={13}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Start Date :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.start_date}</label>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className="EmployeeFormDivider">
                        <span className="c1">
                            <img src={contact} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Contact Information</b>
                        </span>
                        <div style={{ height: '20px' }} />
                        <div>
                            <Row>
                                <Col span={13}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Email :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.email}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Phone No :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.phone}</label>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={13}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Permanent Address :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.parmanent_address}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Temporary Address :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.temporary_address}</label>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className="EmployeeFormDivider">
                        <span className="c1">
                            <img src={parent1} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Parent Information</b>
                        </span>
                        <div style={{ height: '20px' }} />
                        <div>
                            <Row>
                                <Col span={13}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Father Name :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.father_name}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Mother Name :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.mother_name}</label>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div style={{ borderStyle: 'hidden', height: '200px', padding: '8px', marginLeft: '30px' }}>
                        <span className="c1">
                            <img src={other} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Other Information</b>
                        </span>
                        <div style={{ height: '20px' }} />
                        <div>
                            <Row>
                                <Col span={13}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Education :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.education}</label>
                                </Col>
                                <Col span={7}>
                                    <h4>
                                        <span className="EmployeeHeaderSpan">
                                            Social Media Link :
                                        </span>
                                    </h4>
                                    <label style={{ color: '#4672bb' }}>{data.social_media_link}</label>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <Button style={{ backgroundColor: '#4672bb', width: '100px', padding: '4px' }}>
                            <Link
                                style={{ display: 'block', height: '100%', color: '#ffffff' }}
                                to={'/employees/edit/' + data.id}>
                                Edit
                            </Link>
                        </Button>

                        <Link to="/employee">
                            <Button style={{ marginLeft: '20px', width: '100px', padding: '4px' }}>Cancel</Button>
                        </Link>
                    </div>
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
		position: state.position.list,
		department: state.department.list
	}
}
export default Employee
