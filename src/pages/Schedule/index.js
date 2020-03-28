import React from 'react';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import ScrollTable from './CustomScrollTable';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import { fetchSchedules, fetchSchedule, putSchedule, postSchedule, deleteSchedule } from '../../actions/Schedule';
import { connect } from "react-redux";
import { Card } from 'antd';
const uuidv4 = require('uuid/v4');


class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.getAllSchedule();
  }

  getAllSchedule() {
    this.props.fetchSchedules()
  }
  getSchedule(id) {
    this.props.fetchSchedule(id);
  }

  //update Schedule
  editSchedule = (data, id) => {
    this.props.putSchedule(data, id);
  }

  // to create new Schedule
  createNewSchedule = (data) => {
    data.created_by = "admin";
    data.updated_by = '';
    this.props.postSchedule(data);
  }

  // to delete Schedule
  deleteSchedule = (id) => {
    this.props.deleteSchedule(id);
  }

  render() {
    const dataSource = this.props.schedules

    const columns = [
      {
        title: 'Job Code',
        width:'200px',
        align:'center',
        dataIndex: 'job_code',
        sorter: (a, b) => a.jcode.length - b.jcode.length,
        sortDirections: ['ascend', 'descend'],
        fixed: 'left'

      },
      {
        title: 'Complain Number',
        width: '250px',
        align:'center',
        dataIndex: 'compo',
        sorter: (a, b) => a.complain_no.length - b.complain_no.length,
        sortDirections: ['ascend', 'descend'],


      },

      {
        title: 'Start Date',
        width:'200px',
        align:'center',
        dataIndex: 'start_date',
        sorter: (a, b) => { var as = a.sdate.replace(/[-]/g, ''); var bs = b.sdate.replace(/[-]/g, ''); return as - bs; },
        sortDirections: ['ascend', 'descend'],

      },
      {
        title: 'End Date',
        dataIndex: 'end_date',
        align:'center',
        width:'200px',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => { var as = a.edate.replace(/[-]/g, ''); var bs = b.edate.replace(/[-]/g, ''); return as - bs; }
      },
      {
        title: 'Status',
        width:'200px',
        align:'center',
        dataIndex: 'schedule_status',
      },

    ];
    const perform = {
      create: "position:create",
      edit: "position:edit"
    }
    const newData = {
      title: "",
      description: ""
    }

    let data = this.props.schedules;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div>
        <Can
          role="Admin"
          perform="position:list"
          no={() => {
            return <Forbidden />
          }}
        >
         <PageHeaderWrapper title="Schedule">
         <h5>Schedule is a plan of things to be done and the time when they were be done.It is the thing you write down in your planner.</h5>
         </PageHeaderWrapper>
          <Card>
          <ScrollTable
            dataSource={dataSource}
            columns={columns}
            // title="Schedule List"
            role="Admin"
            perform={perform}
            newData={newData}
            getData={this.getAllSchedule}
            getdata={(id) => this.getSchedule(id)}
            editData={(data, id) => this.editSchedule(data, id)}
            createNewData={(data) => this.createNewSchedule(data)}
            deleteData={(id) => this.deleteSchedule(id)}
          /></Card>
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
    schedules: state.schedule.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchSchedules, fetchSchedule, putSchedule, postSchedule, deleteSchedule }
)(Schedule);
