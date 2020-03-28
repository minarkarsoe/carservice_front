import React from 'react'

// import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Breadcrumb } from 'antd'
import { Button, Radio, Icon } from 'antd'
import { Upload, message } from 'antd'
import { Divider } from 'antd'
import { Input } from 'antd'
import { Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd'
import { fetchEmployee, postEmployee } from '../../actions/Employee'
import { fetchPosition } from '../../actions/Position'
import { fetchDepartment } from '../../actions/Department'
import { connect } from 'react-redux'
import { Form, Checkbox } from 'antd'
import { Link, Route } from 'react-router-dom'
import history from '../../router/history'
// import Button from './button';
import api from 'apis'
import { noti } from 'utils/index'
import psn from '../../assets/img/personal.svg'
import job from '../../assets/img/job.svg'
import contact from '../../assets/img/contact.svg'
import other from '../../assets/img/other.png'
import parent from '../../assets/img/parentinformation.svg'
import './employee.css'
const moment = require('moment')

const image = {
	width: '100px',
	height: '100px',
	backgroundColor: '#fff'
	// padding: '20px',
	// marginLeft: '30%',
}

// const apiUrl = "/home/xkill/Documents/sms-api/src/routes/uploads/"
const apiUrl = 'http://localhost:9991/'

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

function getBase64(img, callback) {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result))
	reader.readAsDataURL(img)
}

function beforeUpload(file) {
	const isJPG = file.type === 'image/jpeg'
	if (!isJPG) {
		message.error('You can only upload JPG file!')
	}
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!')
	}
	return isJPG && isLt2M
}

const InputGroup = Input.Group
const { Option } = Select

const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 }
}

class EditEmployee extends React.Component {
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

	handleChange = info => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true })
			return
		}
		if (info.file.status === 'done') {
			console.log(info.file)
			console.log(info)
			let preview = URL.createObjectURL(info.file.originFileObj)
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl => {
				console.log('Hello', imageUrl)

				this.setState({
					preview: preview,
					file: imageUrl,
					loading: false
				})
			})
		}
	}
	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
			if (!err) {
				const values = {
					...fieldsValue,
					dob: fieldsValue['dob'].format('YYYY-MM-DD'),
					start_date: fieldsValue['start_date'].format('YYYY-MM-DD')
				}
				values.image = this.state.file
				console.log(values)
				api.put(`employees/${values.id}`, values).then(result => console.log(result))
				noti('success', 'Successfully!', 'Emp has been updated successfully.')
			} else {
				noti('error', 'Unsuccessfully!', 'Fail to update.')
			}
		})
		history.push('/employee')
	}

	componentDidMount() {
		console.log('Date', this.getData())
		this.getAllEmployee()
	}
	getAllEmployee() {
		this.props.fetchPosition()
		this.props.fetchDepartment()
	}

	async getData() {
		const response = await api.get(`employees/${this.state.id}`)
		if (response && response.status == 200) {
			let data = response.data.data
			console.log(data)

			let imgUrl = data.image ? apiUrl + data.image : ''
			this.setState({ data: data, preview: imgUrl })
			this.setInitialValues()
		}
	}

	onChange = e => {
		let preview = URL.createObjectURL(e.target.files[0])
		this.getBase64(e.target.files[0], result => {
			this.setState({ preview: preview, file: result })
		})
	}

	getBase64(file, cb) {
		let reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = function() {
			cb(reader.result)
		}
		reader.onerror = function(error) {
			console.log('Error: ', error)
		}
	}

	state = {
		size: 'large'
	}

	handleSizeChange = e => {
		this.setState({ size: e.target.value })
	}

	check = () => {
		this.props.form.validateFields(err => {
			if (!err) {
				console.info('success')
			}
		})
	}
	setInitialValues = () => {
		const data = this.state.data
		const { form } = this.props
		if (data)
			form.setFieldsValue({
				id: data.id,
				code: data.code,
				name: data.name,
				position_id: data.position_id,
				department_id: data.department_id,
				dob: moment(data.dob),
				start_date: moment(data.start_date),
				education: data.education,
				email: data.email,
				father_name: data.father_name,
				mother_name: data.mother_name,
				phone: data.phone,
				nric: data.nric,
				parmanent_address: data.parmanent_address,
				temporary_address: data.temporary_address,
				social_media_link: data.social_media_link
			})
	}

	render() {
		const renderPosition = (
			<Select
				style={{
					marginleft: '10px',
					display: 'inline-block'
				}}
				placeholder="Please select position">
				{this.props.position.map(item => {
					return <Option value={item.id}>{item.name}</Option>
				})}
			</Select>
		)
		const renderDepartment = (
			<Select
				style={{
					marginRight: '100px',
					display: 'inline-block'
				}}
				placeholder="Please select department">
				{this.props.department.map(item => {
					return <Option value={item.id}>{item.name}</Option>
				})}
			</Select>
		)
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		)
		const imageUrl = this.state.preview

		const { getFieldDecorator } = this.props.form

		const prefixSelector = getFieldDecorator('phone', {
			initialValue: '86'
		})(
			<Select style={{ width: 70 }}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		)

		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Item>Configuration</Breadcrumb.Item>
					<Breadcrumb.Item>
						<a href="">Employee Center</a>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Edit Employee</Breadcrumb.Item>
				</Breadcrumb>

				<div className="EmployeeContainer">
					<h2>Edit Employee</h2>

					<h4 style={{ marginLeft: '30px', color: 'blue', marginTop: '30px' }}>
						You can edit Employee basic data by entering one by one using the following form.
					</h4>

					<div style={{ paddingLeft: '2rem' }}>
						<Form onSubmit={this.handleSubmit}>
							<Form.Item>{getFieldDecorator('id')(<Input type="hidden" />)}</Form.Item>
							<Form.Item label="Profile Image">
								{getFieldDecorator('image', {
									rules: [
										{
											required: true,
											message: 'Please upload your image'
										}
									]
								})(
									<Upload
										name="avatar"
										listType="picture-card"
										className="avatar-uploader"
										showUploadList={false}
										action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
										beforeUpload={beforeUpload}
										onChange={this.handleChange}>
										{imageUrl ? <img src={imageUrl} alt="avatar" style={image} /> : uploadButton}
									</Upload>

									// <input type="file" name="image" onChange={this.onChange} />
								)}
							</Form.Item>
						</Form>
					</div>
					<div className="EmployeeFormDivider">
						<img src={psn} style={{ width: '30px', height: '30px', marginRight: '20px' }} />
						<span classname="a3">
							<b>Personal Information</b>
						</span>

						<div
							style={{
								display: 'flex',
								flexwrap: 'wrap',
								marginTop: '20px'
							}}>
							<Form.Item
								style={{
									width: '1000px',
									margin: '0 300px 8px 0',
									display: 'inline-block'
								}}
								label="Code:">
								{getFieldDecorator('code', {
									rules: [
										{
											required: true,
											message: 'Insert Please'
										}
									]
								})(
									<Input
										style={{ marginLeft: '10px', display: 'inline-block' }}
										placeholder="EMP106962"
									/>
								)}
							</Form.Item>

							<Form.Item
								style={{
									width: '1000px',
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
										style={{ marginLeft: '10px', display: 'inline-block' }}
										defaultplaceholder="Min Khant Aung"
									/>
								)}
							</Form.Item>
						</div>

						<div
							style={{
								display: 'flex',
								flexwrap: 'wrap',
								marginTop: '20px'
							}}>
							<Form.Item
								style={{
									margin: '0 300px 8px 0',
									display: 'inline-block'
								}}
								label="NRIC:">
								{getFieldDecorator('nric', {
									rules: [
										{
											required: true,
											message: 'Insert Please'
										}
									]
								})(
									<Input
										style={{ marginLeft: '10px', display: 'inline-block' }}
										placeholder="12/DAKAMA(N)32633"
									/>
								)}
							</Form.Item>

							<Form.Item
								style={{
									margin: '0 300px 8px 0',
									display: 'inline-block'
								}}
								label="Date Of Birth">
								{getFieldDecorator('dob', {
									rules: [
										{
											required: true,
											message: 'Please input your date of birth!'
										}
									]
								})(
									<DatePicker
										style={{
											marginLeft: '10px',
											display: 'inline-block'
										}}
										placeholder="dd/mm/yyyy"
										format="YYYY-MM-DD"
										defaultValue={this.dob}
									/>
								)}
							</Form.Item>
						</div>
					</div>
					<div className="EmployeeFormDivider">
						<img src={parent} style={{ width: '30px', height: '30px', marginRight: '20px' }} />
						<span classname="a3">
							<b>Parent Information</b>
						</span>

						<div
							style={{
								display: 'flex',
								flexwrap: 'wrap',
								marginTop: '20px'
							}}>
							<Form.Item
								style={{
									width: '1000px',
									margin: '0 300px 8px 0',
									display: 'inline-block'
								}}
								label="Father Name:">
								{getFieldDecorator('father_name', {
									rules: [
										{
											required: true,
											message: 'Insert Please'
										}
									]
								})(
									<Input
										style={{ marginLeft: '10px', display: 'inline-block' }}
										placeholder="U Hlaing Myo"
									/>
								)}
							</Form.Item>

							<Form.Item
								style={{
									width: '1000px',
									margin: '0 300px 8px 0',
									display: 'inline-block'
								}}
								label="Mother Name:">
								{getFieldDecorator('mother_name', {
									rules: [
										{
											required: true,
											message: 'Insert Please'
										}
									]
								})(
									<Input
										style={{ marginLeft: '10px', display: 'inline-block' }}
										placeholder="Daw Thin Thin"
									/>
								)}
							</Form.Item>
						</div>
					</div>

					<div className="EmployeeFormDivider">
						<img src={job} style={{ width: '30px', height: '30px', marginRight: '20px' }} />
						<span classname="a3">
							<b>Job Information</b>
						</span>

						<div
							style={{
								display: 'flex',
								flexwrap: 'wrap',
								marginTop: '20px'
							}}>
							<Form.Item
								style={{
									width: '200px',
									margin: '0 300px 8px 0',

									display: 'inline-block'
								}}
								label="Position:">
								{getFieldDecorator('position_id', {
									rules: [
										{
											required: true,
											message: 'Insert Please'
										}
									]
								})(renderPosition)}
							</Form.Item>

							<Form.Item
								style={{
									margin: '0 0 8px 0',
									display: 'inline-block'
								}}
								label="Department:">
								{getFieldDecorator('department_id', {
									rules: [
										{
											required: true,
											message: 'Insert Please'
										}
									]
								})(renderDepartment)}
							</Form.Item>
						</div>

						<div
							style={{
								display: 'flex',
								flexwrap: 'wrap',
								marginTop: '20px'
							}}>
							<Form.Item
								style={{
									margin: '0 300px 8px 0',
									display: 'inline-block',
									display: 'inline-block'
								}}
								label="Start Date:">
								{getFieldDecorator('start_date', {
									rules: [
										{
											required: true,
											message: 'Insert Please'
										}
									]
								})(
									<DatePicker
										style={{
											margin: '0 300px 8px 0',
											display: 'inline-block'
										}}
										placeholder="dd/mm/yyyy"
										format="YYYY-MM-DD"
										defaultValue={this.start_date}
									/>
								)}
							</Form.Item>
						</div>
					</div>
					<div className="EmployeeFormDivider">
						<img src={contact} style={{ width: '30px', height: '30px', marginRight: '20px' }} />
						<span classname="a3">
							<b>Contact Information</b>
						</span>

						<div
							style={{
								display: 'flex',
								flexwrap: 'wrap',
								marginTop: '20px'
							}}>
							<Form.Item
								style={{
									margin: '0 300px 8px 0',
									display: 'inline-block'
								}}
								label="Email:">
								{getFieldDecorator('email', {
									rules: [
										{
											required: true,
											message: 'Insert Please'
										}
									]
								})(
									<Input
										style={{ marginLeft: '10px', display: 'inline-block' }}
										placeholder="minkhantaung@gmail.com"
									/>
								)}
							</Form.Item>

							<Form.Item
								style={{
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
										style={{ marginLeft: '10px', display: 'inline-block' }}
										placeholder="45004463"
									/>
								)}
							</Form.Item>
						</div>

						<div
							style={{
								display: 'flex',
								flexwrap: 'wrap',
								marginTop: '20px'
							}}>
							<Form.Item
								style={{
									margin: '0 300px 8px 0',
									display: 'inline-block'
								}}
								label="Parment Address:">
								{getFieldDecorator('parmanent_address', {
									rules: [
										{
											required: true,
											message: 'Insert Please '
										}
									]
								})(
									<Input
										style={{ marginLeft: '10px', display: 'inline-block' }}
										placeholder="No 5A,Building 6,Sample Street,Dagon,Ygn "
									/>
								)}
							</Form.Item>

							<Form.Item
								style={{
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
										style={{ marginLeft: '10px', display: 'inline-block' }}
										placeholder="No 5A,Building 6,Sample Street,Dagon,Ygn "
									/>
								)}
							</Form.Item>
						</div>
					</div>

					<div className="EmployeeFormDivider">
						<img src={other} style={{ width: '30px', height: '30px', marginRight: '20px' }} />
						<span classname="a3">
							<b>Other Information</b>
						</span>

						<div
							style={{
								display: 'flex',
								flexwrap: 'wrap',
								marginTop: '20px'
							}}>
							<Form.Item
								style={{
									margin: '0 300px 8px 0',
									display: 'inline-block'
								}}
								label="Education:">
								{getFieldDecorator('education', {
									rules: [
										{
											required: true,
											message: 'Insert Please'
										}
									]
								})(
									<Input
										style={{ marginLeft: '10px', display: 'inline-block' }}
										placeholder="B.Sc./ B.Sc.(Hons) in Mathematics, M.Sc. and M.Res. in Mathematics"
									/>
								)}
							</Form.Item>

							<Form.Item
								style={{
									margin: '0 300px 8px 0',
									display: 'inline-block'
								}}
								label="Social Media Link:">
								{getFieldDecorator('social_media_link', {
									rules: [
										{
											required: true,
											message: 'Insert Please'
										}
									]
								})(
									<Input
										style={{ marginLeft: '10px', display: 'inline-block' }}
										placeholder="https://www.facebook.com/Min Khant Aung/"
									/>
								)}
							</Form.Item>
						</div>
					</div>

					<br />
					<br />
					<div>
						<Form {...formItemLayout} onSubmit={this.handleSubmit}>
							<Form.Item {...tailFormItemLayout}>
								<Button
									type="primary"
									htmlType="submit"
									style={{ width: '100px', backgroundcolor: '#4672bb', color: 'white' }}>
									Save
								</Button>

								<Button
									type="primary"
									style={{
										width: '100px',
										marginLeft: '20px',
										backgroundColor: 'white',
										color: 'black'
									}}>
									<Link to="/employee/">Cancel</Link>
								</Button>
							</Form.Item>
						</Form>
					</div>
					<br />
					<br />
				</div>
			</div>
		)
	}
}

const Employee = Form.create()(EditEmployee)

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

export default connect(mapStateToProps, { fetchEmployee, postEmployee, fetchPosition, fetchDepartment })(Employee)
