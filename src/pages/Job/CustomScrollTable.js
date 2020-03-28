import React from 'react';
import {
  Table,
  Card,
  Input,
  Icon,
  message
} from 'antd';
import { Link } from 'react-router-dom';

class ScrollTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      count: props.count,
      currentPagination: 1,
      customPagesize: 5,
    };

    this.columns = props.columns.concat({
      title: 'Action',

      align: 'center',
      width: 100,
      render: record => (
        <>
          <Link style={{ color: 'green', marginRight: '0.5em' }} to={"/job/View/" + record.id}>View</Link>
        </>
      )
    });
  }

  componentWillMount() {
    this.setState({ data: this.props.dataSource })
  }

  //tableFunction
  onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

  cancel(e) {
    message.error('Cancel Delete');
  }

  PositionFilter(event) {
    let inputdata = event.target.value.toLowerCase();
    const master = this.props.dataSource;
    if (inputdata === '') {
      this.setState({
        data: master
      });
    } else {
      const clone = master.filter(item => {
        return Object.keys(item).some(key =>
          item[key]
            .toString()
            .toLowerCase()
            .includes(inputdata.toLowerCase())
        );
      });
      this.setState({
        data: clone
      });

      console.log('Matched', clone);
    }
  }
  isEditing = record => record.key === this.state.editingKey;

  render() {
    const { data, neworedit, customPagesize } = this.state;

    const onChange = page => {
      this.setState({
        currentPagination: page
      });
    };

    const columns = this.columns.map(col => {
      if (col.key === 'title' && neworedit === false) {
        col.editable = false;
      } else if (col.key === 'title' && neworedit === true) {
        col.editable = true;
      }
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    return (
      <div>

        <h2 style={{ paddingBottom: '30px' }}>
          <Input
            style={{ width: '21%', float: 'right', margin: '0 0.5em 0.2em 0' }}
            onChange={event => {
              this.PositionFilter(event);
            }}

            placeholder="Search"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </h2>


        <Table
          key={data.key}
          pagination={{
            onChange: onChange,
            pageSize: Number(customPagesize),
            position: 'bottom'
          }}
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          bordered

        />


      </div>

    );
  }
}

export default ScrollTable;
