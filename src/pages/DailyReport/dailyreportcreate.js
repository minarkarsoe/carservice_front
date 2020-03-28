import React from 'react';
import { Form, DatePicker, TimePicker, Button, Col, Row, Card, Avatar, Select, Input, Icon } from 'antd';
import { Link } from "react-router-dom";
import { fetchDailyreport, putDailyreport, postDailyreport, deleteDailyreport } from '../../actions/Dailyreport';
import { fetchMachine } from "../../actions/Machine";
import { fetchSchedules } from "../../actions/Schedule";
import moment from 'moment';
import photo from '../../assets/img/calen.svg'
import { connect } from 'react-redux';
import api from "apis";
import { noti } from "utils/index"
import photo2 from '../../assets/img/photo2.svg'
import history from '../../router/history'
import { getUserInfo } from '../../utils'
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;
const { Option } = Select;


function onChange(date, dateString) {
  console.log(date, dateString);
}

class CreateDailyreport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      job_code:"",
      mac_id:"",
      fup:"",
      loading: false
    };
  }

  componentDidMount() {
    this.getAllMachine();
    this.getAllSchedule();
   
  }

  getAllMachine() {
    this.props.fetchMachine();
  }
  async getAllSchedule() {
    // this.props.fetchSchedules();
    const user = getUserInfo();
        const response = await api.get('/employees_chedule/'+user.schedule_id);
        const data = response.data.data[0];
        const fup = await api.get('/getmachinebyfup/'+user.schedule_id);
        console.log(fup)
        this.setState({...this.state,job_code:data.job_code,mac_id:fup.data.data.mac_id,fup:fup.data.data.fup})
  }

  handleSubmit = e => {
    const user = getUserInfo();
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        let values = {
          ...fieldsValue
        };

        values = { ...values, date: moment(values.data).format("YYYY-MM-DD"), sch_id: user.schedule_id, mac_id:this.state.mac_id,e_id: user.e_id, created_by: '', updated_by: '' };
        
        delete values.jcode;
        delete values.fup_no;
        api.post("empdailyreport", values).then(result => {
          if (result) {
            this.props.form.resetFields();
          }
        });
        noti("success", "Successfully!", "Dailyreport has been created successfully.");
      } else {
        noti("error", "Unsuccessfully!", "Fail to Create.");
      }
    });history.push('/dailyreport')
  };



  render() {
    console.log(this.state)
    const { getFieldDecorator } = this.props.form;
    // const renderfup = (
    //   <Select
    //     style={{
    //       width: "350px",
    //       marginleft: "10px",
    //       display: "inline-block"
    //     }}
    //     placeholder="Please select FUP No"
    //   >
    //     {this.props.machine.map(item => {
    //       return <Option value={item.id}>{item.fup}</Option>;
    //     })}
    //   </Select>
    // );

    // const renderjobcode = (
    //   <Select
    //     style={{
    //       width: "350px",
    //       marginleft: "10px",
    //       display: "inline-block"
    //     }}
    //     placeholder="Please select FUP No"
    //   >
    //     {this.props.schedule.map(item => {
    //       return <Option value={item.id}>{item.job_code}</Option>;
    //     })}
    //   </Select>
    // );




    const calIcon = <img src={photo} />;
    return (
      <div><Form onSubmit={this.handleSubmit}>
        <h4 style={{ color: '#4672bb' }}>Create Daily Report</h4>
        <br></br>
        <div style={{ fontSize: '10.5 px' }}>A daily report is a kind of report documenting the procedures that transpaired within the day.It usually includes the things that have been accomplished the plans or goals for the existing or potential problems. </div>
        <br></br>
        <br></br>
        <img src={photo2} style={{ width: '50px', height: '40px', fontSize: '100px', color: 'black', marginleft: '30px' }} /><b><span className='a2'>New Customer Service Daily Report</span></b>
        <div style={{ width: '1050px', height: '600px', padding: '20px', paddingLeft: '80px', paddingTop: '20px' }}>
          <br />
          <Row >
            <Col span={8} >
              <Form.Item label="Date:">
                {getFieldDecorator('date', {
                  rules: [{
                    required: true,
                    message: 'Please input your start date!'
                  }]
               
                })(
                  <DatePicker
                    style={{
                      width: "350px",
                      marginleft: "10px",
                      display: "inline-block"
                    }}
                  
                    dateRender={current => {
                      const style = {};
                      if (current.date() === 1) {
                        style.border = '1px solid #1890ff';
                        style.borderRadius = '50%';
                      }
                      return (
                        <div className="ant-calendar-date">
                          {current.date()}
                        </div>
                      );
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col offset={4} span={8}>
              <Form.Item label="Job Code:">
              <Input placeholder="Enter working hour" style={{
                  width: "350px",
                  marginleft: "10px",
                  display: "inline-block"
                }}
                value={this.state.job_code} />
              </Form.Item>
            </Col>
          </Row>

          <Row >
            <Col span={8}>
              <Form.Item label="FUP No:">
              <Input placeholder="Enter working hour" style={{
                  width: "350px",
                  marginleft: "10px",
                  display: "inline-block"
                }}
                value={this.state.fup} />
              </Form.Item>
            </Col>
            <Col span={8} offset={4}>
              <Form.Item label="Working Hour:">
                {getFieldDecorator("wkhour", {
                  rules: [
                    {
                      message: "Please input your working hr!"
                    }
                  ]
                })(<Input placeholder="Enter working hour" style={{
                  width: "350px",
                  marginleft: "10px",
                  display: "inline-block"
                }} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row >
            <Col span={8} >
              <Form.Item label="Description:">
                {getFieldDecorator("description", {
                  rules: [
                    {
                      message: "Please input your working hr!"
                    }
                  ]
                })(<TextArea rows={4} style={{ width: '350px', height: '130px' }} placeholder='plane,lever,wedge,wheel and axle...' />)}
              </Form.Item>
            </Col>
            <Col span={8} offset={4}  >
              <Form.Item label="Remark:">
                {getFieldDecorator("remark", {
                  rules: [
                    {
                      message: "Please input your Remark!"
                    }
                  ]
                })(<TextArea rows={4} style={{ width: '350px', height: '130px' }} placeholder='plane,lever,wedge,wheel and axle...' />)}
              </Form.Item>
            </Col>
          </Row>
          <Button
            htmlType="submit"
            style={{
              marginTop: '40px',
              fontSize: "15",
              color: "white",
              backgroundColor: "#4672bb",
              marginLeft: "30%",
              width: '100px'
            }}
          >
            Report
            </Button>

          <Link to="/dailyreport">
            <Button style={{ marginLeft: 25, width: '100px' }}>
              Cancel
                    </Button>
          </Link>
        </div>
      </Form>
      </div>

    )
  }
}

const create = Form.create()(CreateDailyreport)


function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    machine: state.machine.list,
    schedule: state.schedule.list,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchMachine, fetchMachine, fetchSchedules, postDailyreport
  }
)(create);