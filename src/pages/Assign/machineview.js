import React from 'react'
import { Col, Row, Form, Avatar, Buttom, DatePicker, Select, Input, Radio } from 'antd'
import photo from '../../assets/img/b.svg';
import photo1 from '../../assets/img/b.svg';
import './viewcss.css'
import schedule from '../../assets/img/b.svg'
import job from '../../assets/img/b.svg'
import moment from 'moment';


const radioStyle = Radio.style;
const InputGroup = Input.Group;
const { Option } = Select;
const { TextArea } = Input;
const Options = [
    {
        value: '',
        label: ''
    }
]

class machineview extends React.Component {

    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
      };
    
      disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
      };
    
      disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
          return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
      };
    
      onChange = (field, value) => {
        this.setState({
          [field]: value,
        });
      };
    
      onStartChange = value => {
        this.onChange('startValue', value);
      };
    
      onEndChange = value => {
        this.onChange('endValue', value);
      };
    
      handleStartOpenChange = open => {
        if (!open) {
          this.setState({ endOpen: true });
        }
      };
    
      handleEndOpenChange = open => {
        this.setState({ endOpen: open });
      };
    render() {
        const { startValue, endValue, endOpen } = this.state;
        return (
           
            <div>
                <h2><b>View Machine History</b></h2>
                <br></br>
                <div style={{ padding: '40px', width: '1050px', height: '530px', borderWidth: '1px', borderStyle: 'solid', marginLeft: '50px' }}>
                    <span className='c1'><img src={photo} style={{ width: '40px', height: '40px', fontSize: '27px', marginRight: '20px' }} /><b>Complain information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '60px' }}>

                        <Row>
                            <Col span={16}>
                                <h3>Complain No:</h3>
                                <label>a aaai</label>
                            </Col>
                            <Col span={7}>
                                <h3>Model no:</h3>
                                <label style={{ color: 'blue' }}>sykes nooob</label>
                            </Col>

                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row>
                            <Col span={16}>
                                <h3>Warranty:</h3>
                                <label>aa a</label>
                            </Col>
                            <Col span={4}>
                                <h3>Warranty Description:</h3>
                                <label>sykes nooob</label>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '20px' }}>
                            <Col span={16}>
                                <h3>FUP No:</h3>
                                <label>a aa</label>
                            </Col>
                            <Col span={8}>
                                <h3>Working Hour:</h3>
                                <label>sykes nooob</label>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '15px' }}>
                            <Col span={16}>
                                <h3>Amount:</h3>
                                <label>aaaa</label>
                            </Col>
                        </Row>

                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ padding: '40px', width: '1050px', height: '350px', borderWidth: '1px', borderStyle: 'solid', marginLeft: '50px' }}>
                    <span className='c1'> <img src={photo1} style={{ width: '40px', height: '40px', marginRight: '20px' }} /><b>Customer Information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '60px' }}>
                        <Row>
                            <Col span={16}>
                                <h3>Customer Name:</h3>
                                <label>aaa</label>
                            </Col>
                            <Col span={8}>
                                <h3>Customer Ph No:</h3>
                                <label>sykes nooob</label>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row>
                            <Col span={16}>
                                <h3>Distance:</h3>
                                <label>aaaa</label>
                            </Col>
                            <Col span={8}>
                                <h3>Location:</h3>
                                <label>sykes nooob</label>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ padding: '40px', width: '1090px', height: '410px', borderWidth: '1px', borderStyle: 'solid', marginLeft: '50px' }}>
                    <span className='c1'><img src={job} style={{ width: '40px', height: '40px', marginRight: '20px' }} /><b>Job Information</b></span>

                    <div style={{ paddingLeft: '80px', paddingTop: '60px' }}>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={16}>
                                <h3>Job Title:</h3>
                                <label>aaaa</label>
                            </Col>
                            <Col span={8}>
                                <h3>Department:</h3>
                                <label>sykes nooob</label>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={16}>
                                <h3>Complain Job Title:</h3>
                                <label>aaaa</label>
                            </Col>
                            <Col span={8}>
                                <h3>Description:</h3>
                                <label>sykes nooob</label>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={16}>
                                <h3>Complain Job Title:</h3>
                                <label>aaaaa</label>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ padding: '40px', width: '1050px', height: '700px', borderColor: 'gray', borderWidth: '1px', borderStyle: 'solid', marginLeft: '50px' }}>
                    <span className='c1'><img src={schedule} style={{ width: '40px', height: '40px', marginRight: '20px' }} /><b>Schedule</b></span>

                    <div style={{ paddingLeft: '80px', paddingTop: '60px' }}>

                        <Row>
                     <Col span={16}><div>
                            <DatePicker style={{width:'250px'}}
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        /><br></br>
        <DatePicker style={{width:'250px'}}
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        /></div>
                            </Col>
                            <Col span={7}>
                                <h3>Service Charge:</h3>
                                <InputGroup compact>
                                    <Select defaultValue="Option1">
                                        <Option value="Option1">MMK</Option>
                                        <Option value="Option2">Dollor</Option>
                                    </Select>
                                    <Input style={{ width: '180px' }} />

                                </InputGroup>

                            </Col>

                        </Row>
                        <div style={{ height: '20px', paddingLeft: '60px', paddingTop: '6px' }}></div>
                        <Row>
                            <Col span={16}>
                                <h3>Amount:</h3>
                                <InputGroup compact>
                                    <Select defaultValue="Option1">
                                        <Option value="Option1">MMK</Option>
                                        <Option value="Option2">Dollor</Option>
                                    </Select>
                                    <Input style={{ width: '180px' }} />

                                </InputGroup>
                            </Col>
                            <Col span={7}>
                                <h3>Inspection:</h3>
                                <Radio.Group onChange={this.onChange} >
                                    <Radio style={radioStyle} value={1}>
                                        Yes
                                </Radio>
                                    <Radio style={radioStyle} value={2}>
                                        No
                                </Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '20px' }}>
                            <Col span={16}>
                                <h3>Watching List:</h3>
                                <Radio.Group onChange={this.onChange}>
                                    <Radio style={radioStyle} value={1}>
                                        Yes
                                </Radio>
                                    <Radio style={radioStyle} value={2}>
                                        No
                                </Radio>
                                </Radio.Group>
                            </Col>
                            <Col span={8}>
                                <h3>Job Title:</h3>
                                <Input style={{ width: '250px', marginLeft: '10px', display: 'inline-block' }} placeholder='Service' />
                            </Col>
                        </Row>
                        <div style={{ height: '28px' }}></div>
                        <Row style={{ marginBotton: '15px' }}>
                            <Col span={16}>
                                <h3>Job Code:</h3>
                                <Input style={{ marginLeft: '10px', display: 'inline-block', width: '250px', margin: '0 300px 8px 0' }} placeholder='1200,000' />
                            </Col>
                            <Col span={7}>
                                <h3>Job Description:</h3>
                                <TextArea rows={4} style={{ width: '250px', height: '100px' }} />
                            </Col>
                        </Row>
                        <Row style={{ marginBotton: '10px' }}>
                            <Col span={16}>
                                <h3>Job Status:</h3>
                                <Input style={{ marginLeft: '10px', display: 'inline-block', width: '250px', margin: '0 300px 8px 0' }} placeholder='Accept' />
                            </Col>
                        </Row>

                    </div>
                </div>
                <button style={{ width: '95px', height: '35px', backgroundColor: '#4672bb', color: 'white', marginLeft: '420px', marginTop: '40px' }} >Edit</button>
                <button style={{ width: '95px', height: '35px', marginLeft: '20px', marginTop: '40px' }}>Cancel</button>
            </div>
        )
    }
}
export default machineview
