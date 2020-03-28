import React from 'react';

import { text, Form, DatePicker, TimePicker, Button, Col, Row, Card, Avatar, Select, Input, Icon } from 'antd';
import { Tabs } from 'antd';
import './dailyreport.css';
import photo from '../../assets/img/b.svg';
import api from 'apis';
import Column from 'antd/lib/table/Column';
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
class view extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      reportList: [],
      model_no: ''
    }
  }

  componentDidMount() {
    this.getData();
  }
  async  getData() {
    const response = await api.get(`dailyreport/${this.state.id}`);
    if (response && response.status == 200) {
      let data = response.data.data;
      const reportList = await api.get(`dailyreportbymachine/${data.mac_id}`);
      let reportdata = reportList.data.data;
      this.setState({ reportList: reportdata, loading: false })
    }
  }
  render() {
    const { reportList, loading } = this.state;
    if (loading) return (<div> </div>);
    return (
      <div>
        <h4 style={{ color: '#4672bb' }}>View Daily Report</h4>
        <br></br>
        <div style={{ fontSize: '10.5 px' }}>A daily report is a kind of report documenting the procedures that transpaired within the day.It usually includes the things that have been accomplished the plans or goals for the existing or potential problems. </div>
        <br></br>
        <br></br>
        <h2><b>View Daily Report</b></h2>
        {
          reportList.map((data, index) => {
            return (
              <Card style={{ width: '100%', borderColor: 'grey', padding: '20px', marginBottom: '10px' }} key={index}>
                <div style={{ paddingLeft: '80px' }}>
                  <Row style={{ marginBotton: '40px' }}>
                    <Col span={16}>
                      <h3>Date:</h3>
                      <span>{data.date}</span>
                    </Col>
                    <Col span={8}>
                      <h3>Job Code:</h3>
                      <span>{data.jcode}</span>
                    </Col>
                  </Row>
                  <Row style={{ marginBotton: '20px', marginTop: '20px' }}>
                    <Col span={16}>
                      <h3>Fup No:</h3>
                      <span>{data.fup}</span>
                    </Col>
                    <Col span={8}>
                      <h3>Working Hour:</h3>
                      <span>{data.wkhour}</span>
                    </Col>
                  </Row>
                  <Row style={{ marginBotton: '20px', marginTop: '20px' }}>
                    <Col span={16}>
                      <h3>Description:</h3>
                      <span>{data.description}</span>
                    </Col>
                    <Col span={8}>
                      <h3>Re Mark:</h3>
                      <span>{data.remark}</span>
                    </Col>
                  </Row>



                </div>

              </Card>




            );

          })
        }    <div>
          <Link to="/dailyreport">
            <Button style={{ marginLeft: "45%", width: '100px', background: '#4672bb', color: 'white' }}>
              Back
                </Button>
          </Link>
        </div>
      </div>


    );
  }
}

export default view