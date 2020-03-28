// 

import React from 'react';
import { Table, Divider, Tag, Card } from 'antd';
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { Input, Popconfirm } from 'antd';
import { Link, Route } from 'react-router-dom'
import { fetchCpl, putCpl, postCpl, deleteCpl } from '../../actions/Cpl'
import { connect } from "react-redux";
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
//  import './employee.css';
import { PageHeader, Typography } from 'antd';
// const middleware = [routerMiddleware(history)];
import { Select, Icon } from 'antd';
import history from '../../router/history'

const uuidv4 = require('uuid/v4');

const Search = Input.Search;
const { Paragraph } = Typography;
const { Option } = Select;



const routes = [
 

  {
    path: 'Customer Payment Lists',
    breadcrumbName: 'Customer Payment Lists',
    fontColor:'#4672bb'
  }

];

class Cpl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }


  componentDidMount() {
    this.getAllCpl();
  }

  getAllCpl() {
    console.log(this.props.fetchCpl())
  }

  getCplbyId(id) {
    this.props.fetchCpl(id);
  }
  btnClickAdd=()=>{
    history.push('/cpls/create')
  }

  delete = key => {
    const newData = this.props.cpl;
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    this.deleteCpl(item.id);
    // message.success('Deleted !');
  };

  deleteCpl = (id) => {
    this.props.deleteCpl(id);
  }




  render() {
    const columns = [
      {
      title: 'Complain No',
      dataIndex: 'complain_no',
      key: 'complain_no',
      align: 'center',
      editable: true,
      
      width: '100',
      sortDirections: ['ascend', 'descend'],
      dataIndex: 'complain_no',
      sorter: (a, b) => a.complain_no.length - b.complain_no.length
      },
      
      {
      title: 'Invoice No',
      dataIndex: 'invoice',
      width: '100',
      align: 'center',
      key: 'invoice',
      
      sorter: (a, b) => a.model_no.length - b.model_no.length,
      sortDirections: ['descend', 'ascend'],
      editable: true
      },
      {
        title: 'Customer Name',
        dataIndex: 'customer_name',
        width: '100',
        align: 'center',
        key: 'cus_name',
      },
      {
        title: 'Amount',
        dataIndex: 'ammount',
        width: '100',
        align: 'center',
        key: 'ammount',
      },
      {
        title: 'Payment Date',
        dataIndex: 'paymentdate',
        width: '100',
        align: 'center',
        key: 'paymentdate',
      },
      {
          title: 'Action',
          key: 'action',
         
          align: 'center',
          width: '100',
          render: (text, record) => (
            <span>
             <Link
                to={"/cpls/view/" +record.id} style={{ color: 'green' }}>
                View
              </Link>
          <Divider type="vertical" />
              
              <Link to={"/cpls/edit/" +record.id} style={{ color: 'blue' }} >
              
              Edit
              </Link>
              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure delete?"
                onConfirm={() => this.delete(record.key)}
                okType="danger"
              >
                <a style={{ color: '#ff3333' }}>Delete</a>
              </Popconfirm>
            </span>
          ),
         
        }
      
          
      
      
      ];
    let dataSource = this.props.cpl;
    console.log("Daaa", dataSource);

    dataSource.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div className='wrap'>
        <PageHeaderWrapper title="Customer Payment Lists"  >

          <h5>Payment methods used in a modern business context include cash,checks,credits or debit cards,money orders.</h5></PageHeaderWrapper>
         <Card>
          <Button style={{backgroundColor:'#4672bb'}}type="primary" size="large" onClick={this.btnClickAdd}>Create New Customer Payment List</Button><br></br><br></br>
          <div>
            <Search placeholder="Search" onSearch={value => console.log(value)} style={{ width: 200, float: 'right',marginBottom:'20px',marginTop:'30px'}} />
          
          </div>
        <div className='twrap'>
          <Table className='ant-table-thead ant-table-tbody ant-table'
            dataSource={dataSource}
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
    cpl: state.cpl.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchCpl, postCpl, putCpl, deleteCpl }
)(Cpl);
