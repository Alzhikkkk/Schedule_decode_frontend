import React , { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from 'antd';
import exitButton from '../assets/exit.svg'
import axios from 'axios';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import Mentors from './mentors';

const { Header, Sider, Content } = Layout;
axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('token')}`;

function Admin() {
    let navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const onSelect = ({key}) => {
        console.log("1", key)
        navigate(`/admin/${key}`)
    }

    useEffect(() =>{
        if(!localStorage.getItem('token')){
            navigate('../login')
        }
    }, [])


    const exit = () => {
        localStorage.clear()
        navigate('../login')
    }


    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onSelect= {onSelect}
                    items={[
                        {
                            key: 'mentor',
                            icon: <UserOutlined />,
                            label: 'Менторы',
                        },
                        {
                            key: 'group',
                            icon: <VideoCameraOutlined />,
                            label: 'Группы', 
                        },
                        {
                            key: 'schedule',
                            icon: <VideoCameraOutlined />,
                            label: 'Расписание', 
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <img src={exitButton} className='exitButton' onClick={exit}/>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
export default Admin