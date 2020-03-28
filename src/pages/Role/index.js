import React from 'react';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import EditableTable from './CustomTable';
import { getUserInfo, getUserToken } from '../../utils';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import { fetchRole, putRole, postRole, deleteRole } from '../../actions/Role';
import { connect } from "react-redux";

const uuidv4 = require('uuid/v4');


class Role extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.getAllRole();
  }

  getAllRole() {
    console.log(this.props.fetchRole())
  }

  //update position
  editRole = (data, id) => {
    this.props.putRole(data, id);
  }

  // to create new position
  createNewRole = (data) => {
    let userInfo = getUserInfo();
    data.created_by = "admin";
    data.updated_by = '';
    this.props.postRole(data);
  }

  // to delete position
  deleteRole = (id) => {
    this.props.deleteRole(id);
  }

  render() {
    const columns = [
      {
        title: 'Role Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        editable: true,
        width: '20%',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '65%',
        align: 'center',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
      },
      {
        title: 'Created at',
        dataIndex: 'created_at',
        width: '65%',
        align: 'center',
        key: 'created_at',
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
      }
    ];
    const perform = {
      create: "role:create",
      edit: "role:edit"
    }
    const newData = {
      title: "",
      description: "",
      created_at: ""
    }

    let data = this.props.role;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div>
        <Can
          role="Admin"
          perform="role:list"
          no={() => {
            return <Forbidden />
          }}
        >
          <PageHeaderWrapper title='Role'>
          <h5>A place where someone or something is located or has been put in the any area.</h5>
          </PageHeaderWrapper>
          <EditableTable
            dataSource={data}
            columns={columns}
            // title="Role List"
            role="Admin"
            perform={perform}
            newData={newData}
            getData={this.getAllRole}
            editData={(data, id) => this.editRole(data, id)}
            createNewData={(data) => this.createNewRole(data)}
            deleteData={(id) => this.deleteRole(id)}
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
    role: state.role.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchRole, putRole, postRole, deleteRole }
)(Role);
