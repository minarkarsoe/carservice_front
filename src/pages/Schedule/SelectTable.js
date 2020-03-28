import { Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { DatePicker, Divider } from 'antd'
import { Radio, Button } from 'antd'
import { Row, Col, Form, Input } from 'antd'
import history from '../../router/history'
import photo from '../../assets/img/s.svg'

const uuidv4 = require('uuid/v4')
const { RangePicker } = DatePicker
const { TextArea } = Input

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		align: 'center'
	},
	{
		title: 'Position',
		dataIndex: 'posname',
		align: 'center'
	},
	{
		title: 'Phone No',
		dataIndex: 'phone',
		align: 'center'
	},
	{
		title: 'Address',
		dataIndex: 'parmanent_address',
		align: 'center'
	},
	{
		title: 'NRIC',
		dataIndex: 'nric',
		align: 'center'
	},
	{
		title: 'Employee Code',
		dataIndex: 'code',
		align: 'center'
	},

	{
		title: 'Action',
		align: 'center',
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
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const { data, schedule, selectedRowKeys } = this.state
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
			hideDefaultSelections: true,

			onSelection: this.onSelection
		}
		let date_range = `From ${schedule.start_date} to ${schedule.end_date}`
		return (
			<div>
				<h2>Assign Schedule</h2>
				<Form onSubmit={this.handleSubmit}>
					<div style={{ padding: '20px', width: '100%', borderWidth: '1px', borderStyle: 'solid', borderColor: '#dfdfdf', borderRadius: 8 }}>
						<Row>
							<Col span={9} offset={1}>
								<Form.Item label="Interval Date:">
									{<Input label="Start Date" value={date_range} />}
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
							<Col span={4} style={{ marginLeft: '60px' }}>
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
						// key={data.key}
						// rowSelection={rowSelection}
						dataSource={data}
						columns={columns}
						rowClassName="editable-row"
						bordered
					/>

					<Row style={{ marginLeft: '35%' }}>
						<Button style={{ width: '100px', height: '30px', backgroundColor: '#4672bb', color: 'white' }}>
							<Link
								style={{ display: 'block', color: 'white', backgroundColor: '#4672bb' }}
								to={'/schedule/edit/' + data.id}>
								Edit
							</Link>
						</Button>

						<Button
							style={{
								marginTop: '30px',
								marginLeft: '30px',
								width: '95px',
								height: '35px',
								backgroundColor: 'white',
								color: 'black'
							}}
							onClick={() => history.push('/schedule')}>
							Cancel
						</Button>
					</Row>
				</Form>
			</div>
		)
	}
}
const SelectTable = Form.create()(As)
export default SelectTable
