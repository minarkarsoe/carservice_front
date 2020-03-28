import { Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { DatePicker, Divider } from 'antd'
import { Radio, Button } from 'antd'
import { Row, Col, Form, Input } from 'antd'
import history from '../../router/history'
import moment from 'moment'
import api from '../../apis'
import photo from '../../assets/img/s.svg'
const uuidv4 = require('uuid/v4')
const { RangePicker } = DatePicker
const { TextArea } = Input

const columns = [
	{
		title: 'Name',
		dataIndex: 'name'
	},
	{
		title: 'Position',
		dataIndex: 'posname'
	},
	{
		title: 'Phone No',
		dataIndex: 'phone'
	},
	{
		title: 'Address',
		dataIndex: 'parmanent_address'
	},
	{
		title: 'NRIC',
		dataIndex: 'nric'
	},
	{
		title: 'Employee Code',
		dataIndex: 'code'
	},

	{
		title: 'Action',
		render: record => (
			<Link style={{ color: 'green', marginRight: '0.5em' }} to={'/assign/profile/' + record.id}>
				View
			</Link>
		)
	}
]

class As extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			schedule: this.props.schedule,
			data: this.props.dataSource
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this._handle_change = this._handle_change.bind(this)
	}

	async handleSubmit() {
		let { schedule } = this.state
		schedule.created_at = moment(schedule.created_at).format('YYYY/MM/DD')
		schedule.updated_at = moment(schedule.updated_at).format('YYYY/MM/DD')
		delete schedule.compo
		delete schedule.complain_job_title
		delete schedule.mno
		delete schedule.mod_id
		delete schedule.amount
		delete schedule.customer_name
		delete schedule.customer_phno
		delete schedule.distance
		delete schedule.location
		delete schedule.date
		delete schedule.description
		delete schedule.j_description
		delete schedule.model_number
		api.put(`schedule/${schedule.id}`, schedule)
		console.log(schedule)
		api.put(`schedule/${schedule.id}`, schedule)

		history.push('/schedule')
	}

	_handle_change = e => {
		let { schedule } = this.state
		schedule.start_date = moment(e[0]).format('YYYY-MM-DD')
		schedule.end_date = moment(e[1]).format('YYYY-MM-DD')
		this.setState({ ...this.state, schedule })
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const { data, schedule, selectedRowKeys } = this.state
		console.log(schedule)
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
			hideDefaultSelections: true,

			onSelection: this.onSelection
		}
		let date_range = `From ${schedule.start_date} to ${schedule.end_date}`
		return (
			<div>
				<Form>
					<div style={{ padding: '20px', width: '100%', borderWidth: '1px', borderStyle: 'solid', borderRadius: 8, borderColor: '#dfdfdf' }}>
						<Row>
							<Col span={9} offset={1}>
								<Form.Item label="Interval Date:">
									<RangePicker
										value={[ moment(schedule.start_date), moment(schedule.end_date) ]}
										onChange={this._handle_change}
									/>
								</Form.Item>
							</Col>

							<Col span={9} offset={1} style={{ marginLeft: '120px' }}>
								<Form.Item label="Amount:">
									{<Input addonAfter="Kyats" value={schedule.ammount} />}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={9} offset={1}>
								<Form.Item label="Service Charge:">
									{<Input addonAfter="Kyats" value={schedule.service_charge} />}
								</Form.Item>
							</Col>

							<Col span={4} offset={1} style={{ marginLeft: '120px' }}>
								<Form.Item label="Inspection:">
									<Radio.Group value={schedule.inspection}>
										<Radio value={1}>Yes</Radio>
										<Radio value={2}>No</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
							<Col span={4}>
								<Form.Item label="Watching List:">
									<Radio.Group value={schedule.watching_list}>
										<Radio value={1}>Yes</Radio>
										<Radio value={2}>No</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={9} offset={1}>
								<Form.Item label="Job Code:">
									{<Input placeholder="Enter Code" value={schedule.job_code} />}
								</Form.Item>
							</Col>
							<Col span={9} offset={1} style={{ marginLeft: '120px' }}>
								<Form.Item label="Job Status:">
									{<Input placeholder="Enter Status" value={schedule.job_status} />}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={9} offset={1}>
								<Form.Item label="Job Title:">
									{<Input placeholder="Enter Title" value={schedule.job_title} />}
								</Form.Item>
							</Col>
							<Col span={9} offset={1} style={{ marginLeft: '120px' }}>
								<Form.Item label="Job Description:">
									<TextArea rows={3} placeholder="Enter Description" value={schedule.j_description} />
								</Form.Item>
							</Col>
						</Row>
					</div>
					<div style={{ marginTop: '40px', marginBottom: '20px' }}>
						<img
							src={photo}
							style={{
								width: '40px',
								height: '40px',
								fontSize: '80px',
								color: 'black',
								marginRight: '20px'
							}}
						/>
						<span className="a1">
							<b>Service Man Detail</b>
						</span>
					</div>
					<Table
						key={data.key}
						rowSelection={rowSelection}
						dataSource={data}
						columns={columns}
						rowClassName="editable-row"
						bordered
					/>

					<Button
						type="button"
						style={{
							marginleft: '35%',
							marginTop: '30px',
							marginLeft: '40%',
							width: '100px',
							height: '35px',
							backgroundColor: '#4672bb',
							color: 'white'
						}}
						onClick={this.handleSubmit}>
						Save
					</Button>
					<Button
						style={{
							marginLeft: '30px',
							marginTop: '30px',
							width: '100px',
							height: '35px',
							backgroundColor: 'white',
							color: 'black'
						}}
						onClick={() => history.push('/schedule')}>
						Cancel
					</Button>
				</Form>
			</div>
		)
	}
}
const SelectTable = Form.create()(As)
export default SelectTable
