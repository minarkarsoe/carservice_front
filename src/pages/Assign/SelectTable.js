import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom'
import { DatePicker, Divider } from 'antd';
import { Radio, Button, Card } from 'antd';
import { Row, Col, Form, Input, Select } from 'antd';
import api from 'apis';
import { noti } from 'utils/index';
import history from '../../router/history';
import moment from 'moment';
import photo from '../../assets/img/s.svg'
const uuidv4 = require('uuid/v4');
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Position',
    dataIndex: 'pos_name'
  },
  {
    title: 'Phone No',
    dataIndex: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'parmanent_address',
  },
  {
    title: 'NRIC',
    dataIndex: 'nric',
  },
  {
    title: 'Employee Code',
    dataIndex: 'code',
  },

  {
    title: 'Action',
    render: record => (
        <Link style={{ color: 'green', marginRight: '0.5em' }} to={"/assign/profile/" + record.id}>View</Link>
    )
  },
];


class As extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      count: props.count,
      currentPagination: 1,
      customPagesize: 5,
      selectedRowKeys: [],
      selectedid: [],
      selectedRow: []
    };

  }
  handleSubmit = e => {
    const selectedRowKeys = this.state.selectedRowKeys;
    const selectedid = this.state.selectedid;

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const rangev = fieldsValue['range'];
        let values = {
          ...fieldsValue,
          start_date: rangev[0].format('YYYY/MM/DD'),
          end_date: rangev[1].format('YYYY/MM/DD'),
          selectedid
        }

        // api.post('schedule', values).then((result) => {
        //     if(result) {
        //        //this.props.form = '';
        //        this.props.form.resetFields();
        //     }
        // })
        for (let i = 0; i < selectedid.length; i++) {
          values = {
            ...fieldsValue,
            start_date: rangev[0].format('YYYY/MM/DD'),
            end_date: rangev[1].format('YYYY/MM/DD')
          }
          values.inspection = values.inspection === "Yes" ? 1 : 0;
          values.watching_list = values.watching_list === "Yes" ? 1 : 0;
          values = { ...values, comp_id: this.props.complain.id, created_by: "", updated_by: "", schedule_status: "Assigned" }
          delete values.range;
          // delete values.j_description
          console.log(values)
          this.postData(values);

        }
        this.props.form.resetFields();

        noti('success', 'Successfully!', 'Schedules have been created successfully.')
      } else {
        noti('error', 'Unsuccessfully!', 'Fail to Create.')
      }
    }); history.push('/schedule');
  };
  async postData(v) {
    let employeelist = this.state.selectedRow;
    console.log(employeelist);

    const response = await api.post('schedule', v);
    console.log(response.data.data)
    let data = this.props.complain;
    data.complain_status = 'Accept';
    delete data.mod_no
    delete data.fup_no
    delete data.dep_name
    data.created_at = moment(data.created_at).format('YYYY/MM/DD')
    data.updated_at = moment(data.updated_at).format('YYYY/MM/DD')
    api.put(`complain/${data.id}`, data);

    employeelist.map((value) => {
      delete value.posname;
      delete value.key;
      delete value.depname;
      value.schedule_id = parseInt(response.data.data.id);
      value.created_at = moment(value.created_at).format('YYYY/MM/DD')
      value.updated_at = moment(value.updated_at).format('YYYY/MM/DD')
      value.start_date = moment(value.start_date).format('YYYY/MM/DD')
      value.dob = moment(value.dob).format('YYYY/MM/DD')
      api.put(`employeeschedule/${value.id}`, value);

    })
  }

  onSelectChange = (selectedRowKeys, selectedRow) => {
    let did = selectedRow.map(r => r.id);
    this.setState({ selectedRowKeys, selectedid: did, selectedRow: selectedRow });
  };


  componentDidUpdate(prevProps) {
    if (this.props.dataSource !== prevProps.dataSource) {
      this.setState({
        loading: false,
        data: this.props.dataSource,
        count: this.props.count
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, selectedRowKeys } = this.state;

    const dateFormat = 'YYYY/MM/DD';
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,

      onSelection: this.onSelection,
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit} >
          <div>
            <Row>
              <Col span={9} offset={1}>
                <Form.Item label='Interval Date:'>

                  {getFieldDecorator(['range'], {
                    rules: [{
                      type: 'array',
                      required: true,
                      message: 'Please input your range!'
                    }]
                  })(<RangePicker
                    format={dateFormat} />)}
                </Form.Item>
              </Col>

              <Col span={9} offset={1} style={{ marginLeft: '120px' }}>
                <Form.Item label='Amount:'>

                  {getFieldDecorator('ammount', {
                    rules: [{
                      required: true,
                      message: 'Please input your amount!'
                    }]
                  })(<Input addonAfter="Kyats" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={9} offset={1}>
                <Form.Item label='Service Charge:'>

                  {getFieldDecorator('service_charge', {
                    rules: [{
                      required: true,
                      message: 'Please input Service Charge!'
                    }]
                  })(<Input addonAfter="Kyats" />)}
                </Form.Item>
              </Col>

              <Col span={4} offset={1} style={{ marginLeft: '120px' }}>
                <Form.Item label='Inspection:'>

                  {getFieldDecorator('inspection')(<Radio.Group>
                    <Radio value='Yes'>Yes</Radio>
                    <Radio value='No'>No</Radio>
                  </Radio.Group>)}
                </Form.Item>
              </Col>
              <Col span={4} style={{ marginLeft: '40px' }} >
                <Form.Item label='Watching List:'>
                  {getFieldDecorator('watching_list')(<Radio.Group>
                    <Radio value='Yes'>Yes</Radio>
                    <Radio value='No'>No</Radio>
                  </Radio.Group>)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={9} offset={1}>
                <Form.Item label='Job Code:'>

                  {getFieldDecorator('job_code', {
                    rules: [{
                      required: true,
                      message: 'Please input Job Code!'
                    }]
                  })(<Input placeholder="Enter Code" />)}
                </Form.Item>
              </Col>
              <Col span={9} offset={1} style={{ marginLeft: '120px' }}>
                <Form.Item label='Job Status:'>

                  {getFieldDecorator('job_status', {
                    rules: [{
                      required: true,
                      message: 'Please input Job Status!'
                    }]
                  })
                    (
                      <Select
                        showSearch
                        style={{ width: '350px' }}
                        placeholder="Choose Job Status"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="Accept">Accept</Option>
                        <Option value="Reject">Reject</Option>


                      </Select>
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={9} offset={1}>
                <Form.Item label='Job Title:'>

                  {getFieldDecorator('job_title', {
                    rules: [{
                      required: true,
                      message: 'Please input Job title!'
                    }]
                  })(<Input placeholder="Enter Title" />)}
                </Form.Item>
              </Col>
              <Col span={9} offset={1} style={{ marginLeft: '120px' }}>
                <Form.Item label='Job Description:'>

                  {getFieldDecorator('j_description', {
                    rules: [{
                      required: true,
                      message: 'Please input Job Description!'
                    }]
                  })(<TextArea rows={3} placeholder='Enter Description' />)}
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: '40px', marginBottom: '20px' }}>

            <img src={photo} style={{ width: '40px', height: '40px', fontSize: '80px', color: 'black', marginRight: '20px' }} /><span className='a1'><b>Service Man Detail</b></span>

          </div>
          <Table
            key={data.key}
            rowSelection={rowSelection}
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            style={{ marginTop: '30px' }}
            bordered
          />
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Button htmlType="submit" style={{ margin: '5px', width: '95px', height: '35px', backgroundColor: '#4672bb', color: 'white' }}>Assign</Button>
            <Link to="/assign">
              <Button
                style={{ marginLeft: '20px', width: '95px', height: '35px', backgroundColor: 'white', color: 'black' }}>
                Cancel</Button></Link>
          </div>
        </Form>
      </div>);
  }
}
const SelectTable = Form.create()(As);
export default SelectTable;
