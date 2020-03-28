import React from 'react';
import { Table, Divider, Input, Breadcrumb, Card, Row, Col, Icon, Select, Popconfirm } from 'antd';
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom'
import api from 'apis';
import { fetchComplain } from '../../actions/Complain';
import Can from '../../../src/utils/Can';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import Forbidden from '../Forbidden';
const moment = require('moment')
const uuidv4 = require('uuid/v4');

const renderCom = (record) => {
    return (<Link
        to={"/assign/view/" + record.id}
        style={{ color: 'green' }}>
        View
    </Link>
    );
}
const renderCom1 = (record) => {
    return (<span> <Link
        to={"/assign/view/" + record.id}
        style={{ color: 'green' }}>
        View
        </Link>
        <Divider type="vertical" />
        <Link
            to={"assign/accept/" + record.id}
            style={{ color: 'blue' }}>
            Accept
        </Link>
        <Divider type="vertical" />
        <Popconfirm
            title="Are you sure reject?"
            onConfirm={() => reject(record.id)}
            okType="danger"
        >
            <a style={{ color: '#ff3333' }}>Reject</a>
        </Popconfirm>

    </span>
    );
}

const reject = (id) => {
    api.put(`complain/reject/${id}`).then(result => {
        console.log('Succes')
    })

}

const columns = [
    {
        title: 'Complain No',
        dataIndex: 'complain_no',
        width: 100,
        align: 'center',
        sorter: (a, b) => a.cno.length - b.cno.length,
        sortDirections: ['ascend', 'descend']
    },
    {
        title: 'Complain Job Title',
        dataIndex: 'complain_job_title',
        width: 100,
        align: 'center',
        sorter: (a, b) => a.complain_job_title.length - b.complain_job_title.length,
        sortDirections: ['ascend', 'descend']
    },
    {
        title: 'Date',
        dataIndex: 'date',
        width: 90,
        align: 'center',
        sorter: (a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()),
        sortDirections: ['ascend', 'descend']
    },
    {
        title: 'Customer Name',
        dataIndex: 'customer_name',
        width: 100,
        align: 'center',
        sorter: (a, b) => a.customer_name.length - b.customer_name.length,
        sortDirections: ['ascend', 'descend']
    },
    {
        title: 'Status',
        dataIndex: 'complain_status',

        width: 90,
        align: 'center'
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: 120,
        render: (text, record) => (
            <span>
                {record.complain_status === 'Rejected' || record.complain_status ==='Accept' ? (renderCom(record)) : (renderCom1(record))}
            </span>
        )
    }
];
class AssignSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPagination: 1,
            customPagesize: 5
        };
    }

    componentDidMount() {
        this.getAllComplain();
    }

    getAllComplain() {
        console.log(this.props.fetchComplain())
    }
    reject = key => {
        const newData = this.props.complains;
        const index = newData.findIndex(item => key === item.key);
        const item = newData[index];

        this.deleteEmp(item.id);
        // message.success('Deleted !');
    };

    deleteEmp = (id) => {
        console.log(id);
        ;
    }

    render() {
        const { currentPagination, customPagesize } = this.state;
        const onChange = page => {
            this.setState({
                currentPagination: page
            });
        };
        const pageSizeHandler = value => {
            this.setState({
                customPagesize: value
            });
        };

        const data = this.props.complains;
        data.map(d => {
            let uuid = uuidv4();
            d.key = uuid;
        })


        return (
            <div className='wrap'>                 <Can
                role="Admin"
                perform="position:list"
                no={() => {
                    return <Forbidden />
                }}
            >
                <PageHeaderWrapper title="Assign To Schedule">


                    <h5>Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is simply dummy text of the printing.Lorem Ipsum is simply dummy text of the printing. </h5></PageHeaderWrapper>


                <Card bordered={false}>
                    <Row>
                        <Col sm={24} md={24} style={{ paddingBottom: '10px' }}>
                            <div>
                                <h3> Complain List</h3>
                                <Select
                                    onChange={pageSizeHandler}
                                    defaultValue={customPagesize.toString()}
                                    style={{
                                        width: '100px',
                                        float: 'right',
                                        clear: 'left'
                                        // paddingLeft: '10px',
                                    }}
                                >
                                    <Select.Option value="5">5 / page</Select.Option>
                                    <Select.Option value="10">10 / page</Select.Option>
                                    <Select.Option value="20">20 / page</Select.Option>
                                </Select>
                                <Input shape="round" onSearch={value => console.log(value)}
                                    style={{ width: '18%', float: 'right', marginRight: '1em', paddingBottom: '10px' }}
                                    prefix={
                                        <Icon type="search" />
                                    }
                                    placeholder="Search"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={24} md={24}>
                            <div style={{ border: '1px solid #e8e8e8' }}>
                                <Table
                                    pagination={{
                                        onChange: onChange,
                                        pageSize: Number(customPagesize),
                                        position: 'bottom'
                                    }}
                                    dataSource={data}
                                    columns={columns}
                                    bordered
                                />
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Can>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        complains: state.complain.list,
    };
}
export default connect(
    mapStateToProps,
    { fetchComplain }
)(AssignSchedule);
