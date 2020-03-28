import React from "react";
import { Button, Divider, Input, Select, PageHeader } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import api from "apis";
import { noti } from "utils/index";
import "antd/dist/antd.css";
import { Form } from "antd";
import { Row, Col } from "antd";
import { Card } from "antd";
import history from '../../router/history'
import { fetchMachine, postMachine } from "../../actions/Machine";
import { fetchModel } from "../../actions/model";

const { Option } = Select;

class CreateMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getAllMachine();
  }

  getAllMachine() {
    this.props.fetchModel();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue
        };
        api.post("machines", values).then(result => {
          if (result) {
            this.props.form.resetFields();
          }
        });
        noti("success", "Successfully!", "Machine has been created successfully.");
      } else {
        noti("error", "Unsuccessfully!", "Fail to Create.");
      }
    });history.push('/machine')
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const renderModel = (
      <Select
        style={{
          width: "240px",
          marginleft: "10px",
          display: "inline-block"
        }}
        placeholder="Please select Model No"
      >
        {this.props.model.map(item => {
          return <Option value={item.id}>{item.model_no}</Option>;
        })}
      </Select>
    );
    return <div><Form onSubmit={this.handleSubmit}>
      <div></div>
      <Divider orientation="left"> Create New Machine</Divider>
      <Card style={{ marginRight: "16px" }}>
        <Row>
          <Col span={8} style={{marginLeft:"30px"}}>
            <Form.Item label="Model No:">
              {getFieldDecorator("mod_id", {
                rules: [
                  {
                    required: true,
                    message: "Please input your model no!"
                  }
                ]
              })(renderModel)}
            </Form.Item>
          </Col>

          <Col offset={4} span={8} style={{ width: '240px',marginLeft:'280px' }}>
            <Form.Item label="FUP No:">
              {getFieldDecorator("fup", {
                rules: [
                  {
                    message: "Please input your FUP!"
                  }
                ]
              })(<Input maxLength={6} placeholder="Enter FUP" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{ width: '240px',marginLeft:"30px" }}>
            <Form.Item label="Machine Serial No:">
              {getFieldDecorator("machine_serial_no", {
                rules: [
                  {
                    required: true,
                    message: "Please input your machine serial no!"
                  }
                ]
              })(<Input maxLength={6} placeholder="Enter Serial No" />)}
            </Form.Item>
          </Col>

          <Col offset={4} span={8} style={{ width: '240px', marginLeft: '370px' }}>
            <Form.Item label="Engine Serial No:">
              {getFieldDecorator("machine_engine_serial_no", {
                rules: [
                  {
                    message: "Please enter engine serial no!"
                  }
                ]
              })(<Input maxLength={6} placeholder="Enter Serial no." />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{marginLeft:'30px'}}>
            <Form.Item label="Warranty Year:">
              {getFieldDecorator("wyear", {
                rules: [
                  {
                    message: "Please input your warranty year!"
                  }
                ]
              })(
                <Select
                  showSearch
                  style={{ width: '240px' }}
                  placeholder="Choose Warranty Year"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="1 year">1 year</Option>
                  <Option value="2 years">2 years</Option>
                  <Option value="5 years">5 years</Option>
                  <Option value="7 years">7 years</Option>
                  <Option value="10 years">10 years</Option>
                  <Option value="12 years">12 years</Option>
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col span={8} offset={4} style={{ width: '240px',marginLeft:'280px' }}>
            <Form.Item label="Working Hour:">
              {getFieldDecorator("workinghr", {
                rules: [
                  {
                    message: "Please input your working hr!"
                  }
                ]
              })(<Input placeholder="Enter working hour" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{ width: '240px',marginLeft:"30px" }}>
            <Form.Item label="Location:">
              {getFieldDecorator("location", {
                rules: [
                  {
                    message: "Please input your location!"
                  }
                ]
              })(<Input placeholder="Enter location" />)}
            </Form.Item>
          </Col>
          <Col />
        </Row>

        <Button
          htmlType="submit"
          style={{
            fontSize: "15",
            color: "white",
            backgroundColor: "#4672bb",
            marginLeft: '37%',
            width:'100px'
          }}
        >
          Submit
            </Button>

        <Link to="/machine">
          <Button style={{ marginLeft: 25,width:'100px' }}>
            Cancel
                    </Button>
        </Link>
      </Card>
    </Form></div>
  }
}

const Machine = Form.create()(CreateMachine);

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    model: state.model.list,
  };
}

export default connect(
  mapStateToProps,
  { fetchMachine, postMachine, fetchModel }
)(Machine);