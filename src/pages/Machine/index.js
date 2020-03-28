import React from 'react';
import { Table, Divider, Tag, Card } from 'antd';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
//component
import { getUserInfo, getUserToken } from '../../utils';

import { Button, Row, Breadcrumb } from 'antd';

// import ScrollTable from '../../components/InlineCustomTable/CustomScrollTable';

import './index.css'

import history from '../../router/history'
import { Input, Popconfirm } from 'antd';
import { PageHeader } from 'antd';
import { Typography } from 'antd';
import { Link } from 'react-router-dom'

import { fetchMachine, putMachine, postMachine, deleteMachine } from '../../actions/Machine';
import { connect } from "react-redux";

const uuidv4 = require('uuid/v4');
const Search = Input.Search;
const { Paragraph } = Typography;


const routes = [
  // {
  //   path: 'Configuration',
  //   breadcrumbName: 'Configuration'
  // },

  {
    path: '/machine',
    breadcrumbName: 'Machines'
  }

];

class Machine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.getAllMachine();

  }



  getAllMachine() {
    this.props.fetchMachine();
  }

  //
  editMachine = (data, id) => {
    this.props.putMachine(data, id);
  }

  //
  btnClickAdd = () => {
    history.push('/machine/create')
  }

  // to create new Machine
  createNewMachine = (data) => {
    let userInfo = getUserInfo();
    data.created_by = "admin";
    data.updated_by = '';
    this.props.postMachine(data);
  }

  getMachinebyId(id) {
    this.props.fetchMachine(id);
  }

  delete = key => {
    const newData = [...this.props.machines];
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    if (index != 0) {
      this.deleteMachine(item.id);
    }
    // message.success('Deleted !');
  };

  // to delete machine
  deleteMachine = (id) => {
    this.props.deleteMachine(id);
  }

  //update machine
  editMachine = (data, id) => {
    this.props.putMachine(data, id);
  }


  // to create new machine
  createNewMachine = (data) => {
    let userInfo = getUserInfo();
    data.created_by = "admin";
    data.updated_by = '';
    this.props.postMachine(data);
  }



  render() {
    const columns = [
      {
        title: 'Model_No',
        dataIndex: 'mod_no',
        key: 'mod_no',
        align: 'center',
        editable: true,
        fixed: 'left',
        width:'150px',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.mod_no.length - b.mod_no.length
      },
      {
        title: 'Machine_Serial_No',
        dataIndex: 'machine_serial_no',
        align: 'center',
        key: 'machine_serial_no',
        editable: true,
        fixed: 'left',
        width:'150px',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.machine_serial_no.length - b.machine_serial_no.length
      },
      {
        title: 'Engine_Serial_No',
        dataIndex: 'machine_engine_serial_no',
        align: 'center',
        width:'150px',
        key: 'machine_engine_serial_no',
        editable: true
      },
      {
        title: 'FUP No',
        dataIndex: 'fup',
        align: 'center',
        width:'150px',
      },
      {
        title: 'Warranty Year',
        dataIndex: 'wyear',
        align: 'center',
        width:'200px',
        // sorter: (a, b) => {var as=a.sdate.replace(/[-]/g,'');var bs=b.sdate.replace(/[-]/g,'');return as - bs ;}
      },
      {
        title: 'Working Hour',
        dataIndex: 'workinghr',
        align: 'center',
        width:'150px',
      },
      {
        title: 'Location',
        dataIndex: 'location',
        align: 'center',
        width:'300px',
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        width:'200px',
        render: (text, record) => (
          <span>
            <Link
              to={"machine/view/" + record.id} style={{ color: 'green' }}>
              View
            </Link>
            <Divider type="vertical" />

            <Link to={"machine/edit/" + record.id} style={{ color: 'blue' }} >

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

  

    let dataSource = this.props.machines;
    dataSource.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    const newData = {
      mod_no: "",
      fup: "",
      machine_serial_no: "",
      machine_engine_serial_no: "",
      wyear: "",
      workinghr: "",
      location: ""
    }

    return (
      <div className='wrap'>
  <Can                    
          role="Admin"
          perform="position:list"
          no={() => {
            return <Forbidden />
          }}
        >
       <PageHeaderWrapper title="Machine">

          <h4 style={{marginBottom:'20px'}}>You can add Machine basic data by one after clicking the Add New button and can see the machine data in table.</h4>
          </PageHeaderWrapper>
          <Card>
          <Button type="primary" style={{ height: '100%', width: '200px', height: '50px', backgroundColor: '#4672bb' }}>
            <Link style={{ color: '#ffffff',marginTop:"50px" }} to={'/machine/create'}>
              Create New Machine
            </Link>
          </Button>

          <div>
            <Search placeholder="Search" onSearch={value => console.log(value)} style={{ width: 200, float: 'right',marginBottom:'20px',marginTop:'30px'}} />
            </div>
        
        <div >
          <Table className='ant-table-thead ant-table-tbody ant-table'
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: 1150 }}
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
    machines: state.machine.list
  };
}
export default connect(
  mapStateToProps,
  { fetchMachine, putMachine, postMachine, deleteMachine }
)(Machine);