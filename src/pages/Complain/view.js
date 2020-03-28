import React from 'react'
import photo from '../../assets/img/cl.svg'
import photo1 from '../../assets/img/custf.svg'
import photo2 from '../../assets/img/d.svg'
import { Col, Row, Form, Avatar, Buttom, Breadcrumb, Card, Button } from 'antd'
import './view.css'
// import { Breadcrumb } from 'antd';
// import { Divider } from 'antd';
// import { Button } from 'antd';
// import { Avatar } from 'antd';
import { Icon } from 'antd'
import api from 'apis' //import { fetchEmployee, putEmployee, postEmployee, deleteEmployee } from '../../actions/Employee'
// import { Card } from 'antd';

// import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom'
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import renderEmpty from 'antd/lib/config-provider/renderEmpty'
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
		this.getData()
	}
	async getData() {
		const response = await api.get(`complain/${this.state.id}`)
		if (response && response.status == 200) {
			this.setState({ data: response.data.data })
		}
	}
	render() {
		const data = this.state.data

		return (
			<div>
				<h3>
					<div style={{ color: '#4672bb' }}>View Complain</div>
				</h3>
				<br />

				<div style={{ fontSize: '10.5 px' }}>
					An expression of dissactisfaction made to an organization related to its products or services or the
					complaints-handling process itself where a response or resolution is explicity or implicity
					expected.
				</div>

				<br />

				<Card className="ComplainContainer">
					<img
						src={photo}
						style={{ width: '40px', height: '40px', fontSize: '80px', color: 'black', marginRight: '20px' }}
					/>
					<span className="a1">
						<b>Complain Information</b>
					</span>
					<div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
						<Row style={{ marginBotton: '40px' }}>
							<Col span={16}>
								<h3>
									<span className="ComplainHeaderSpan">Complain No:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.complain_no}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="ComplainHeaderSpan">Model no:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.mod_no}</span>
							</Col>
						</Row>
						<Row style={{ marginBotton: '20px', marginTop: '40px' }}>
							<Col span={16}>
								<h3>
									<span className="ComplainHeaderSpan">Warranty:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.wyear}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="ComplainHeaderSpan">Warranty Description:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.description}</span>
							</Col>
						</Row>
						<Row style={{ marginBotton: '20px', marginTop: '40px' }}>
							<Col span={16}>
								<h3>
									<span className="ComplainHeaderSpan">FUP No:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.fup_no}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="ComplainHeaderSpan">Working Hour:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.workinghr}</span>
							</Col>
						</Row>
					</div>
				</Card>
				<br />
				<br />

				<Card className="ComplainContainer">
					<img
						src={photo1}
						style={{ width: '40px', height: '40px', fontSize: '70px', color: 'black', marginRight: '20px' }}
					/>
					<span className="a1">
						<b>Customer Information</b>
					</span>
					<div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
						<Row style={{ marginBotton: '40px', marginTop: '20px' }}>
							<Col span={16}>
								<h3>
									<span className="ComplainHeaderSpan">Customer Name:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.customer_name}</span>
							</Col>

							<Col span={8}>
								<h3>
									<span className="ComplainHeaderSpan">Customer Ph No:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.customer_phno}</span>
							</Col>
						</Row>

						<Row style={{ marginBotton: '20px', marginTop: '60px' }}>
							<Col span={16}>
								<h3>
									<span className="ComplainHeaderSpan">Distance:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.distance}</span>
							</Col>
							<Col span={8}>
								<h3>
									<span className="ComplainHeaderSpan">Location:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.location}</span>
							</Col>
						</Row>
					</div>
				</Card>
				<br />
				<br />
				<Card className="ComplainContainer">
					<img
						src={photo2}
						style={{ width: '40px', height: '40px', fontSize: '70px', color: 'black', marginRight: '20px' }}
					/>
					<span className="a1">
						<b>Job Information</b>
					</span>
					<div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
						<Row style={{ marginBotton: '40px', marginTop: '30px' }}>
							<Col span={16}>
								<h3>
									<span className="ComplainHeaderSpan">Job Title:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.complain_job_title}</span>
							</Col>

							<Col span={8}>
								<h3>
									<span className="ComplainHeaderSpan">Department:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.dep_name}</span>
							</Col>
						</Row>
						<Row style={{ marginBotton: '20px', marginTop: '40px' }}>
							<Col span={16}>
								<h3>
									<span className="ComplainHeaderSpan">Complain Job Title:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.job_title}</span>
							</Col>

							<Col span={8}>
								<h3>
									<span className="ComplainHeaderSpan">Description:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.job_description}</span>
							</Col>
						</Row>
						<Row style={{ marginBotton: '20px', marginTop: '40px' }}>
							<Col span={16}>
								<h3>
									<span className="ComplainHeaderSpan">Date:</span>
								</h3>
								<span style={{ color: 'blue', marginLeft: '10px' }}>{data.date}</span>
							</Col>
						</Row>
					</div>
				</Card>
				<br />
				<br />

				<Row style={{ marginLeft: '35%', marginTop: '10px' }}>
					<Button style={{ width: '100px', height: '30px', backgroundColor: '#4672bb', color: 'white' }}>
						<Link style={{ display: 'block', color: '#ffffff' }} to={'/complains/edit/' + data.id}>
							Edit
						</Link>
					</Button>

					<Link to="/complains">
						<Button
							style={{
								fontSize: '15',
								color: 'black',
								height: '30px',
								width: '100px',
								marginLeft: '20px'
							}}>
							Cancel
						</Button>
					</Link>
				</Row>
			</div>
		)
	}
}

export default view
