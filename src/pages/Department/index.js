import React from 'react';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import EditableTable from '../../components/InlineCustomTable/CustomTable';
import { getUserInfo, getUserToken } from '../../utils';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import { fetchDepartment, putDepartment, postDepartment, deleteDepartment } from '../../actions/Department';
import { connect } from "react-redux";
const uuidv4 = require('uuid/v4');


class Department extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.getAllDepartment();
  }

  getAllDepartment() {
    console.log(this.props.fetchDepartment())
  }


  editDepartment = (data, id) => {
    this.props.putDepartment(data, id);
  }

  createNewDepartment = (data) => {
    let userInfo = getUserInfo();
    data.created_by = "admin";
    data.updated_by = '';
    this.props.postDepartment(data);
  }

  deleteDepartment = (id) => {
    this.props.deleteDepartment(id);
  }

  render() {
    const columns = [
      {
        title: 'Department_name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        editable: true,
        width: '20%',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.Department_name.length - b.Department_name.length
      },
      {
        title: 'Code',
        dataIndex: 'dcode',
        width: '40%',
        align: 'center',
        key: 'Code',
        sorter: (a, b) => a.Code.length - b.Code.length,
        sortDirections: ['ascend', 'descend'],
        editable: true
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        editable: true,
        sorter: (a, b) => a.Position.length - b.Position.length,
        sortDirections: ['ascend', 'descend'],
        width: '20%',



        // sortDirections: ['ascend', 'descend'],
        // sorter: (a, b) => a.position.length - b.position.length
      }


    ];
    const perform = {
      create: "department:create",
      edit: "department:edit",
      title: "CreateNewDepartment"
    }
    const newData = {
      name: "",
      Code: "",
      description: ""
    }

    let data = this.props.departments;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
      console.log("KEY: " + d.key);
    })

    return (
      <div>
        <Can
          role="Admin"
          perform="department:list"
          no={() => {
            return <Forbidden />
          }}
        >
           <PageHeaderWrapper title="Department" >
           <h5>Design innovative and robust business models for your organization or a new project in just 3days.</h5>
          </PageHeaderWrapper>
          <EditableTable
            dataSource={data}
            columns={columns}
            // title="Department List"
            role="Admin"
            perform={perform}
            newData={newData}
            getData={this.getAllDepartment}
            editData={(data, id) => this.editDepartment(data, id)}
            createNewData={(data) => this.createNewDepartment(data)}
            deleteData={(id) => this.deleteDepartment(id)}
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
    departments: state.department.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchDepartment, putDepartment, postDepartment, deleteDepartment }
)(Department);
