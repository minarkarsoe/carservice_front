//react
import React from 'react'
import QueueAnim from 'rc-queue-anim'
import history from '../../router/history'
//redux
import { connect } from 'react-redux'
import { signIn, currentUser } from '../../actions/Auth'
//ant
import { Button, Form, Input, Checkbox } from 'antd'
//image
//import logo from '../../image/logo.png'
//css
import styles from './index.module.less'
// import profile from '../../assets/img/profile.svg'
import profile from '../../assets/img/logo.png'
import bg from '../../assets/img/login.jpg'

const FormItem = Form.Item

class Login extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		if (this.props.isSignedIn) {
			history.push('/')
		}
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.signIn(values)
			}
		})
	}
	render() {
		const { getFieldDecorator } = this.props.form
		const { isloaded } = this.props

		return (
			<React.Fragment>
				<div
					style={{
						borderColor: 'white',
						borderStyle: 'none',
						borderWidth: '0.6px',
						backgroundPosition: 'calc(50% + 5px) center',
						backgroundSize: 'cover',
						backgroundColor: '#f5f5f5',
						// backgroundImage: `url('${bg}')`,
						width: '100vw',
						height: '100vh'
					}}>
					{/* <img src={} style={{ width: '100%', height: '100%' }} /> */}
					<div
						className={styles.form}
						style={{
							borderColor: 'black',
							borderRadius: '10px',
							borderWidth: '0.6px',
							backgroundColor: '#ffffff',
							left: '50%,',
							top: '50%,',
							position: 'absolute',
							transform: 'translate(-50%, -50%)',
							margin: 0,
							padding: '2rem',
							boxShadow: '0px 4px 5px 0px #dedede'
						}}>
						<img
							src={profile}
							style={{
								width: '177px',
								height: 'auto',
								position: 'relative',
								margin: '0px auto',
								display: 'block',
								top: '-.5em',
								left: '-4px'
							}}
						/>
						<form layout="vertical" onSubmit={this.handleSubmit}>
							<QueueAnim delay={200} type="top">
								<FormItem key="1">
									{getFieldDecorator('email', {
										rules: [
											{
												type: 'email',
												message: 'The input is not valid E-mail!'
											},
											{
												required: true,
												message: 'Required username'
											}
										]
									})(<Input placeholder="User name or email" />)}
								</FormItem>
								<FormItem key="2">
									{getFieldDecorator('password', {
										rules: [
											{
												required: true,
												message: 'Required password'
											}
										]
									})(<Input.Password placeholder="input password" />)}
								</FormItem>
								<FormItem key="3">
									{/* {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: false,
                  })(<Checkbox style={{color:'white'}}>Remember me</Checkbox>)} */}
									<Button
										style={{
											backgroundColor: '#6777ef',
											color: 'white',
											border: '#6777ef',
											width: '100px',
											boxShadow: '0 2px 6px #6777ef'
										}}
										htmlType="submit"
										size="default"
										loading={isloaded}>
										Login
									</Button>
								</FormItem>
							</QueueAnim>
						</form>
					</div>
				</div>
			</React.Fragment>
		)
	}
}
function mapStateToProps(state) {
	return {
		lang: state.locale.lang,
		isSignedIn: state.auth.isSignedIn,
		roleid: state.auth.roleid,
		isloaded: state.loading.isloaded,
		employee: state.employee.list
	}
}
export default connect(mapStateToProps, { signIn, currentUser })(Form.create()(Login))
