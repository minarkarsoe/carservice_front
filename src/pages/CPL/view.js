import React from 'react';
import photo from '../../assets/img/b.svg';
import photo1 from '../../assets/img/b.svg';
import photo2 from '../../assets/img/d.svg';
import { Col, Row, Form, Avatar, Buttom, Breadcrumb, Card } from 'antd';
import './view.css';

import { Icon } from 'antd';
import api from 'apis';
import { Link, Route } from 'react-router-dom'
//component     
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
class view extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            id: this.props.match.params.id,
            data: [],
            preview: null,
            loading: false
        }
    }
    componentDidMount() {
        this.getData();

    }
    async getData() {
        const response = await api.get(`customerpayment/${this.state.id}`);
        if (response && response.status == 200) {
            this.setState({ data: response.data.data })
        }
    }
    render() {
        const data = this.state.data;

        return (
            <div >

                <h3><div style={{ color: '#4672bb' }}>View Customer Payment List</div></h3>
                <br></br>
                <div style={{ fontSize: '10.5 px' }}>An expression of dissactisfaction made to an organization related to its products or services or the complaints-handling process itself where a response or resolution is explicity or implicity expected.</div>

                <br></br>
                <Card   style={{ padding: '40px', width: '1000px', height: '500px', borderWidth: '1px', borderStyle: 'solid', marginLeft: '50px'  }}>
                <img src={photo} style={{ width: '40px', height: '40px', fontSize: '80px', color: 'black', marginRight: '20px' }} /><span className='a1'><b>Complain Information</b></span>
                    <div style={{ paddingLeft: '80px', paddingTop: '50px' }}>
                        <Row style={{ marginBotton: '40px' }}>
                            <Col span={16}>
                                <h3>Customer Name:</h3>
                                <span>{data.customer_name}</span>
                            </Col>
                            <Col span={8}>
                                <h3>Complain no:</h3>
                                <span>{data.complain_no}</span>
                            </Col>
                        </Row>
                        <Row style={{ marginBotton: '20px', marginTop: '20px' }}>
                            <Col span={16}>
                                <h3>Invoice No:</h3>
                                <span>{data.invoice}</span>
                            </Col>
                            <Col span={8}>
                                <h3>Amount:</h3>
                                <span>{data.ammount}</span>
                            </Col>
                        </Row>
                        <Row style={{ marginBotton: '20px', marginTop: '20px' }}>
                            <Col span={16}>
                                <h3>Pay Date:</h3>
                                <span>{data.paymentdate}</span>
                            </Col>

                        </Row>


                    </div>





                </Card>
                <br></br>
                <br></br>
                <Row style={{ marginLeft: '40%' }}>
                    <button style={{ width: '90px', height: '30px', backgroundColor: '#4672bb', color: 'white' }} >

                        <Link style={{ display: 'block', height: '100%', color: '#ffffff' }} to={"/complains/edit/" + data.id}>
                            Edit
            </Link></button>

                    <Link to="/complains"><button style={{ position: 'relative', top: '1.5em', left: '3em', fontSize: '15', color: 'black' }}>Cancel</button></Link>
                </Row>
            </div>
        )
    }
}


export default view