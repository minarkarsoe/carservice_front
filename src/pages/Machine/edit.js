import React from 'react'

// import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Select } from 'antd';
import { Button, Icon } from 'antd';
import { Divider } from 'antd';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { fetchMachine, postMachine } from '../../actions/Machine';
import { fetchModel } from '../../actions/model';
// import Button from './button';
import api from 'apis';
import { noti } from 'utils/index';
import { connect } from "react-redux";
import history from '../../router/history'
const moment = require('moment');


const { Option } = Select;
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}
// Dropdown

class EditMachine extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      id: this.props.match.params.id,
      data: [],

    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue
        }

        api.put(`machines/${this.state.id}`, values);
        noti('success', 'Successfeully!', 'Machine has been edited successfully.')
      } else {
        noti('error', 'Unsuccessfully!', 'Fail to edit.')
      }
    });history.push('/machine')
  };

  componentDidMount() {
    this.getData();
    // this.props.fetchMachine();
    this.props.fetchModel();
  }


  async  getData() {
    const response = await api.get(`machines/${this.state.id}`);
    if (response && response.status == 200) {
      let data = response.data.data;

      this.setState({ data: data })
      this.setInitialValues();
    }
  }

  setInitialValues = () => {
    const data = this.state.data;
    const { form } = this.props;
    if (data)
      form.setFieldsValue({
        mod_id: data.mod_id,
        fup: data.fup,
        machine_serial_no: data.machine_serial_no,
        machine_engine_serial_no: data.machine_engine_serial_no,
        wyear: data.wyear,
        workinghr: data.workinghr,
        location: data.location
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const renderModel = (
      <Select style={{
        width: '200px',
        marginleft: '10px',
        display: 'inline-block'
      }} placeholder="Please select model no">
        {this.props.model.map(item => {
          return <Option value={item.id}>{item.model_no}</Option>
        })}
      </Select>
    )

    return (
      <div>
        <PageHeaderWrapper title='Edit Machine' para='You can edit machine basic data by using following form.' />

        <Form onSubmit={this.handleSubmit} >


          <Divider orientation="left">  Machine Information</Divider>
          <Card style={{ marginRight: '16px' }}>
            <Row>
              <Col span={8}>

                <Form.Item label="Model No:">
                  {getFieldDecorator('mod_id', {
                    rules: [{
                      required: true,
                      message: 'Please input your model no!'
                    }]
                  })(renderModel)}
                </Form.Item>
              </Col>

              <Col offset={4} span={8} style={{marginLeft:'250px'}}>
                <Form.Item label="FUP No:">
                  {getFieldDecorator('fup', {
                    rules: [{
                      required: true,
                      message: 'Please input your FUP!'
                    }]
                  })(<Input maxLength={6} placeholder="Enter FUP" style={{width:'320px'}} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Machine Serial No:">
                  {getFieldDecorator('machine_serial_no', {
                    rules: [{
                      required: true,
                      message: 'Please input your machine serial no!'
                    }]
                  })(<Input maxLength={6} placeholder="Enter Serial No" style={{width:'320px'}}/>)}
                </Form.Item>
              </Col>

              <Col span={8} offset={4} style={{marginLeft:'250px'}}>
                <Form.Item label="Engine Serial No:">
                  {
                    getFieldDecorator('machine_engine_serial_no', {
                      rules: [{
                        required: true,
                        message: 'Please input your engine serial no!'
                      }]
                    })(<Input maxLength={6} placeholder="Enter Serial No" style={{width:'320px'}} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Warranty Year:">
                  {
                    getFieldDecorator('wyear', {
                      rules: [{
                        required: true,
                        message: 'Please input your warranty year!'
                      }]
                    })(<Select
                      showSearch
                      style={{ width: 320 }}
                      placeholder="Choose Warranty Year"
                      optionFilterProp="children"
                      onChange={onChange}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="1 year">1 year</Option>
                      <Option value="2 years">2 years</Option>
                      <Option value="5 years">5 years</Option>
                      <Option value="7 years">7 years</Option>
                      <Option value="10 years">10 years</Option>
                      <Option value="12 years">12 years</Option>
                    </Select>)}
                </Form.Item>
              </Col>

              <Col span={8} offset={4} style={{marginLeft:'250px'}}>
                <Form.Item label="Working Hour:">
                  {
                    getFieldDecorator('workinghr', {
                      rules: [{
                        required: true,
                        message: 'Please input your working hr!'
                      }]
                    })(<Input placeholder="Enter Working Hour" style={{width:'320px'}}/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Location:">
                  {
                    getFieldDecorator('location', {
                      rules: [{
                        required: true,
                        message: 'Please input your location!'
                      }]
                    })(<Input placeholder="Enter location" style={{width:'320px'}} />)}
                </Form.Item>
              </Col><Col></Col>

            </Row>



            <Button htmlType="submit" style={{ fontSize: '15', color: 'white', backgroundColor: '#4672bb',width:'100px',marginLeft:'35%' }}>Save</Button>
            <Link to="/machine"><Button style={{ marginLeft: '30px', color: 'black',width:'100px' }}>Cancel</Button></Link>
          </Card>
        </Form>
      </div>


    );
  }
}

{/* <Form {...formItemLayout} onSubmit={this.handleSubmit}> */ }



const editMachine = Form.create()(EditMachine);

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    // complain: state.complain.list,
    model: state.model.list,
    // department: state.department.list,
    // machine:state.machine.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchModel }
)(editMachine);