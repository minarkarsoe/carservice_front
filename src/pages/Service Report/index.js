import React from 'react';
import { fetchDailyreport, putDailyreport, postDailyreport, deleteDailyreport } from '../../actions/Dailyreport';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Table, Divider, Select, Card } from 'antd';
import { Input, Popconfirm } from 'antd';
import { PageHeader } from 'antd';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import history from '../../router/history';
import photo from '../../assets/img/se.svg';
import './dailyreport.css';
const { Option } = Select;
const uuidv4 = require('uuid/v4');
const Search = Input.Search;
const { Paragraph } = Typography;



class Dailyreport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.getAllDailyreport();
    }

    getAllDailyreport() {
        this.props.fetchDailyreport()
    }

    goView() {
        history.push('/servicereportview');
    }

    render() {
        const searchIcon = <img src={photo} />;
        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                align: 'center',
                editable: true,
                width: '10%',
                sortDirections: ['ascend', 'descend'],
                sorter: (a, b) => a.name.length - b.name.length
            },
            {
                title: 'Job Code',
                dataIndex: 'jcode',
                key: 'job_code',
                align: 'center',
                editable: true,
                width: '10%',
                sortDirections: ['ascend', 'descend'],
                sorter: (a, b) => a.name.length - b.name.length
            },
            {
                title: 'FUP No',
                dataIndex: 'fup',
                width: '10%',
                align: 'center',
                key: 'fupno',
                sorter: (a, b) => a.description.length - b.description.length,
                sortDirections: ['descend', 'ascend'],
                editable: true
            },
            {
                title: 'Working Hour',
                dataIndex: 'wkhour',
                width: '15%',
                align: 'center'
            },
            {
                title: 'Description',
                dataIndex: 'description',
                width: '20%',
                align: 'center'
            },
            {
                title: 'Remark',
                dataIndex: 'remark',
                width: '15%',
                align: 'center'
            },
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                width: '15%',
                render: (text, record) => (
                    <span>
                        <Link
                            to={"servicereport/servicereportview/" + record.id} style={{ color: 'green' }}>
                            View
                        </Link>
                        <Divider type="vertical" />
                    </span>
                ),
            }
        ];

        let data = this.props.dailyreport;
        data.map(d => {
            let uuid = uuidv4();
            d.key = uuid;
        })

        return (
            <div >
                <PageHeaderWrapper title="Service Report"  >

                    <h5>A service man report is a kind of report documenting the procedures that transpaired within the day.It usually includes the things that have been accomplished the plans or goals for the existing or potential problems.</h5>
                    </PageHeaderWrapper>
                 <Card>
                    <div>
            <Search placeholder="Search" onSearch={value => console.log(value)} style={{ width: 200, float: 'right',marginBottom:'20px',marginTop:'30px'}} />
          
          </div>
                    
                <div style={{ marginTop: '10px' }}>
                    <Table
                        dataSource={data}
                        columns={columns}
                    />
                </div></Card>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        dailyreport: state.dailyreport.list,
    };
}

export default connect(
    mapStateToProps,
    { fetchDailyreport, putDailyreport, postDailyreport, deleteDailyreport }

)(Dailyreport);