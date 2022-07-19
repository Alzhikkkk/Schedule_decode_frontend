import { Typography , Button , Table, Space} from 'antd';
import { useState, useEffect } from 'react';
import LessonModal from './lesson.modal';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { deleteMentor } from '../store/actions/mentorActions';
import { searchLessons, autoCompliteFunc } from '../store/actions/searchActions';
import Input from '../client/components/input'
import { deleteBusy, deleteLesson } from '../store/actions/lessonActions';

const { Title } = Typography;


function Lessons(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editLesson, setEditLesson] = useState(null);
    const [search, setSearch] = useState("");
    const onChange = e => {
        setSearch(e.target.value)
        props.autoCompliteFunc(e.target.value)
    }

    const columns = [
      {
        title: 'Weekday',
        dataIndex: 'weekday',
        key: 'weekday',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Course',
        dataIndex: 'course',
        key: 'course',
        render: (item) => <a>{item && item.name}</a>,
      },
      {
        title: 'Group',
        dataIndex: 'group',
        key: 'group',
        render: (item) => <a>{item && item.name}</a>,
      },
      {
        title: 'Room',
        dataIndex: 'room',
        key: 'room',
        render: (item) => <a>{item && item.number}</a>,
      },
      {
        title: 'Mentor',
        dataIndex: 'mentor',
        key: 'mentor',
        render: (item) => <a>{item && item.full_name}</a>,
      },
      {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Action',
        key: 'action',
        align:'right',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => startEditLesson(record)}>Редактировать</a>
            {
              !record.text ?
              <a onClick={() => props.deleteLessonAction(record.id)}>Удалить</a>
             :
              <a onClick={() => props.deleteBusyAction(record.id)}>Удалить</a>
             }
          </Space>
        ),
      },
    ];

    const startEditLesson = record => {
      showModal();
      setEditLesson(record)
    }

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
      setEditLesson(null)
    };

    const onSelectItem = (key, value) => {
        console.log("TUT")
        setSearch("");
        props.autoCompliteFunc("")
        props.searchLessonsAction({key, value})
    }

    // useEffect(() => {
    //   props.searchLessonsAction({key: 'room_id', value: "4"});
    // }, [])

    return(
        <div>
            <div className='page-header'>
                <Title>Рассписание</Title>
                <div className="page-header--actions">
                    <Input onChange={onChange} value={search} data={props.autoCompliteData} onSelectItem={onSelectItem} placeholder="Mentor, Grouop, Room"/>
                    <Button type="primary" size={'large'} onClick={showModal}>
                        Добавить запись
                    </Button>
                </div>
            </div>
            
            <Table columns={columns} dataSource={props.list} rowKey={item => item.text ? "busy-" + item.id : "lesson-" + item.id}/>
            <LessonModal isModalVisible={isModalVisible} handleCancel={handleCancel} mentor={editLesson}/>
        </div>
    )
}



const mapDispatchToProps = dispatch => ({
    searchLessonsAction: bindActionCreators(searchLessons, dispatch),
    autoCompliteFunc: bindActionCreators(autoCompliteFunc, dispatch),
    deleteLessonAction: bindActionCreators(deleteLesson, dispatch),
    deleteBusyAction: bindActionCreators(deleteBusy, dispatch)
})

const mapStateToProps = state => ({
    list: state.searchReducers.list,
    autoCompliteData: state.searchReducers.autoCompliteData
})


export default connect(mapStateToProps, mapDispatchToProps)(Lessons);



