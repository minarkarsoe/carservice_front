import React from 'react';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Card, Breadcrumb } from 'antd';
import { Button, Icon, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import api from 'apis';
const { Paragraph } = Typography;

class ViewMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: [],
            model_no: ''
        }
    }

    componentDidMount() {
        this.getData();
    }
    async  getData() {
        const response = await api.get(`modules/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;
            this.setState({ data: data })
        }
    }

    render() {
        //const data=this.state.data;
        const { mname, Controller_name, aname, remark } = this.state.data;

        return <div>

            <Breadcrumb>
                <Breadcrumb.Item>User Management</Breadcrumb.Item>
                <Breadcrumb.Item style={{ color: '#4672bb' }}>View Module</Breadcrumb.Item>
            </Breadcrumb>
            <Paragraph>A module provides detailed information about the module and its supported components which is accessible in different manners.</Paragraph>
            <Card style={{ width: '90%', marginRight: '5%', marginLeft: '5%', borderRadius: '14px' }}>
                <Row>
                    <Col span={16}>
                        <h3>Module Number:</h3>
                        <label>{mname}</label>
                    </Col>
                    <Col span={7}>
                        <h3>controller Name:</h3>
                        <label>{Controller_name}</label>
                    </Col>

                </Row>
                <Row>
                    <Col span={16}>
                        <h3>Action Name:</h3>
                        <label>{aname}</label>
                    </Col>
                    <Col span={4}>
                        <h3>Remark:</h3>
                        <label>{remark}</label>
                    </Col>
                </Row>
            </Card>
<Row style={{marginLeft:"35%"}}>
            <Link to={"/module/edit/" + this.state.id}><Button htmlType="submit" style={{ position: 'relative', top: '1.5em', fontSize: '15', color: 'white', backgroundColor: '#4672bb',width:'100px' }}>Edit</Button></Link>
            <Link to="/module"><Button style={{ position: 'relative', top: '1.5em', marginLeft: '10px', fontSize: '15', color: 'black',width:'100px' }}>Cancel</Button></Link>
            </Row>
        </div>
    }
}
export default ViewMachine