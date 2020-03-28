import React from 'react'

import {
    Form,
    Breadcrumb,
    Button, Icon,
    Upload, message, Divider,
    Input, Select, DatePicker
} from 'antd';
import { connect } from "react-redux";

import api from 'apis';
import { noti } from 'utils/index';
import { pa } from '../../assets/img/parentinformation.svg';
import { up } from '../../assets/img/uploadphoto.svg';
import { Link } from 'react-router-dom'
import other from '../../assets/img/other.png'
import psn from '../../assets/img/personal.svg'
import job from '../../assets/img/job.svg'
import contact from '../../assets/img/contact.svg'
import parent1 from '../../assets/img/parentinformation.svg'
import history from '../../router/history'
import { fetchEmployee, postEmployee } from '../../actions/Employee';
import { fetchPosition } from '../../actions/Position';
import { fetchDepartment } from '../../actions/Department';

const image = {
    width: '100px',
    height: '100px',
    backgroundColor: '#fff',
    marginLeft: '30px'
    // padding: '20px',
    // marginLeft: '30%',
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}


const { Option } = Select;
class CreateEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            loading: false,
        };
    }

    componentDidMount() {
        this.getAllData();
    }

    getAllData() {
        this.props.fetchDepartment();
        this.props.fetchPosition();
    }



    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file);
            console.log(info);
            let preview = URL.createObjectURL(info.file.originFileObj);
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                console.log("Hello", imageUrl);

                this.setState({
                    preview: preview,
                    file: imageUrl,
                    loading: false,
                })
            });
        }
    };


    state = {
        size: 'large',
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };




    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    'dob': fieldsValue['dob'].format('YYYY-MM-DD'),
                    'start_date': fieldsValue['start_date'].format('YYYY-MM-DD')
                }
                values.image = this.state.file
                api.post('employees', values).then((result) => {

                    console.log("Result", result);

                })
                noti('success', 'Successfully!', 'Emp has been created successfully.')
            } else {
                noti('error', 'Unsuccessfully!', 'Fail to Create.')
            }
        });history.push('/employee')
    };




    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.preview;
        const size = this.state.size;

        const { getFieldDecorator } = this.props.form;

        const renderPosition = (
            <Select style={{
                width: '240px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select position">
                {this.props.position.map(item => {
                    return <Option value={item.id}>{item.name}</Option>
                })}
            </Select>
        )
        const renderDepartment = (
            <Select style={{
                width: '240px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select department">
                {this.props.department.map(item => {
                    return <Option value={item.id}>{item.name}</Option>
                })}
            </Select>
        )
        const prefixSelector = getFieldDecorator('phone', {
            initialValue: '959',
        })(
            <Select style={{ width: 70 }}>
                <Option value="959">+95</Option>
                {/* <Option value="87">+87</Option> */}
            </Select>,
        );



        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Configuration</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Employee </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Create Employee</Breadcrumb.Item>
                </Breadcrumb>
                <h2>Create Employee</h2>
                <p> You can add Employee basic data by entering one by one using the following form.</p>
                <br />

                <Form onSubmit={this.handleSubmit} >
                    <Form.Item label="Profile Image">
                        {getFieldDecorator("image", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please upload your image"
                                }
                            ]
                        })(
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={image} /> : uploadButton}
                            </Upload>

                            // <input type="file" name="image" onChange={this.onChange} />
                        )
                        }
                    </Form.Item>



                    <div style={{ height: '230px' }}>
                        <img src={psn} style={{ width: '30px', height: '30px',marginRight:'20px' }} /><b>Personal Information</b>

                        <div
                            style={{
                                display: 'flex',
                                flexwrap: 'wrap',
                                marginTop: '20px'
                            }}
                        >
                            <Form.Item
                                style={{

                                    marginLeft: '30px',
                                    display: 'inline-block',
                                    width: '240px',

                                }}
                                label="Code"
                            >
                                {getFieldDecorator('code', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your code!'
                                    }]
                                })(<Input style={{
                                    display: 'inline-block',
                                    defaultValue: 'EMP-'
                                }} placeholder="Enter Code" />)}
                            </Form.Item>
                            <Form.Item
                                style={{
                                    marginLeft: '200px',
                                    display: 'inline-block',
                                    width: '240px'
                                }}
                                label="Name:"
                            >
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your name!'
                                    }]
                                })(<Input style={{
                                    marginleft: '10px',
                                    display: 'inline-block'
                                }} placeholder="Enter Name" />)}
                            </Form.Item>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexwrap: 'wrap',
                            margin: '30px'
                        }}>
                            <Form.Item style={{

                                width: '240px',
                                display: 'inline-block'
                            }}
                                label="NRC:">
                                {getFieldDecorator('nric', {
                                    rules: [{
                                        required: true,
                                        pattern: new RegExp("^([0-9]{1,2})/([A-Z][a-z]|[A-Z][a-z][a-z])([A-Z][a-z]|[A-Z][a-z][a-z])([A-Z][a-z]|[A-Z][a-z][a-z])\\([N,P,E]\\)([0-9]{6})$"),
                        //   message: "Wrong NRIC format "
                                        message: 'Please input your NRC! Format'
                                    }]
                                })(<Input style={{
                                    display: 'inline-block'
                                }} placeholder="Enter NRC" />)}
                            </Form.Item>


                            <Form.Item style={{
                                width: '320px',
                                marginLeft: '200px',
                                display: 'inline-block'
                            }} label="Date Of Birth">
                                {
                                    getFieldDecorator('dob', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your date of birth!'
                                        }]
                                    })(<DatePicker style={{
                                        width: '240px',
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="dd/mm/yyyy" />)}
                            </Form.Item>
                        </div>
                    </div>
                    <br></br>
                    <div style={{ height: '230px', marginTop: '50px' }}>
                    <img src={job} style={{ width: '30px', height: '30px',marginRight:'20px' }} /><b>Job Information</b>

                        <div
                            style={{
                                display: 'flex',
                                margin: '30px',
                            }
                            }>
                            <Form.Item
                                style={{
                                    width: '180px',
                                    display: 'block'
                                }}
                                label="Position:"
                            >
                                {getFieldDecorator('position_id', {
                                    rules: [{ required: true, message: 'Please select position' }],
                                })
                                    (renderPosition)
                                }
                            </Form.Item>
                            <Form.Item style={{
                                width: '250px',
                                marginLeft: '260px',
                            }} label="Department:">

                                {getFieldDecorator('department_id', {
                                    rules: [{ required: true, message: 'Please select department' }],
                                })
                                    (renderDepartment)
                                }
                            </Form.Item>

                        </div>
                        <div style={{
                            display: 'flex',

                            margin: '30px',
                            flexwrap: 'wrap'

                        }}>
                            <Form.Item style={{
                                width: '400px',
                                display: 'inline-block'
                            }} label="Start Date:">
                                {getFieldDecorator('start_date', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your start date!'
                                    }]
                                })(
                                    <DatePicker style={{
                                        width: '240px',
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="dd/mm/yyyy" />
                                )}
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ height: '230px', marginTop: '80px' }}>
                    <img src={contact} style={{ width: '30px', height: '30px',marginRight:'20px' }} /><b>Contact Information</b>
                       

                        <div style={{
                            display: 'flex',

                            margin: '30px',

                        }}>
                            <Form.Item style={{
                                width: '240px',



                            }} label="Email:">
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email',
                                        message: 'The input is not valid E-mail',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your email'
                                    }
                                    ]
                                })(<Input style={{ marginLeft: '1px', display: 'inline-block' }}
                                    placeholder="Enter your email" />)}
                            </Form.Item>



                            {/* <Form.Item style={{ margin: '0 340px 8px 0', }} */}
                            <Form.Item style={{
                                width: '230px',

                                marginLeft: '200px',

                            }}
                                label="Phone No:">
                                {getFieldDecorator('phone', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your phone no!',
                                        isNumber:true,
                                        maxLength:8
                                    }]
                                })(<Input style={{
                                    marginLeft: '1px',
                                    width: '240px'
                                }} addonBefore={prefixSelector} placeholder="0 0000 0000" />)}
                            </Form.Item>
                        </div>
                        {/* <div style={{display:'flex',justifyContent:'space-between'}}> */}
                        <div style={{
                            display: 'flex',
                            height: '230px',
                            margin: '30px',

                        }}>

                            <Form.Item style={{
                                width: '200px',

                                display: 'inline-block'
                            }} label="Permanent Address:">
                                {getFieldDecorator('parmanent_address', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your permanent address!'
                                    }]
                                })(<Input style={{
                                    marginleft: '10px',
                                    width: '240px'

                                }} placeholder="Enter Permanent Address" />)}
                            </Form.Item>

                            <Form.Item style={{
                                width: '240px',
                                marginLeft: '240px',
                                display: 'inline-block'
                            }} label="Temporary Address">
                                {
                                    getFieldDecorator('temporary_address', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your temporary address!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        width: '240px'

                                    }} placeholder="Enter Temporary Address!" />)}
                            </Form.Item>


                        </div>
                    </div>



                    <div style={{ height: '150px', marginTop: '80px' }}>

                    <img src={parent1} style={{ width: '30px', height: '30px',marginRight:'20px' }} /><b>Parent Information</b>
                        

                        <div style={{
                            display: 'flex',
                            height: '230px',
                            marginLeft: '30px',
                            marginTop: '30px',

                        }}>
                            <Form.Item style={{

                                marginLeft: '1px',
                                display: 'inline-block'
                            }} label="Father Name:">
                                {getFieldDecorator('father_name', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your father name!'
                                    }]
                                })(<Input style={{
                                    marginleft: '10px',
                                    width: '240px',
                                    display: 'inline-block'
                                }} placeholder="Enter Father Name" />)}
                            </Form.Item>

                            <Form.Item style={{

                                marginLeft: '200px',
                                display: 'block'
                            }} label="Mother Name:">
                                {getFieldDecorator('mother_name', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your mother name!'
                                    }]
                                })(<Input style={{
                                    marginleft: '10px',
                                    width: '240px',
                                    display: 'inline-block'
                                }} placeholder="Enter Mother Name" />)}
                            </Form.Item>
                        </div></div>



                    <div style={{ height: '190px', marginTop: '30px' }}>
                    <img src={other} style={{ width: '30px', height: '30px',marginRight:'20px' }} /><b>Other Information</b>
                      




                        <div style={{ display: 'flex', marginTop: '30px' }}>


                            <Form.Item style={{ float: 'left', marginLeft: '30px' }}

                                label="Education:">
                                {getFieldDecorator('education', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your education'
                                    }]
                                })(<Input style={{
                                    marginLeft: '1px',
                                    width: '240px'

                                }} placeholder="Enter your education " />)}
                            </Form.Item>
                            <Form.Item style={{
                                marginLeft: '200px',
                                display: 'block'
                            }}


                                label="Social_Media_Link">
                                {getFieldDecorator('social_media_link', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your social_media_link address!'
                                    }]
                                })(<Input style={{
                                    marginLeft: '1px',
                                    width: '240px'
                                }} placeholder="Enter your education " />)}
                            </Form.Item>
                        </div>
                    </div>
                    <Button type='primary'
                        htmlType="submit"
                        size={size} style={{ marginLeft: '25%', backgroundColor: '#4672bb', width: '100px', padding: '4px' }}>
                        Submit</Button>
                    <Link to="/employee">
                        <Button size={size} style={{ marginLeft: '30px', width: '100px', padding: '4px' }}>
                            Cancel</Button></Link>
                </Form>
            </div>



        );
    }
}


const Employee = Form.create()(CreateEmployee);

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        position: state.position.list,
        department: state.department.list
    };
}

export default connect(
    mapStateToProps,
    { fetchEmployee, postEmployee, fetchPosition, fetchDepartment }
)(Employee);
