import React from 'react'
import 'antd/dist/antd.css';
import './index.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Card, Col, Row } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import api from '../../apis'
import PieChart from 'react-minimal-pie-chart';

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
	'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
	'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
	'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
	'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
	'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
	'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
	'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
	'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
	'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

export default class Dashboard extends React.Component {
	state = {
		data: {}
	}


	async componentWillMount() {
		const response = await api.get('/dashboard')
		this.setState({ data: response.data })
	}

	/*
	
	array.map((r,index)=>{
		return(
			<div>
				{r.position} &emsp; <span style={{width :10,height: 10 , backgroundColor: color[index]}} />
			</div>
		)
	})
	
	*/

	render() {
		const { data } = this.state
		return (
			<div>
				<PageHeaderWrapper title="Dashboard" />
				<Row gutter={16}>
					<Col span={8}>
						<Card title="All Employees" bordered={false} extra={data.emp ? data.emp.all : 0}>
							{/* Employees */}
							<Col span={15}>

								{
									data.emp ?
										<PieChart
											label
											style={{ width: "100%", height: "auto" }}
											data={
												data.emp.wPosition.map((value, index) => {
													return { title: value.position, value: value.count, color: colorArray[index] }
												})
											}
										/>

										: ""
								}
							</Col>
							<Col span={9}>
								{
									data.emp ?
										data.emp.wPosition.map((r, index) => {
											return (
												<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
													<div>{r.position}</div><div style={{ width: 10, height: 10, backgroundColor: colorArray[index] }} />
												</div>
											)
										})
										: ""
								}
							</Col>
						</Card>

					</Col>
					<Col span={8}>
						<Card title="Complains" bordered={false} extra={data.comp ? data.comp.all : 0}>
							<Col span={15}>
							{
								data.comp ?
									<PieChart
									label
									style={{ width: "100%", height: "auto" }}
										data={
											data.comp.comStatus.map((value, index) => {
												return { title: value.status, value: value.count, color: colorArray[index + 4] }
											})
										}
									/>
									: ""
							}
							</Col>
							<Col span={9}>
								{
									data.comp ?
										data.comp.comStatus.map((r, index) => {
											return (
												<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
													<div>{r.status}</div><div style={{ width: 10, height: 10, backgroundColor: colorArray[index+4] }} />
												</div>
											)
										})
										: ""
								}
							</Col>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Machines" bordered={false} extra={data.mac ? data.mac.all : 0}>
							<Col span={15}>
							{
								data.mac ?
									<PieChart
									label
									style={{ width: "100%", height: "auto" }}
										data={
											data.mac.macModel.map((value, index) => {
												return { title: value.model, value: value.count, color: colorArray[index + 11] }
											})
										}
									/>
									: ""
							}</Col>
							{
									data.mac ?
										data.mac.macModel.map((r, index) => {
											return (
												<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
													<div>{r.model}</div><div style={{ width: 10, height: 10, backgroundColor: colorArray[index+11] }} />
												</div>
											)
										})
										: ""
								}
							<Col span={9}>
							</Col>
						</Card>
					</Col>
				</Row>

			</div >
		);
	}
}

