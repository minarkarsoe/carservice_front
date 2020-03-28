import React from 'react';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import EditableTable from '../../components/InlineCustomTable/CustomTable';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import { fetchModel, putModel, postModel, deleteModel } from '../../actions/model';
import './model.css';
import { connect } from "react-redux";
import { Breadcrumb, Alert } from 'antd';
const uuidv4 = require('uuid/v4');


class Model extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.getAllModel();
  }

  getAllModel() {
    this.props.fetchModel()
  }

  //update position
  editModel = (data, id) => {
    this.props.putModel(data, id);
  }

  // to create new position
  createNewModel = (data) => {
    data.created_by = "admin";
    data.updated_by = '';
    this.props.postModel(data);
  }

  // to delete position
  deleteModel = (id) => {
    this.props.deleteModel(id);
  }

  render() {
    const columns = [
      {
        title: 'Model_no',
        dataIndex: 'model_no',
        key: 'model_no',
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
        // sorter: (a, b) => a.description.length - b.description.length,
        //sortDirections: ['descend', 'ascend'],
        editable: true

      }
    ];
    const perform = {
      create: "model:create",
      edit: "model:edit"
    }
    const newData = {
      Model_no: "",
      description: ""
    }

    let data = this.props.models;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div>
        <Can
          role="Admin"
          perform="model:list"
          no={() => {
            return <Forbidden />
          }}
        >
           <PageHeaderWrapper title="Model" >
           <h5>Design innovative and robust business models for your organization or a new project in just 3days.</h5>
          </PageHeaderWrapper>
          <EditableTable
            dataSource={data}
            columns={columns}
            role="Admin"
            perform={perform}
            newData={newData}
            getData={this.getAllModel}
            editData={(data, id) => this.editModel(data, id)}
            createNewData={(data) => this.createNewModel(data)}
            deleteData={(id) => this.deleteModel(id)}
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
    models: state.model.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchModel, putModel, postModel, deleteModel }
)(Model);
