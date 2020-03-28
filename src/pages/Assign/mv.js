import React from 'react'
import { Col, Row, Form, DatePicker, Input, Radio } from 'antd'
import photo from '../../assets/img/cl.svg'
import photo1 from '../../assets/img/custf.svg'
import './viewcss.css'
import schedule from '../../assets/img/schedule.svg'
import job from '../../assets/img/d.svg'
import { Button } from 'antd'
import { noti } from 'utils/index'

import api from 'apis'
const { RangePicker } = DatePicker
const { TextArea } = Input

class machineview extends React.Component {
	state = {
		id: this.props.match.params.id,
		data: [],
		startValue: null,
		endValue: null,
		endOpen: false
	}

	handleSubmit = e => {
		const selectedid = this.state.selectedid

		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
			if (!err) {
				const rangev = fieldsValue['range']
				const values = {
					...fieldsValue,
					start_date: rangev[0].format('YYYY/MM/DD'),
					end_date: rangev[1].format('YYYY/MM/DD'),
					selectedid
				}

				api.put(`schedule/${this.state.id}`, values).then(result => {
					if (result) {
						//this.props.form = '';
						this.props.form.resetFields()
					}
				})
				for (let i = 0; i < selectedid.length; i++) {
					const values = {
						...fieldsValue,
						start_date: rangev[0].format('YYYY/MM/DD'),
						end_date: rangev[1].format('YYYY/MM/DD'),
						employee_id: selectedid[i]
					}
					console.log(values)
					this.postData(values)
				}
				this.props.form.resetFields()

				noti('success', 'Successfully!', 'Schedules have been created successfully.')
			} else {
				noti('error', 'Unsuccessfully!', 'Fail to Create.')
			}
		})
	}
	componentDidMount() {
		this.getData()
	}
	async getData() {
		const response = await api.get(`complain/${this.state.id}`)
		if (response && response.status == 200) {
			this.setState({ data: response.data.data })
		}
	}
	disabledStartDate = startValue => {
		const { endValue } = this.state
		if (!startValue || !endValue) {
			return false
		}
		return startValue.valueOf() > endValue.valueOf()
	}

	disabledEndDate = endValue => {
		const { startValue } = this.state
		if (!endValue || !startValue) {
			return false
		}
		return endValue.valueOf() <= startValue.valueOf()
	}

	onChange = (field, value) => {
		this.setState({
			[field]: value
		})
	}

	onStartChange = value => {
		this.onChange('startValue', value)
	}

	onEndChange = value => {
		this.onChange('endValue', value)
	}

	handleStartOpenChange = open => {
		if (!open) {
			this.setState({ endOpen: true })
		}
	}

	handleEndOpenChange = open => {
		this.setState({ endOpen: open })
	}
	render() {
		const { getFieldDecorator } = this.props.form
		const { data, selectedRowKeys } = this.state

		const dateFormat = 'YYYY/MM/DD'
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
			hideDefaultSelections: true,

			onSelection: this.onSelection
		}

		const { startValue, endValue, endOpen } = this.state
		return (
			<div>
				<h2>
					<b>View Machine History</b>
				</h2>
				<br />
				<div className="AcceptSheduleContainer">
					<img src={photo} style={{ width: '40px', height: '40px', fontSize: '27px', marginRight: '20px' }} />
					<span className="a1">
						<b>Complain information</b>
					</span>
					<div style={{ paddingLeft: '80px', paddingTop: '60px' }}>
						<Row>
							<Col span={16}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Complain No:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.complain_no}</span>
							</Col>
							<Col span={7}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Model no:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.mod_no}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
						<Row style={{ marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Warranty:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.wyear}</span>
							</Col>
							<Col span={4}>
								<h3 style={{ width: '240px' }}>Warranty Description:</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.description}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
						<Row style={{ marginBotton: '20px', marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">FUP No:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.fup_no}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Working Hour:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.workinghr}</span>
							</Col>
						</Row>
					</div>
				</div>
				<br />
				<br />
				<div className="AcceptSheduleContainer">
					<img src={photo1} style={{ width: '40px', height: '40px', marginRight: '20px' }} />
					<span className="a1">
						<b>Customer Information</b>
					</span>
					<div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
						<Row>
							<Col span={16}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Customer Name:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.customer_name}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Customer Ph No:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.customer_phno}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
						<Row style={{ marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Distance:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.distance}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Location:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.location}</span>
							</Col>
						</Row>
					</div>
				</div>
				<br />
				<br />
				<div className="AcceptSheduleContainer">
					<img src={job} style={{ width: '40px', height: '40px', marginRight: '20px' }} />
					<span className="a1">
						<b>Job Information</b>
					</span>

					<div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
						<Row style={{ marginBotton: '40px' }}>
							<Col span={16}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Job Title:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.complain_job_title}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Department:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.dep_name}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
						<Row style={{ marginBotton: '40px', marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Complain Job Title:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.job_title}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Description:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.job_description}</span>
							</Col>
						</Row>
						<div style={{ height: '28px' }} />
						<Row style={{ marginBotton: '40px', marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="AcceptSheduleHeaderSpan">Date:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.date}</span>
							</Col>
						</Row>
					</div>
				</div>
				<br />
				<br />
				<div className="AcceptSheduleContainer">
					<img src={schedule} style={{ width: '40px', height: '40px', marginRight: '20px' }} />
					<span className="a1">
						<b>Schedule</b>
					</span>

					{/* <div style={{ paddingLeft: '80px', paddingTop: '60px' }}> */}
					<Form onSubmit={this.handleSubmit}>
						<Row style={{ marginTop: '40px' }}>
							<Col span={9} offset={1}>
								<Form.Item label="Interval Date:">
									{getFieldDecorator([ 'range' ], {
										rules: [
											{
												type: 'array',
												required: true,
												message: 'Please input your range!'
											}
										]
									})(<RangePicker format={dateFormat} />)}
								</Form.Item>
							</Col>

							<Col span={9} offset={1} style={{ marginLeft: '120px' }}>
								<Form.Item label="Amount:">
									{getFieldDecorator('ammount', {
										rules: [
											{
												required: true,
												message: 'Please input your amount!'
											}
										]
									})(<Input addonAfter="Kyats" />)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={9} offset={1}>
								<Form.Item label="Service Charge:">
									{getFieldDecorator('service_charge', {
										rules: [
											{
												required: true,
												message: 'Please input Service Charge!'
											}
										]
									})(<Input addonAfter="Kyats" />)}
								</Form.Item>
							</Col>

							<Col span={4} offset={1} style={{ marginLeft: '120px' }}>
								<Form.Item label="Inspection:">
									{getFieldDecorator('inspection')(
										<Radio.Group>
											<Radio value="Yes">Yes</Radio>
											<Radio value="No">No</Radio>
										</Radio.Group>
									)}
								</Form.Item>
							</Col>
							<Col span={4}>
								<Form.Item label="Watching List:">
									{getFieldDecorator('watching_list')(
										<Radio.Group>
											<Radio value="Yes">Yes</Radio>
											<Radio value="No">No</Radio>
										</Radio.Group>
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={9} offset={1}>
								<Form.Item label="Job Code:">
									{getFieldDecorator('job_code', {
										rules: [
											{
												required: true,
												message: 'Please input Job Code!'
											}
										]
									})(<Input placeholder="Enter Code" />)}
								</Form.Item>
							</Col>
							<Col span={9} offset={1} style={{ marginLeft: '120px' }}>
								<Form.Item label="Job Status:">
									{getFieldDecorator('job_status', {
										rules: [
											{
												required: true,
												message: 'Please input Job Status!'
											}
										]
									})(<Input placeholder="Enter Status" />)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={9} offset={1}>
								<Form.Item label="Job Title:">
									{getFieldDecorator('job_title', {
										rules: [
											{
												required: true,
												message: 'Please input Job title!'
											}
										]
									})(<Input placeholder="Enter Title" />)}
								</Form.Item>
							</Col>
							<Col span={9} offset={1} style={{ marginLeft: '120px' }}>
								<Form.Item label="Job Description:">
									{getFieldDecorator('complain_description', {
										rules: [
											{
												required: true,
												message: 'Please input Job Description!'
											}
										]
									})(<TextArea rows={3} placeholder="Enter Description" />)}
								</Form.Item>
							</Col>
						</Row>

						<Row style={{ marginTop: '40px', textAlign: 'center' }}>
							<Button
								htmlType="submit"
								style={{
									width: '100px',
									height: '40px',
									fontSize: '15',
									color: 'white',
									backgroundColor: '#4672bb'
								}}>
								Submit
							</Button>

							<Button
								style={{
									marginLeft: '20px',
									width: '95px',
									height: '35px',
									backgroundColor: 'white',
									color: 'black'
								}}
								onClick={this.handleCancel}>
								Cancel
							</Button>
						</Row>
					</Form>
				</div>
			</div>
		)
	}
}
const Machineview = Form.create()(machineview)
export default Machineview
