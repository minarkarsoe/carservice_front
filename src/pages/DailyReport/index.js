import React from 'react';
import { fetchDailyreport, putDailyreport, postDailyreport, deleteDailyreport } from '../../actions/Dailyreport';
//component
import { Table, Divider, Select,Button, Card } from 'antd';
import { Input, Popconfirm } from 'antd';
import { PageHeader } from 'antd';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import history from '../../router/history';
import photo from '../../assets/img/se.svg';
import { getUserInfo } from '../../utils'
import './dailyreport.css';
import api from '../../apis'
import moment from 'moment';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
const { Option } = Select;
const uuidv4 = require('uuid/v4');
const Search = Input.Search;
const { Paragraph } = Typography;


class Dailyreport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isJobDone : false,
            dateExpire: false,
            data: [],
            loading: true
        };
    }

    componentDidMount() {
        this.getAllDailyreport();
        this.getSchedulde();
    }

    async getSchedulde(){
        const user = getUserInfo();
        const response = await api.get('/employees_chedule/'+user.schedule_id);
        const data = response.data.data[0];
        this.setState({loading: false, isJobDone: data.schedule_status === "Job Done" ? true : false , dateExpire: moment(data.end_date) < moment.now() ? true : false })
    }

    async getAllDailyreport() {
        const user = getUserInfo();
        const response = await api.get('/dailyreportbyemployee/'+user.e_id);
        const data = response.data.data;
        this.setState({...this.state,data:data})
    }
    btnview() {
        history.push('/dailyreportcreate');
    }
    goView() {
        history.push('/dailyreportview');
    }

    render() {


        const { isJobDone,data,dateExpire, loading } = this.state;

        if(loading) return(<div></div>)

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
                            to={"dailyreport/dailyreportview/" + record.id} style={{ color: 'green' }}>
                            View
                        </Link>
                        <Divider type="vertical" />
                    </span>
                ),
            }
        ];

        data.map(d => {
            let uuid = uuidv4();
            d.key = uuid;
        })

        return (
            <div >
                      <Can
          role="Admin"
          perform="position:list"
          no={() => {
            return <Forbidden />
          }}
        >
                <PageHeaderWrapper title="Daily Report"  >

                    <h5>A daily report is a kind of report documenting the procedures that transpaired within the day.It usually includes the things that have been accomplished the plans or goals for the existing or potential problems.</h5>
                  </PageHeaderWrapper>
                <Card>
                    {
                        isJobDone  ? '': 
                            dateExpire ? '' :
                        <Button onClick={this.btnview} style={{ width: '230px', height: '50px', backgroundColor: '#4672bb', paddingTop: '13px', marginTop: '20px', align: 'center', fontSize: '15px' }}>
                            <Link style={{ display: 'block', height: '100%', color: 'white' }} to={'dailyreport/dailyreportcreate'}>
                                <b>Create New Daily Report</b>
                            </Link>
                        </Button>
                    }
                    <div className='capwrap' style={{ marginTop: '30px' }}>
                        <h3 className='caption'><b></b></h3>
                        <div style={{ diplay: 'flex', justifyContent: 'space-between' }}>
                            <Search placeholder="Enter Search Here" onSearch={value => console.log(value)} style={{ width: '180px', marginLeft: '680px', marginTop: '10px', height: '20px' }} suffixIcon='se.svg' />
                            <span style={{ letterSpacing: '20 px' }}> </span>
                            <Select
                                defaultValue="All pages"
                                style={{ width: '90px', marginLeft: '20px', fontSize: '10px', height: '30px' }}>
                                <option value='1'>Page1</option>
                                <option value='2'>Page2</option>
                            </Select>
                        </div>
                    </div>
                
                <div style={{ marginTop: '10px' }}>
                    <Table
                        dataSource={data}
                        columns={columns}
                    />
                </div>
                </Card>
                </Can>
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