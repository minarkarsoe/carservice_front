import React from 'react';
import ScrollTable from './custometable';
import { fetchEmployee, putEmployee, postEmployee, deleteEmployee } from '../../actions/Employee'
import { connect } from "react-redux";
import './employee.css';
import { Typography } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
const uuidv4 = require('uuid/v4');

const { Paragraph } = Typography;

const routes = [
	{
		path: 'Configuration',
		breadcrumbName: 'Configuration'
	},

	{
		path: 'Employees',
		breadcrumbName: 'Employee',
		fontColor: '#4672bb'
	}

];

class Employee extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		this.getAllEmployee();
	}

	getAllEmployee() {
		console.log(this.props.fetchEmployee())
	}

	getEmployeebyId(id) {
		this.props.fetchEmployee(id);
	}
	delete = key => {
		const newData = this.props.employees;
		const index = newData.findIndex(item => key === item.key);
		const item = newData[index];

		this.deleteEmp(item.id);
		// message.success('Deleted !');
	};

	deleteEmp = (id) => {
		this.props.deleteEmployee(id);
	}

	render() {
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				align: 'center',
				width: 100,
				key: 'name',
				editable: true,
				sorter: (a, b) => a.name.length - b.name.length,
				sortDirections: ['ascend', 'descend'],
				fixed: 'left'

			},
			{
				title: 'NRIC',
				dataIndex: 'nric',
				align: 'center',
				key: 'nric',
				editable: true,
				width: 100,
				filters: [
					{
						text: 'DaKaMa',
						value: '12/DaKaMa',
					},
					{
						text: 'ThaKaTa',
						value: '12/ThaKaTa',
					},
					{
						text: 'ThaMaNa',
						value: '12/ThaMaNa',
					}
				],
				fixed: 'left',
				onFilter: (value, record) => record.nric.indexOf(value) === 0
			},
			{
				title: 'Position',
				dataIndex: 'posname',
				align: 'center',
				key: 'posname',
				editable: true,
				width: 100,
				filters: [
					{
						text: 'service',
						value: 'service'
					},
					{
						text: 'management',
						value: 'management'
					}
				],
				fixed: 'left',
				onFilter: (value, record) => record.posname.indexOf(value) === 0
			},
			{
				title: 'Department',
				dataIndex: 'depname',
				key: 'depname',
				align: 'center',
				editable: true,
				width: 100,
				filters: [
					{
						text: 'service',
						value: 'service'
					},
					{
						text: 'management',
						value: 'management'
					}
				],

				onFilter: (value, record) => record.depname.indexOf(value) === 0
			},
			{
				title: 'StartDate',
				dataIndex: 'start_date',
				key: 'start_date',
				editable: true,
				align: 'center',
				width: 150,
				sortDirections: ['descend', 'ascend'],
				sorter: (a, b) => { var as = a.start_date.replace(/[-]/g, ''); var bs = b.start_date.replace(/[-]/g, ''); return as - bs; }
			},
			{
				title: 'Address',
				dataIndex: 'parmanent_address',
				align: 'center',
				key: 'parmanent_address',
				editable: true,
				width: 200,
				sorter: (a, b) => a.parmanent_address.length - b.parmanent_address.length,
				sortDirections: ['descend', 'ascend']

			},
			{
				title: 'Phone No',
				dataIndex: 'phone',
				key: 'phone',
				width: 150,
				align: 'center',
				editable: true,
				defaultSortOrder: 'descend',
				sortDirections: ['descend', 'ascend'],
				sorter: (a, b) => a.phone.length - b.phone.length,
			},
			{
				title: 'Code',
				dataIndex: 'code',
				key: 'code',
				width: 150,
				align: 'center',
				editable: true,
			},
			{
				title: 'DateofBirth',
				dataIndex: 'dob',
				key: 'dob',
				width: 150,
				align: 'center',
				editable: true,
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
				width: 150,
				align: 'center',
				editable: true,
			},
			{
				title: 'Education',
				dataIndex: 'education',
				key: 'education',
				width: 250,
				align: 'center',
				editable: true,
			},
			{
				title: 'Social Media Link',
				dataIndex: 'social_media_link',
				key: 'social_media_link',
				width: 200,
				align: 'center',
				editable: true,
			},
			{
				title: 'Father Name',
				dataIndex: 'father_name',
				key: 'father_name',
				width: 150,
				align: 'center',
				editable: true,
			},
			{
				title: 'Mother Name',
				dataIndex: 'mother_name',
				key: 'mother_name',
				width: 150,
				align: 'center',
				editable: true,
			},
		];
		const perform = {
			create: "employee:create",
			edit: "employee:edit"
		}
		let dataSource = this.props.employees;
		dataSource.map(d => {
			let uuid = uuidv4();
			d.key = uuid;
		})

		return (
			<div>
				<Can
					role="Admin"
					perform="employee:list"
					no={() => {
						return <Forbidden />
					}}
				>
					<PageHeaderWrapper title="Employee">
						<h5>You can add Employee basic data by one after clicking the Add New button and can see the employees' data in table.</h5>
					</PageHeaderWrapper>
					<ScrollTable
						role="Admin"
						perform={perform}
						dataSource={dataSource}
						columns={columns}
						scroll={{ x: 2350 }}
					/>
				</Can>
			</div>
		)
	};
}

function mapStateToProps(state) {
	return {
		lang: state.locale.lang,
		isSignedIn: state.auth.isSignedIn,
		roleid: state.auth.roleid,
		isloaded: state.loading.isloaded,
		employees: state.employee.list,
	};
}
export default connect(
	mapStateToProps,
	{ fetchEmployee, postEmployee, putEmployee, deleteEmployee }
)(Employee);
