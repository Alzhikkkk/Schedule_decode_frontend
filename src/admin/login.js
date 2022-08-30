import { Button, Checkbox, Form, Input } from 'antd';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import {login} from "../store/actions/loginAdminActions"
import { useNavigate } from "react-router-dom";

const Login = ({loginAdminAction, token}) => {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const onFinish = (values) => {
    loginAdminAction({email:values.email,password:values.password}, navigate);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  const onChangePassword = e => {
    setPassword(e.target.value)
}

useEffect(() => {
  if(localStorage.getItem('token')){
     navigate('../admin')
  }
}, [])

  return (
    <div className='loginAdmin'>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input value={email} placeholder = "Please enter your email!" onChange={onChangeEmail}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password value={password} placeholder = "Please enter your password!" onChange={onChangePassword}/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
    loginAdminAction: bindActionCreators(login, dispatch),
})

const mapStateToProps = state => ({
    token: state.loginAdminReducers.token
})

export default connect(mapStateToProps ,mapDispatchToProps)(Login);