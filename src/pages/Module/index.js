import React from 'react';
import { Table, Divider, Tag } from 'antd';
//component
import { getUserInfo, getUserToken } from '../../utils';

import { Button, Row, Breadcrumb } from 'antd';

import ScrollTable from './CustomScrollTable';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';

import history from '../../router/history'
import { Input, Popconfirm } from 'antd';
import { PageHeader } from 'antd';
import { Typography } from 'antd';
import { Link } from 'react-router-dom'

import { fetchModule, putModule, postModule, deleteModule } from '../../actions/Module';
import { connect } from "react-redux";

const uuidv4 = require('uuid/v4');
const Search = Input.Search;
const { Paragraph } = Typography;


const routes = [
  {
    path: 'Configuration',
    breadcrumbName: 'Configuration'
  },

  {
    path: '/module',
    breadcrumbName: 'Module'
  }

];

class Module extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.getAllModule();

  }



  getAllModule() {
    this.props.fetchModule();
  }

  //
  editModule = (data, id) => {
    this.props.putModule(data, id);
  }

  //
  btnClickAdd = () => {
    history.push('/module/create')
  }

  // to create new Machine


  getModulebyId(id) {
    this.props.fetchModule(id);
  }

  delete = key => {
    const newData = [...this.props.modules];
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    if (index != 0) {
      this.deleteModule(item.id);
    }
    // message.success('Deleted !');
  };


  deleteModule = (id) => {
    this.props.deleteModule(id);
  }


  editModule = (data, id) => {
    this.props.putModule(data, id);
  }



  createNewModule = (data) => {
    let userInfo = getUserInfo();
    data.created_by = "admin";
    data.updated_by = '';
    this.props.postModule(data);
  }



  render() {
    const columns = [
      {
        title: 'Module Name',
        dataIndex: 'modulename',
        key: 'modulename',
        align: 'center',
        editable: true,
        width: '20%'
      },
      {
        title: 'Controller Name',
        dataIndex: 'ename',
        align: 'center',
        key: 'ename',
        width: '20%',
        editable: true

      },
      {
        title: 'Action Name',
        dataIndex: 'action',
        align: 'center',
        key: 'action',
        width: '20%',
        editable: true
      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        align: 'center',
        key: 'remark',
        width: '20%',
        editable: true
      }
  
    ];
    let data = this.props.modules;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    const perform = {
      create: "module:create",
      edit: "module:edit",
      view: "module:view"
    }

    const newData = {
      module_name: "",
      controller_name: "",
      action_name: ""
    }
    return (
      <div>
        <Can
          role="Admin"
          perform="module:list"
          no={() => {
            return <Forbidden />;
          }}>
          <PageHeaderWrapper title='Module'>
          <h5>Design innovative and robust business models for your organization or a new project in just 3days.</h5>

            </PageHeaderWrapper> 
          <ScrollTable
            dataSource={data}
            columns={columns}
            // title="Module List"
            role="Admin"
            perform={perform}
            newData={newData}
            getData={this.getAllMachine}
            editData={(data, id) => this.editModule(data, id)}
            createNewData={(data) => this.createNewModule(data)}
            deleteData={(id) => this.deleteModule(id)}
          />
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
    modules: state.module.list
  };
}
export default connect(
  mapStateToProps,
  { fetchModule, putModule, postModule, deleteModule }
)(Module);