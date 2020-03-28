import React from 'react';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Table, Divider, Input, Breadcrumb, Card, Row, Col, Icon, Select, Popconfirm } from 'antd';
import ScrollTable from './CustomScrollTable';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import { connect } from "react-redux";
import apis from '../../apis';
import {getUserInfo} from '../../utils'
class Schedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getJob();
        
    }

    async getJob() {

        const user = getUserInfo();
        console.log(user)

        const response = await apis.get('/employees_chedule/'+user.schedule_id);
        if (response && response.status === 200) {
            console.log(response.data.data)
            this.setState({ data: [...response.data.data], loading: false })
        }
    }


    render() {
        const { data, loading } = this.state;
        if (loading) return (<div></div>)
        const dataSource = data;

        const columns = [
            {
                title: 'Complain Number',
                width: '250px',
                dataIndex: 'compo',
                align:'center',
                sorter: (a, b) => a.complain_no.length - b.complain_no.length,
                sortDirections: ['ascend', 'descend'],


            },

            {
                title: 'Model No',
                dataIndex: 'model_no',
                align:'center',
                sorter: (a, b) => { var as = a.sdate.replace(/[-]/g, ''); var bs = b.sdate.replace(/[-]/g, ''); return as - bs; },
                sortDirections: ['ascend', 'descend'],

            },
            {
                title: 'FUP No',
                dataIndex: 'fup',
                align:'center',
                sortDirections: ['ascend', 'descend'],
                sorter: (a, b) => { var as = a.edate.replace(/[-]/g, ''); var bs = b.edate.replace(/[-]/g, ''); return as - bs; }
            },
            {
                title: 'Warranty',
                dataIndex: 'wyear',
                align:'center',
                sortDirections: ['ascend', 'descend'],
                sorter: (a, b) => { var as = a.edate.replace(/[-]/g, ''); var bs = b.edate.replace(/[-]/g, ''); return as - bs; }
            },
            {
                title: 'Status',
                dataIndex: 'schedule_status',
                align:'center',
            },

        ];
        const perform = {
            create: "position:create",
            edit: "position:edit"
        }
        const newData = {
            title: "",
            description: ""
        }

        return (
            <div>
                <Can
                    role="Admin"
                    perform="position:list"
                    no={() => {
                        return <Forbidden />
                    }}
                >
                    <PageHeaderWrapper title='Job For Service Man'>
                  
                   <h5 >Perform basic care and maintenance,including changing oil,givind tuneups,checking fluid levels, and rotating tires.Repair or replace worn parts,such as brake pads and wheel bearings. </h5>
                    </PageHeaderWrapper>
                   
                  <Card>
                    <ScrollTable
                        dataSource={dataSource}
                        columns={columns}
                        role="Admin"
                    />
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
    };
}
export default connect(
    mapStateToProps
)(Schedule);
