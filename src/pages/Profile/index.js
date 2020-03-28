import React from 'react'
import { Breadcrumb } from 'antd'
import { Divider } from 'antd'
import { Button } from 'antd'
import { Row, Col } from 'antd'
import { Avatar } from 'antd'
import { Icon } from 'antd'
import api from 'apis' //import { fetchEmployee, putEmployee, postEmployee, deleteEmployee } from '../../actions/Employee'
import { Card, Select } from 'antd'
import { fetchEmployee } from '../../actions/Employee'
import { fetchPosition } from '../../actions/Position'
import { fetchDepartment } from '../../actions/Department'
import { fetchUser } from '../../actions/User'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import other from '../../assets/img/other.png'
import psn from '../../assets/img/personal.svg'
import job from '../../assets/img/job.svg'
import contact from '../../assets/img/contact.svg'
import parent1 from '../../assets/img/parentinformation.svg'
import { Input } from 'antd'
import { Form, Checkbox } from 'antd'
// import { Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { noti } from 'utils/index'
import { getUserInfo } from '../../utils'

// Import Css
import './Profile.css'

const { Meta } = Card
const apiUrl = 'http://localhost:9991/'

const { Option } = Select
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
}
const InputGroup = Input.Group
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 }
}

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			file: null,
			data: [],
			preview: null,
			loading: false
		}
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
			if (!err) {
				const values = {
					...fieldsValue
				}
				const empid = getUserInfo()
				api.put(`employees/${empid.e_id}`, values).then(result => console.log(result))
				this.props.history.push('/')
				noti('success', 'Successfully!', 'Emp has been updated successfully.')
			} else {
				noti('error', 'Unsuccessfully!', 'Fail to update.')
			}
		})
	}

	componentDidMount() {
		this.getData()
	}

	getAllEmployee() {
		this.props.fetchPosition()
		this.props.fetchDepartment()
	}

	async getData() {
		const empid = getUserInfo()
		const response = await api.get(`employees/${empid.e_id}`)
		if (response && response.status == 200) {
			let data = response.data.data
			console.log(data)

			let imgUrl = data.image ? apiUrl + data.image : ''
			this.setState({ data: data, preview: imgUrl })
			this.setInitialValues()
		}
	}
	setInitialValues = () => {
		const data = this.state.data
		const { form } = this.props
		if (data)
			form.setFieldsValue({
				id: data.id,
				name: data.name,
				temporary_address: data.temporary_address,
				parmanent_address: data.parmanent_address,
				phone: data.phone
			})
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const data = this.state.data
		console.log()
		const prefixSelector = getFieldDecorator('phone', {
			initialValue: '95'
		})(
			<Select style={{ width: 70 }}>
				<Option value="01">+01</Option>
			</Select>
		)

		return (
			<div>
				<Breadcrumb.Item style={{ color: '#4672bb' }}>Service Man</Breadcrumb.Item>
				<br />
				<br />

				<div className="ProfileContainer">
					<Form onSubmit={this.handleSubmit}>
						<Form.Item>{getFieldDecorator('id')(<Input type="hidden" />)}</Form.Item>
						<div
							style={{
								width: '7rem',
								height: '7rem'
							}}>
							<img
								src={apiUrl + data.image}
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
						<div className="ProfileFormDivider">
							<h4>A person whoes work is the maintenance and repair of equipment.</h4>
							<br />

							<span className="c1">
								<img src={psn} style={{ width: '20px', height: '20px' }} />
								&nbsp;&nbsp;&nbsp;&nbsp;<b>Personal Information</b>
							</span>

							<div style={{ height: '20px' }} />
							<div>
								<Row>
									<Col span={13}>
										<h4>
											<span className="ProfileHeaderSpan">Code :</span>
										</h4>
										<label style={{ color: '#4672bb' }}>{data.code}</label>
									</Col>
									<Col span={7}>
										<Form.Item
											style={{
												width: '300px',
												margin: '0 300px 8px 0',
												display: 'inline-block'
											}}
											label="Name:">
											{getFieldDecorator('name', {
												rules: [
													{
														required: true,
														message: 'Insert Please'
													}
												]
											})(
												<Input
													style={{ display: 'inline-block' }}
													defaultplaceholder="Kyawsoeye"
												/>
											)}
										</Form.Item>
									</Col>
								</Row>
								<br />
								<Row>
									<Col span={13}>
										<h4>
											<span className="ProfileHeaderSpan">NRIC :</span>
										</h4>
										<label style={{ color: '#4672bb' }}>{data.nric}</label>
									</Col>
									<Col span={7}>
										<h4>
											<span className="ProfileHeaderSpan">Date Of Birth :</span>
										</h4>
										<label style={{ color: '#4672bb' }}>{data.dob}</label>
									</Col>
								</Row>
							</div>
						</div>
						<div className="ProfileFormDivider">
							<span className="c1">
								<img src={job} style={{ width: '20px', height: '20px' }} />
								&nbsp;&nbsp;&nbsp;&nbsp;<b>Personal Information</b>
							</span>

							<div style={{ height: '20px' }} />
							<div>
								<Row>
									<Col span={13}>
										<h4>
											<span className="ProfileHeaderSpan">Position :</span>
										</h4>
										<label style={{ color: '#4672bb' }}>{data.posname}</label>
									</Col>
									<Col span={7}>
										<h4>
											<span className="ProfileHeaderSpan">Department :</span>
										</h4>
										<label style={{ color: '#4672bb' }}>{data.depname}</label>
									</Col>
								</Row>
								<br />
								<Row>
									<Col span={13}>
										<h4>
											<span className="ProfileHeaderSpan">Start Date :</span>
										</h4>
										<label style={{ color: '#4672bb' }}>{data.start_date}</label>
									</Col>
								</Row>
							</div>
						</div>
						<div className="ProfileFormDivider">
							<span className="c1">
								<img src={contact} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Contact Information</b>
							</span>
							<div style={{ height: '20px' }} />
							<div>
								<Row>
									<Col span={13}>
										<h4>
											<span className="ProfileHeaderSpan">Email :</span>
										</h4>
										<label style={{ color: '#4672bb' }}>{data.email}</label>
									</Col>
									<Col span={7}>
										<Form.Item
											style={{
												width: '300px',
												margin: '0 300px 8px 0',
												display: 'inline-block'
											}}
											label="Phone No:">
											{getFieldDecorator('phone', {
												rules: [
													{
														required: true,
														message: 'Insert Please'
													}
												]
											})(
												<Input
													addonBefore={prefixSelector}
													style={{ display: 'inline-block' }}
													placeholder="45004463"
												/>
											)}
										</Form.Item>
									</Col>
								</Row>
								<br />
								<Row>
									<Col span={13}>
										<Form.Item
											style={{
												width: '300px',
												margin: '0 300px 8px 0',
												display: 'inline-block'
											}}
											label="Permanent Address:">
											{getFieldDecorator('parmanent_address', {
												rules: [
													{
														required: true,
														message: 'Insert Please '
													}
												]
											})(
												<Input
													style={{ display: 'inline-block' }}
													placeholder="No 5A,Building 6,Sample Street,Dagon,Ygn "
												/>
											)}
										</Form.Item>
									</Col>
									<Col span={7}>
										<Form.Item
											style={{
												width: '300px',
												margin: '0 300px 8px 0',
												display: 'inline-block'
											}}
											label="Temporary Address:">
											{getFieldDecorator('temporary_address', {
												rules: [
													{
														required: true,
														message: 'Insert Please '
													}
												]
											})(
												<Input
													style={{ display: 'inline-block' }}
													placeholder="No 5A,Building 6,Sample Street,Dagon,Ygn "
												/>
											)}
										</Form.Item>
									</Col>
								</Row>
							</div>
						</div>
						<div style={{ height: '200px', padding: '8px', marginLeft: '30px' }}>
							<span className="c1">
								<img src={parent1} style={{ width: '20px', height: '20px' }} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Parent Information</b>
							</span>
							<div style={{ height: '20px' }} />
							<div>
								<Row>
									<Col span={13}>
										<h4>
											<span className="ProfileHeaderSpan">Father Name :</span>
										</h4>
										<label style={{ color: '#4672bb' }}>{data.father_name}</label>
									</Col>
									<Col span={7}>
										<h4>
											<span className="ProfileHeaderSpan">Mother Name :</span>
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
											<span className="ProfileHeaderSpan">Education :</span>
										</h4>
										<label style={{ color: '#4672bb' }}>{data.education}</label>
									</Col>
									<Col span={7}>
										<h4>
											<span className="ProfileHeaderSpan">Social Media Link :</span>
										</h4>
										<label style={{ color: '#4672bb' }}>{data.social_media_link}</label>
									</Col>
								</Row>
							</div>
						</div>
						<div>
							<Form {...formItemLayout} onSubmit={this.handleSubmit}>
								<Form.Item {...tailFormItemLayout}>
									<Button
										type="primary"
										htmlType="submit"
										style={{
											marginLeft: '30px',
											backgroundColor: '#4672bb',
											width: '100px',
											padding: '4px'
										}}>
										Edit
									</Button>

									<Link to="/">
										<Button style={{ marginLeft: '50px', width: '100px', padding: '4px' }}>
											Cancel
										</Button>
									</Link>
								</Form.Item>
							</Form>
						</div>{' '}
					</Form>
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
		department: state.department.list,
		user: state.user.list
	}
}
const ProfileV = Form.create()(Profile)
export default connect(mapStateToProps, { fetchEmployee, fetchPosition, fetchDepartment, fetchUser })(ProfileV)
