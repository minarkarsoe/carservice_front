import React from 'react'
import { Row, Col, Icon, Input, Select, Card } from 'antd'
import { Divider } from 'antd'
import photo from '../../assets/img/cl.svg'
import job from '../../assets/img/d.svg'
import machine from '../../assets/img/m.svg'
import photo1 from '../../assets/img/custf.svg'
import ScrollTable from './CustomScrollTable'
import SelectTable from './SelectTable'
import api from 'apis'
import { connect } from 'react-redux'
import './index.css'

const uuidv4 = require('uuid/v4')

class Schedule extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id: this.props.match.params.id,
			complain: null,
			schedule: null,
			employeelist: [],
			loading: true
		}
	}

	componentDidMount() {
		this.getData()
	}

	async getData() {
		const response = await api.get(`schedule/${this.state.id}`)
		if (response && response.status == 200) {
			let data = response.data.data
			const complain = await api.get(`complain/${data.comp_id}`)
			const employees = await api.get(`employeeschedule/${data.id}`)
			this.setState({
				schedule: data,
				complain: complain.data.data,
				employeelist: employees.data.data,
				loading: false
			})
		}
	}

	render() {
		const { complain, schedule, loading, employeelist } = this.state
		if (loading) return <div />

		const dataSource = this.props.complain

		const {
			workinghr,
			mod_no,
			complain_no,
			dep_name,
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
			job_description,
			location
		} = complain

		const columns = [
			{
				title: 'Model No',
				dataIndex: 'mod_no',
				align: 'center'
			},
			{
				title: 'FUP No',
				dataIndex: 'fup_no',
				align: 'center'
			},
			{
				title: 'Complain No',
				dataIndex: 'complain_no',
				align: 'center'
			},
			{
				title: 'Date',
				dataIndex: 'date',
				align: 'center'
			},
			{
				title: 'Status',
				dataIndex: 'complain_status',
				align: 'center'
			}
		]

		return (
			<div>
				<h3 style={{ color: 'blue' }}>Assign Schedule</h3>
				<h5>
					An expression of dissatisfaction made to an organization related to its products or View services or
					the complains -handling processs itself where a response or resolution is explicity or implicity
					expected.
				</h5>
				<br />

				<div className="ScheduleContainer">
					<img src={photo} style={{ width: '40px', height: '40px', fontSize: '40px', marginRight: '20px' }} />
					<span className="a1">
						<b>Complain information</b>
					</span>
					<div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
						<Row>
							<Col span={16}>
								<h3>
									<span className="ScheduleHeaderSpan">Complain No:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{complain_no}</span>
							</Col>
							<Col span={7}>
								<h3>
									<span className="ScheduleHeaderSpan">Model no:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{mod_no}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
						<Row style={{ marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="ScheduleHeaderSpan">Warranty:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{wyear}</span>
							</Col>
							<Col span={4}>
								<h4>Warranty Description:</h4>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{description}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
						<Row style={{ marginBotton: '20px', marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="ScheduleHeaderSpan">FUP No:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{fup_no}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="ScheduleHeaderSpan">Working Hour:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{workinghr}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
					</div>
				</div>
				<br />
				<br />
				<div className="ScheduleContainer">
					<img src={photo1} style={{ width: '40px', height: '40px', marginRight: '20px' }} />
					<span className="a1">
						<b>Customer Information</b>
					</span>
					<div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
						<Row>
							<Col span={16}>
								<h3>
									<span className="ScheduleHeaderSpan">Customer Name:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{customer_name}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="ScheduleHeaderSpan">Customer Ph No:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{customer_phno}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
						<Row style={{ marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="ScheduleHeaderSpan">Distance:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{distance}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="ScheduleHeaderSpan">Location:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{location}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
					</div>
				</div>
				<br />
				<br />
				<div className="ScheduleContainer">
					<img src={job} style={{ width: '40px', height: '40px', marginRight: '20px' }} />{' '}
					<span className="a1">
						<b>Job Information</b>
					</span>
					<div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
						<Row style={{ marginBotton: '40px' }}>
							<Col span={16}>
								<h3>
									<span className="ScheduleHeaderSpan">Job Title:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{complain_job_title}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="ScheduleHeaderSpan">Department:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{dep_name}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
						<Row style={{ marginBotton: '40px', marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="ScheduleHeaderSpan">Complain Job Title:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{job_title}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="ScheduleHeaderSpan">Description:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{job_description}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
						<Row style={{ marginBotton: '40px', marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="ScheduleHeaderSpan">Date:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{date}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
					</div>
				</div>

				<br />
				<br />

				<div className="ScheduleContainer">
					<img src={machine} style={{ width: '40px', height: '40px', marginRight: '20px' }} />
					<span className="a1">
						<b>Machine History</b>
					</span>

					<div style={{ paddingTop: '36px' }}>
						<ScrollTable dataSource={dataSource} columns={columns} />
					</div>
				</div>

				<br />
				<br />

				<div className="ScheduleContainer">
					<SelectTable schedule={schedule} dataSource={employeelist} />
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
		complain: state.complain.list
		//   servicemen: state.service.list
	}
}
export default connect(mapStateToProps)(Schedule)
