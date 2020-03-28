// 

import React from 'react';
import { Table, Divider, Tag, Card } from 'antd';
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { Input, Popconfirm } from 'antd';
import { Link, Route } from 'react-router-dom'
import { fetchComplain, putComplain, postComplain, deleteComplain } from '../../actions/Complain'
import { connect } from "react-redux";
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
//  import './employee.css';
import { PageHeader, Typography } from 'antd';
// const middleware = [routerMiddleware(history)];
import { Select, Icon } from 'antd';
import history from '../../router/history'

const uuidv4 = require('uuid/v4');

const { Search } = Input;
const { Paragraph } = Typography;
const { Option } = Select;



const routes = [
  // {
  //   path: 'Configuration',
  //   breadcrumbName: 'Configuration'
  // },

  {
    path: 'Complains',
    breadcrumbName: 'Complain',
    fontColor: '#4672bb'
  }

];

class Complain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }


  componentDidMount() {
    this.getAllComplain();
  }

  getAllComplain() {
    this.props.fetchComplain()
  }

  getComplainbyId(id) {
    this.props.fetchComplain(id);
  }
  btnClickAdd = () => {
    history.push('/complains/create')
  }

  delete = key => {
    const newData = this.props.complain;
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    this.deleteComplain(item.id);
    // message.success('Deleted !');
  };

  deleteComplain = (id) => {
    this.props.deleteComplain(id);
  }




  render() {
    const columns = [
      {
        title: 'Complain NO',
        dataIndex: 'complain_no',
        key: 'complain_no',
        align: 'center',
        editable: true,
        fixed: 'left',
        width: '150px',
        sortDirections: ['ascend', 'descend'],
        dataIndex: 'complain_no',
        sorter: (a, b) => a.complain_no.length - b.complain_no.length
      },

      {
        title: 'Model No',
        dataIndex: 'mod_no',
        width: '150px',
        align: 'center',
        key: 'mod_no',
        fixed: 'left',
        sorter: (a, b) => a.model_no.length - b.model_no.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
      },

      {
        title: 'FUP No',
        dataIndex: 'fup_no',
        key: 'fup_no',
        align: 'center',
        editable: true,
        fixed: 'left',
        width: '150px',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.FUP_no.length - b.FUP_no.length
      },

      {
        title: 'Warranty',
        dataIndex: 'wyear',
        key: 'wyear',
        align: 'center',
        width: '150px',
        editable: true,

        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },



      {
        title: 'Working Hour',
        dataIndex: 'workinghr',
        key: 'working_hr',
        align: 'center',
        width: '150px',
        editable: true,

        key: '3',
        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },

      {
        title: 'Customer Name',
        dataIndex: 'customer_name',
        key: 'customer_name',
        align: 'center',
        width: '200px',
        editable: true,

        key: '4',
        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },

      {
        title: 'Distance',
        dataIndex: 'distance',
        key: 'distance',
        align: 'center',
        width: '200px',
        editable: true,

        key: '5',
        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },

      {
        title: 'Customer Phno',
        dataIndex: 'customer_phno',
        key: 'Wcustomer_phno',
        align: 'center',
        width: '200px',
        editable: true,

        key: '6',
        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },

      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        align: 'center',
        width: '200px',
        editable: true,

        key: '7',
        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },

      {
        title: 'Job Title',
        dataIndex: 'job_title',
        key: 'job_title',
        align: 'center',
        width: '200px',
        editable: true,

        key: '8',
        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },

      {
        title: 'Complain Job Title',
        dataIndex: 'complain_job_title',
        key: 'complain_job_title',
        width: '200px',
        align: 'center',
        editable: true,

        key: '9',
        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },

      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: '200px',
        align: 'center',
        editable: true,

        key: '10',
        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },


      {
        title: 'Department',
        dataIndex: 'dep_name',
        key: 'department',
        align: 'center',
        editable: true,
        width: '200px',

        key: '11',
        //sortDirections: ['ascend', 'descend'],
        //sorter: (a, b) => a.name.length - b.name.length
      },



      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        width: '200px',
        editable: true,

        key: '12',
        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },

      {
        title: 'Job Description',
        dataIndex: 'job_description',
        key: 'job_description',
        editable: true,
        width: '200px',
        align: 'center',
        key: '13',

        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.name.length - b.name.length
      },

      {
        title: 'Action',
        key: 'action',

        align: 'center',
        width: '200px',
        render: (text, record) => (
          <span>
            <Link
              to={"/complains/view/" + record.id} style={{ color: 'green' }}>
              View
              </Link>
            <Divider type="vertical" />

            <Link to={"/complains/edit/" + record.id} style={{ color: 'blue' }} >

              Edit
              </Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete?"
              onConfirm={() => this.delete(record.key)}
              okType="danger"
            >
              <a style={{ color: '#ff3333' }}>Delete</a>
            </Popconfirm>
          </span>
        ),
        fixed: 'right'
      }




    ];
    let dataSource = this.props.complain;
    console.log("Daaa", dataSource);

    dataSource.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div className='wrap'>
        <Can
          role="Admin"
          perform="position:list"
          no={() => {
            return <Forbidden />
          }}
        >
         <PageHeaderWrapper title="Complain">

          <h5>You can add Complain basic data by one after clicking the Add New button and can see the employees' data in table.</h5></PageHeaderWrapper>
        <Card>
        <Button type="primary" style={{ height: '100%', width: '200px', height: '50px', backgroundColor: '#4672bb' }}onClick={this.btnClickAdd}>
 Create New Complain</Button><br></br>
          
            <div>
            <Search placeholder="Search" onSearch={value => console.log(value)} style={{ width: 200, float: 'right',marginBottom:'20px',marginTop:'30px'}} />
          
          </div>
        <div className='twrap'>
          <Table className='ant-table-thead ant-table-tbody ant-table'
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: 2800 }}
          />
        </div>
        </Card>
        </Can>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    complain: state.complain.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchComplain, postComplain, putComplain, deleteComplain }
)(Complain);
