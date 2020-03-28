import React from "react";
import { Button, Divider, Input, Select, PageHeader, Typography, breadcrumbName } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import api from "apis";
import { noti } from "utils/index";
import "antd/dist/antd.css";
import { Form } from "antd";
import { Row, Col } from "antd";
import { fetchModule, putModule, postModule, deleteModule } from '../../actions/Module';
import {fetchEmployee} from '../../actions/Employee'
import { Card } from "antd";
import history from '../../router/history'


const { Option } = Select;
const { Paragraph } = Typography;
const routes = [
  {
    path: 'User Management',
    breadcrumbName: 'UserManagement'
  },

  {
    path: '/module',
    breadcrumbName: 'Create Module'
  }

];

class moduleCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData() {
    this.props.fetchModule();
    this.props.fetchEmployee();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue
        };
        api.post("modules", values).then(result => {
          if (result) {
            this.props.form.resetFields();
          }
        });
        history.push('/module')
        noti("success", "Successfully!", "Module has been created successfully.");
      } else {
        noti("error", "Unsuccessfully!", "Fail to Create.");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const renderEmployee = (
      <Select style={{
          width: '240px',
          marginleft: '10px',
          display: 'inline-block'
      }} placeholder="Please select Employee">
          {this.props.employees.map(item => {
              return <Option value={item.id}>{item.name}</Option>
          })}
      </Select>
  )
    return (
      <div>

        <Form onSubmit={this.handleSubmit}>
          <PageHeader breadcrumb={{ routes }} >A module provides detailed information about the module and its supported components which is accessible in different manners.</PageHeader>

          <div style={{ marginTop: '20px' }}>
            <Row>
              <Col span={8} >
                <Form.Item label="Module Name:">
                  {getFieldDecorator("modulename", {
                    rules: [
                      {
                        message: "Please input your module name"
                      }
                    ]
                  })(<Input maxLength={6} placeholder="Enter Module Name" style={{ height: '50px' }} />)}
                </Form.Item>
              </Col>

              <Col offset={4} span={8}>
                <Form.Item label="Controller Name:">
                 
                {getFieldDecorator('e_id', {
                                    rules: [{ required: true, message: 'Please select department' }],
                                })
                                    (renderEmployee)
                                }
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Row>
            <Col span={8}>
              <Form.Item label="Action Name:">
                {getFieldDecorator("action", {
                  rules: [
                    {
                      message: "Please input your action name"
                    }
                  ]
                })(<Input maxLength={6} placeholder="Enter Action Name" style={{ height: '50px' }} />)}
              </Form.Item>
            </Col>

            <Col offset={4} span={8}>
              <Form.Item label="Remark:">
                {getFieldDecorator("remark", {
                  rules: [
                    {
                      message: "Please input your remark"
                    }
                  ]
                })(<Input maxLength={6} placeholder="Enter remark" style={{ height: '50px' }} />)}
              </Form.Item>
            </Col>
          </Row>

          <Button
            htmlType="submit"
            style={{
              fontSize: "15",
              color: "white",
              backgroundColor: "#4672bb",
              marginLeft: '28%',
              marginTop: '50px',
              width: '100px',
              height: '35px'
            }}
          >
            Submit
            </Button>


          <Link to="/module">
            <Button style={{ marginLeft: '50px', width: '100px', height: '35px' }}>
              Cancel
                    </Button>
          </Link>


        </Form>
      </div>
    )
  }
}

const Module = Form.create()(moduleCreate);


function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    modules: state.module.list,
    employees:state.employee.list
  };
}


export default connect(
  mapStateToProps,
  { fetchModule, postModule,fetchEmployee }
)(Module);