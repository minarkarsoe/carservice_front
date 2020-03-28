import React from 'react';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Card } from 'antd';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import api from 'apis';

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

    getModelName(id) {
        api.get(`models/${id}`).then(result => this.setState({ model_no: result.data.data.model_no }))

    }

    async  getData() {
        const response = await api.get(`machines/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;
            this.setState({ data: data })
            this.getModelName(data.mod_id)
        }
    }
    render() {
        //const {id}=this.props.location.state;
        const { machine_serial_no, mod_id, machine_engine_serial_no, workinghr, wyear, fup, location } = this.state.data;
        return <div>
            <PageHeaderWrapper title="View Machine" para='You can view machine basic data.' />

            <Card title='View Machine Information' style={{ width: '90%', marginRight: '5%', marginLeft: '5%', borderRadius: '14px' }}>
                <Row>
                    <Col span={16}>
                        <h3>Model Number:</h3>
                        <label style={{ marginLeft: '10px' }}>{this.state.model_no}</label>
                    </Col>
                    <Col span={7} >
                        <h3>FUP Number:</h3>
                        <label style={{ marginLeft: '10px' }}>{fup}</label>
                    </Col>

                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={16} >
                        <h3>Machine Serial Number:</h3>
                        <label style={{ marginLeft: '10px' }}>{machine_serial_no}</label>
                    </Col>
                    <Col span={4}>
                        <h3 style={{ width: '240px' }}>Engine Serial Number:</h3>
                        <label style={{ marginLeft: '10px' }}>{machine_engine_serial_no}</label>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={16}>
                        <h3>Warranty Year:</h3>
                        <label style={{ marginLeft: '10px' }}>{wyear}</label>
                    </Col>
                    <Col span={4}>
                        <h3>Working Hour:</h3>
                        <label style={{ marginLeft: '10px' }}>{workinghr}</label>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={16}>
                        <h3>Location:</h3>
                        <label style={{ marginLeft: '10px' }}>{location}</label>
                    </Col>
                </Row>
            </Card>
            <Link to={"/machine/edit/" + this.state.id}><Button htmlType="submit" style={{ position: 'relative', top: '1.5em', left: '3em', fontSize: '15', color: 'white', backgroundColor: '#4672bb', marginLeft: '35%', width: '100px' }}>Edit</Button></Link>
            <Link to="/machine"><Button style={{ position: 'relative', top: '1.5em', left: '3em', fontSize: '15', color: 'black', marginLeft: '20px', width: '100px' }}>Cancel</Button></Link>
        </div>
    }
}
export default ViewMachine;