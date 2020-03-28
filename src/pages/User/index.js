// 

import React from 'react';
import { Table, Divider, Tag, Card } from 'antd';
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { Input, Popconfirm } from 'antd';
import { Link, Route } from 'react-router-dom'
import { fetchUser, putUser, postUser, deleteUser } from '../../actions/User'
import { connect } from "react-redux";
//  import './employee.css';
import { PageHeader, Typography } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
// const middleware = [routerMiddleware(history)];
import { Select, Icon } from 'antd';
import history from '../../router/history'

const uuidv4 = require('uuid/v4');

const Search = Input.Search;
const { Paragraph } = Typography;
const { Option } = Select;



const routes = [


  {
    path: 'user',
    breadcrumbName: 'Account Creation',
    fontColor: '#4672bb'
  }

];

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }


  componentDidMount() {
    this.getAllUsers();
    console.log(this.props.user)
  }

  getAllUsers() {
    console.log(this.props.fetchUser())
  }

  getUserbyId(id) {
    this.props.fetchUser(id);
  }
  btnClickAdd = () => {
    history.push('/user/create')
  }

  delete = key => {
    const newData = this.props.user;
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    this.deleteUser(item.id);
    // message.success('Deleted !');
  };

  deleteUser = (id) => {
    this.props.deleteUser(id);
  }




  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'user_name',
        key: 'user_name',
        align: 'center',
        editable: true,

        width: '100',
        sortDirections: ['ascend', 'descend'],
        dataIndex: 'user_name',
        sorter: (a, b) => a.user_name.length - b.user_name.length
      },

      {
        title: 'Email',
        dataIndex: 'email',
        width: '100',
        align: 'center',
        key: 'email',

        sorter: (a, b) => a.email.length - b.email.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
      },
      {
        title: 'Phone No',
        dataIndex: 'phone_number',
        width: '100',
        align: 'center',
        key: 'phone',
      },
      {
        title: 'NRIC',
        dataIndex: 'nric',
        width: '100',
        align: 'center',
        key: 'nric',
      },
      {
        title: 'Code',
        dataIndex: 'code',
        width: '100',
        align: 'center',
        key: 'posname',
      },
      {
        title: 'Action',
        key: 'action',

        align: 'center',
        width: '100',
        render: (text, record) => (
          <span>
            <Link
              to={"/user/view/" + record.id} style={{ color: 'green' }}>
              View
              </Link>
            <Divider type="vertical" />

            {/* <Link to={"/user/edit/" + record.id} style={{ color: 'blue' }} >

              Edit
              </Link>
            <Divider type="vertical" /> */}
            <Popconfirm
              title="Are you sure delete?"
              onConfirm={() => this.delete(record.key)}
              okType="danger"
            >
              <a style={{ color: '#ff3333' }}>Delete</a>
            </Popconfirm>
          </span>
        ),

      }




    ];
    let dataSource = this.props.user;
    console.log("Daaa", dataSource);

    dataSource.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div className='wrap'>
        <PageHeaderWrapper title="Account Creation" >

          <h5>Payment methods used in a modern business context include cash,checks,credits or debit cards,money orders.</h5></PageHeaderWrapper>
         <Card>
          <Button type="primary" style={{ height: '100%', width: '200px', height: '50px', backgroundColor: '#4672bb' }}onClick={this.btnClickAdd}>Create New Account</Button>
          <div>
            <Search placeholder="Search" onSearch={value => console.log(value)} style={{ width: 200, float: 'right',marginBottom:'20px',marginTop:'30px'}} />
          
          </div>

        <div className='twrap'>
          <Table className='ant-table-thead ant-table-tbody ant-table'
            dataSource={dataSource}
            columns={columns}

          />
        </div></Card>
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
    user: state.user.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchUser, postUser, putUser, deleteUser }
)(User);
