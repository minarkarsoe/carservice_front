import React from 'react'
import { Breadcrumb } from 'antd';
import { Divider } from 'antd';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { Icon } from 'antd';
import api from 'apis';//import { fetchEmployee, putEmployee, postEmployee, deleteEmployee } from '../../actions/Employee'
import { Card } from 'antd';
import { fetchUser } from '../../actions/User';
// import { fetchEmployee } from '../../actions/Employee';
// import { fetchPosition } from '../../actions/Position';
// import { fetchDepartment } from '../../actions/Department';
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom'
import other from '../../assets/img/other.png'
import psn from '../../assets/img/personal.svg'
import job from '../../assets/img/job.svg'
import contact from '../../assets/img/contact.svg'
import parent1 from '../../assets/img/parentinformation.svg'


// import { Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

const { Meta } = Card;
const imgurl = "http://localhost:9991/"

// const { Option } = Select;


class View extends React.Component {
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
        const response = await api.get(`users/${this.state.id}`);
        if (response && response.status == 200) {
            this.setState({ data: response.data.data })
        }
    }

    render() {
        const data = this.state.data;
        console.log();

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>User Management</Breadcrumb.Item>
                    <Breadcrumb.Item>

                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{ color: '#4672bb' }}>View Account Create</Breadcrumb.Item>
                </Breadcrumb><br />

                <Breadcrumb>
                    <Breadcrumb.Item>The create account allows the user to create a login and become a registered user.The system feature that enables to create and accont by entering information.</Breadcrumb.Item>
                </Breadcrumb><br />



                <div style={{ borderStyle: 'hidden', height: '250px', padding: '8px', marginLeft: '30px' }}>

                    <div style={{ height: '20px' }}></div>
                    <div >
                        <Row>
                            <Col span={13}>
                                <h3>User Name :</h3>
                                <label style={{ color: '#4672bb' }}>{data.user_name}</label>
                            </Col>
                            <Col span={7}>
                                <h3>Code :</h3>
                                <label style={{ color: '#4672bb' }}>{data.code}</label>
                            </Col>
                        </Row>
                        <br /><br />
                        <Row>
                            <Col span={13}>
                                <h3>Password :</h3>
                                <label style={{ color: '#4672bb' }}>{data.password_hash}</label>
                            </Col>
                            <Col span={7}>
                                <h3>Confirm Password :</h3>
                                <label style={{ color: '#4672bb' }}>{data.password_hash}</label>
                            </Col>
                        </Row>
                        <br /><br />
                        <Row>
                            <Col span={13}>
                                <h3>NRIC :</h3>
                                <label style={{ color: '#4672bb' }}>{data.nric}</label>
                            </Col>
                            <Col span={7}>
                                <h3>Ph No :</h3>
                                <label style={{ color: '#4672bb' }}>{data.phone}</label>
                            </Col>
                        </Row>
                        <br /><br />
                        <Row>
                            <Col span={13}>
                                <h3>Email :</h3>
                                <label style={{ color: '#4672bb' }}>{data.email}</label>
                            </Col>

                        </Row>
                    </div>
                </div>

                <div style={{ marginTop: '160px' }}>
                    <Link to="/user">
                        <Button style={{ marginLeft: '350px', height: '40px', width: '100px', padding: '4px', backgroundColor: '#4672bb', color: 'white' }}>
                            Back</Button></Link>


                    {/* <Link to="/accountcreate">
                        <Button style={{ marginLeft: '30px',height:'50px', width: '120px', padding: '4px',backgroundColor:'white',color:'black' }}>
                            Cancel</Button></Link> */}

                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        user: state.user.list,
        position: state.position.list,

    };
}
export default (View);