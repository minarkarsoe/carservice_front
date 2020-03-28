// 

import React from 'react';
import { Table, Divider, Tag } from 'antd';
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { Input, Popconfirm } from 'antd';
import { Link, Route } from 'react-router-dom'
import { fetchUserrole, postUserrole, deleteUserrole } from '../../actions/UserRole'
import { fetchUser } from '../../actions/User'
import { connect } from "react-redux";
//  import './employee.css';
import { PageHeader, Typography } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
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
    this.getAllUserrole();
    console.log(this.props.user)
  }

  getAllUserrole() {
    console.log(this.props.fetchUserrole())
    this.props.fetchUser()
  }

  getUserrolebyId(id) {
    this.props.fetchUserrole(id);
  }
  btnClickAdd = () => {
    history.push('/userrole/create')
  }

  delete = key => {
    const newData = this.props.userrole;
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    this.deleteUserrole(item.id);
    // message.success('Deleted !');
  };

  deleteUserrole = (id) => {
    this.props.deleteUserrole(id);
  }




  render() {
    const columns = [
      {
        title: 'User Name',
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
        title: 'Role Name',
        dataIndex: 'name',
        width: '100',
        align: 'center',
        key: 'name',

        sorter: (a, b) => a.email.length - b.email.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
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
    let dataSource = this.props.userrole;
    console.log("Daaa", dataSource);

    dataSource.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div className='wrap'>
        <PageHeaderWrapper title="User For Role"  >

          <h5>Payment methods used in a modern business context include cash,checks,credits or debit cards,money orders.</h5></PageHeaderWrapper>

          <Button style={{ backgroundColor: '#4672bb' }} type="primary" size="large" onClick={this.btnClickAdd}>Create New Account</Button><br></br><br></br>
          <div>
            <Search placeholder="Search" onSearch={value => console.log(value)} style={{ width: 200, float: 'right',marginBottom:'20px',marginTop:'30px'}} />
          
          </div>

        
 
        <div className='twrap'>
          <Table className='ant-table-thead ant-table-tbody ant-table'
            dataSource={dataSource}
            columns={columns}


          // pagination={{ defaultPageSize:1, pageSizeOptions:['1','2','3']}}

          />
        </div>
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
    userrole: state.userrole.list
  };
}
export default connect(
  mapStateToProps,
  {
    fetchUser, fetchUserrole, postUserrole, deleteUserrole
  }
)(User);