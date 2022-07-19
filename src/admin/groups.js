import { Typography , Button , Table, Space} from 'antd';
import { useState, useEffect } from 'react';
import GroupModal from './group.modal';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { deleteActiveGroup, getActiveGroups } from '../store/actions/groupActions'

const { Title } = Typography;





function Groups(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editGroup, setEditGroup] = useState(null);

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Start',
        dataIndex: 'start',
        key: 'start',
        render: (text) => <a>{JSON.stringify(text)}</a>,
      },
      {
        title: 'End',
        dataIndex: 'end',
        key: 'end',
        render: (text) => <a>{JSON.stringify(text)}</a>,
      },
      
      {
        title: 'Action',
        key: 'action',
        align:'right',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => startEditGroup(record)}>Редактировать</a>
            <a onClick={() => props.deleteGroupAction(record.id)}>Удалить</a>
          </Space>
        ),
      },
    ];

    const startEditGroup = record => {
      showModal();
      setEditGroup(record)
    }

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
      setEditGroup(null)
    };

    useEffect(() => {
      props.getGroupsAction();
    }, [])

    return(
        <div>
            <div className='page-header'>
                <Title>Группы</Title>
                <Button type="primary" size={'large'} onClick={showModal}>
                    Добавить группу
                </Button>
            </div>
            <Table columns={columns} dataSource={props.groups} rowKey={item => item.id}/>
            <GroupModal isModalVisible={isModalVisible} handleCancel={handleCancel} group={editGroup}/>
        </div>
    )
}



const mapDispatchToProps = dispatch => ({
    getGroupsAction: bindActionCreators(getActiveGroups, dispatch),
    deleteGroupAction: bindActionCreators(deleteActiveGroup, dispatch)
})

const mapStateToProps = state => ({
    groups: state.groupsReducers.activeGroups
})


export default connect(mapStateToProps, mapDispatchToProps)(Groups);


// Load Components -> in useEffect we call Action (type: GET_MENTORS) -> 
// SAGA listen to Action (type: GET_MENTORS) and make request to backend then 
// send recieved data to new Action (type: RECIEVED_GET_MENTORS) 
// and save list of mentors in payload in  action
// Reducer listen to Action (type: RECIEVED_GET_MENTORS) and update state with new list of mentors
// Mentors component listen to store changes by (mapStateToProps) and connect function
// So Mentor component props are updated and component will rerender with new data

