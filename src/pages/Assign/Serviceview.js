import React from 'react'
import { Row, Col } from 'antd';
import { Card } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Button } from 'antd';
import { Icon } from 'antd';
import './index.css';
import photo2 from '../../assets/img/s.svg'

import api from 'apis';

class Serviceview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            data: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const response = await api.get(`employees/${this.state.id}`);
        if (response && response.status == 200) {
            this.setState({ data: response.data.data })
        }
    }

    render() {

        const data = this.state.data;
        const { name, nric, dob, posname, depname, code, father_name, mother_name, phone, parmanent_address, temporary_address, education, social_media_link } = data;


        return (
            <div>
                <PageHeaderWrapper title='' />

                <img src={photo2} style={{ width: '40px', height: '40px', fontSize: '70px', color: 'black', marginRight: '20px' }} />
                <Card title="Serviceman Information">
                    <Row>
                        <Col span={8}><p>Name<br /><span className='black'>{name}</span></p></Col>
                        <Col span={8}><p>NRIC<br /><span className='black'>{nric}</span></p></Col>
                        <Col span={8}><p>Date of Birth<br /><span className='black'>{dob}</span></p></Col>

                    </Row>
                    <br />
                    <Row>
                        <Col span={8}><p>Position<br /><span className='black'>{posname}</span></p></Col>
                        <Col span={8}><p>Department<br /><span className='black'>{depname}</span></p></Col>
                        <Col span={8}><p>Employee Code<br /><span className='black'>{code}</span></p></Col>

                    </Row>
                    <br />
                    <Row>
                        <Col span={8}><p>Father<br /><span className='black'>{father_name}</span></p></Col>
                        <Col span={8}><p>Mother<br /><span className='black'>{mother_name}</span></p></Col>
                        <Col span={8}><p>Phone Number<br /><span className='black'>{phone}</span></p></Col>

                    </Row>
                    <br />
                    <Row>
                        <Col span={8}><p>Permanent<br /><span className='black'>{parmanent_address}</span></p></Col>
                        <Col span={8}><p>Temporary<br /><span className='black'> {temporary_address}</span></p></Col>
                        <Col span={8}></Col>

                    </Row>
                    <br />
                    <Row>
                        <Col span={8}><p>Education<br /><span className='black'>{education}</span></p></Col>
                        <Col span={8}><p>Social Media<br /><span className='black'>{social_media_link}</span></p></Col>
                        <Col span={8}></Col>
                    </Row>
                    <Button className='gbtn' onClick={() => window.history.go(-1)}>Go Back</Button>

                </Card>


            </div>
        );
    }
}
export default Serviceview;