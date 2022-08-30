import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { updateMentor } from '../store/actions/mentorActions';
import { getActiveGroups } from '../store/actions/groupActions';
import { getRooms } from '../store/actions/roomActions';
import { getCourses } from '../store/actions/courseActions';
import { getMentors } from '../store/actions/mentorActions';
import { createLesson, createBusy, updateLesson, updateBusy } from '../store/actions/lessonActions';
import {Modal , Input , Button, Form} from 'antd'
import { weekDays, time } from '../utils/calendar-info';
import { bindActionCreators } from 'redux';
import { Select } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import { OmitProps } from 'antd/lib/transfer/ListBody';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;

function LessonModal({ isModalVisible , 
    mentor,
    handleCancel, 
    loading, 
    getActiveGroupsAction,
    getRoomsAction,
    getCoursesAction,
    getMentorsAction,
    updateLessonAction,
    updateBusyAction,
    rooms,
    courses,
    activeGroups,
    mentors,
    createLessonAction,
    createBusyAction,
    errors, 
    load
}){

    const [course_id, setCourse] = useState("");
    const [group_id, setGroup] = useState("");
    const [mentor_id, setMentor] = useState("");
    const [room_id, setRoom] = useState("");
    const [lessonInputs, setLessonInputs] = useState([{
        time: "",
        weekday: ""
    }]);
    const [text, setText] = useState("");
    const [activeTab, setActivetab] = useState(1);
    console.log(rooms, courses, activeGroups, mentors)

    const handleOk = () => {
        if(activeTab === 1){
            if(!mentor){
                createLessonAction({
                    course_id,
                    room_id,
                    mentor_id,
                    group_id,
                    lessonInputs
                })  
            }else{
                // console.log(group_id)
                
                updateLessonAction({
                    id:mentor.id,
                    time: lessonInputs[0].time,
                    weekday: lessonInputs[0].weekday,
                    course_id,
                    room_id,
                    mentor_id,
                    group_id,
                })
            }
        }else{
           if(!mentor){
            createBusyAction({
                mentor_id,
                text,
                lessonInputs
            })
          }else{
              updateBusyAction({
                  id:mentor.id,
                  mentor_id,
                  text,
                  time: lessonInputs[0].time,
                  weekday: lessonInputs[0].weekday,
              })
          }
        }
    };

    const onChangeCourse = value => {
        setCourse(value)
    }

    const onChangeGroup = value => {
        setGroup(value)
    }

    const onChangeMentor = value => {
        setMentor(value)
    }

    const onChangeRoom = value => {
        setRoom(value)
    }

    useEffect(() => {
        if(!loading && !errors || !load) {
            setCourse("")
            setGroup("")
            setMentor("")
            setRoom("")
            setLessonInputs([{
                time: "",
                weekday: ""
            }])
            handleCancel();
        } 
    }, [loading || load])

    useEffect(()=> {
        console.log(activeTab)
        if(mentor && mentor.text){
            setActivetab(2)
        }else{
            setActivetab(1)
        }
    }, [mentor])

    useEffect(() => {
        if(mentor){
            console.log(mentor)
            if(!mentor.text){
            setCourse(mentor.course_id)
            setGroup(mentor.group_id)
            setMentor(mentor.mentor_id)
            setRoom(mentor.room_id)
            }else{
                setMentor(mentor.mentor_id)
                setText(mentor.text)
            }
        setLessonInputs([{time: mentor.time, weekday: mentor.weekday}])
        }else{
            setCourse("")
            setGroup("")
            setMentor("")
            setRoom("")
            setLessonInputs([{
                time: "",
                weekday: ""
            }])
            setText("")
        }
    }, [mentor])

    useEffect(() => {
        getActiveGroupsAction()
        getRoomsAction()
        getCoursesAction()
        getMentorsAction()
    },[])

    const onChangeWeekday = (index, value) => {
        const list = [...lessonInputs]
        list[index].weekday = value;
        setLessonInputs(list)
    }

    const onChangeTime = (index, value) => {
        const list = [...lessonInputs]
        list[index].time = value;
        setLessonInputs(list)
    }

    const addLesson = () => {
        setLessonInputs([...lessonInputs, {weekday: "", time: ""}])
    }

    const deleteLesson = index => {
        const list = [...lessonInputs]
        list.splice(index, 1)
        setLessonInputs(list)
    }

    const onChange = (key) => {
        setActivetab(key);
    };

    const onChangeText = e => {
        setText(e.target.value);
    }

    return(
        <Modal 
            title="Добавление записи" 
            visible={isModalVisible} 
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Сохранить
                </Button>,
        ]}>
            <Tabs activeKey={`${activeTab}`} onChange={onChange}> 
                <TabPane tab="Уроки" key="1">
                <Form.Item validateStatus={errors && errors.course_id ? "error" : "success"} help={errors && errors.course_id ? errors.course_id : ""} key="100">
                <Select
                    showSearch
                    style={{
                        width: "100%",
                       
                    }}
                    size="large"
                    placeholder="Search to Course"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={onChangeCourse}
                    value={course_id ? course_id : null}
                >
                    {courses.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item validateStatus={errors && errors.group_id ? "error" : "success"} help={errors && errors.group_id ? errors.group_id : ""} key="101">
            <Select
                showSearch
                style={{
                    width: "100%",
                   
                }}
                size="large"
                placeholder="Search to Group"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                onChange={onChangeGroup}
                value={group_id ? group_id : null}
            >
                {activeGroups.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
            </Select>
            </Form.Item>
            <Form.Item validateStatus={errors && errors.mentor_id ? "error" : "success"} help={errors && errors.mentor_id ? errors.mentor_id : ""} key="102">
            <Select
                showSearch
                style={{
                    width: "100%",
                   
                }}
                size="large"
                placeholder="Search to Mentor"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                onChange={onChangeMentor}
                value={mentor_id ? mentor_id : null}
            >
                {mentors.map(item => <Option value={item.id} key={item.id}>{item.full_name}</Option>)}
            </Select>
            </Form.Item>
            <Form.Item validateStatus={errors && errors.room_id ? "error" : "success"} help={errors && errors.room_id ? errors.room_id : ""} key="103">
            <Select
                showSearch
                style={{
                    width: "100%",
                   
                }}
                size="large"
                placeholder="Search to Room"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                onChange={onChangeRoom}
                value={room_id ? room_id : null}
            >
                {rooms.map(item => <Option value={item.id} key={item.id}>{item.number}</Option>)}
            </Select>
            </Form.Item>
                </TabPane>
                <TabPane tab="Занятость преподавателя" key="2">
                    <Form.Item key="105" validateStatus={errors && errors.mentor_id ? "error" : "success"} help={errors && errors.mentor_id ? errors.mentor_id : ""}>
                        <Select
                            showSearch
                            style={{
                                width: "100%",
                            
                            }}
                            size="large"
                            placeholder="Search to Mentor"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.includes(input)}
                            filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            onChange={onChangeMentor}
                            value={mentor_id ? mentor_id : null}
                        >
                            {mentors.map(item => <Option value={item.id} key={item.id}>{item.full_name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item key="106" validateStatus={errors && errors.text ? "error" : "success"} help={errors && errors.text ? errors.text : ""}>
                          <Input value={text} onChange={onChangeText} size="large" placeholder="Введите  коментарий" />
                    </Form.Item>
                </TabPane>
            </Tabs> 
            
            {lessonInputs.map((lessonInput, index) => <div key={index} style={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
            }}>
                <Form.Item style={{
                            width: "calc(50% - 10px)",
                           
                        }}
                        validateStatus={errors && errors.lessonInputs && errors.lessonInputs[index] && errors.lessonInputs[index].weekday ? "error" : "success"} 
                        help={errors && errors.lessonInputs && errors.lessonInputs[index] && errors.lessonInputs[index].weekday? errors.lessonInputs[index].weekday : ""}
                        >
                    <Select
                        showSearch
                        
                        size="large"
                        placeholder="Search to Weekdays"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        onChange={value => onChangeWeekday(index, value)}
                        value={lessonInputs[index].weekday ? lessonInputs[index].weekday : undefined}
                    >
                        {weekDays.map(item => <Option value={item} key={item}>{item}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item style={{
                            width: "calc(50% - 10px)",
                           
                        }}
                        validateStatus={errors && errors.lessonInputs && errors.lessonInputs[index] && errors.lessonInputs[index].time ? "error" : "success"} 
                        help={errors && errors.lessonInputs && errors.lessonInputs[index] && errors.lessonInputs[index].time? errors.lessonInputs[index].time : ""}
                        
                        >
                    <Select
                        showSearch
                        
                        size="large"
                        placeholder="Search to Time"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        onChange={value => onChangeTime(index, value)}
                        value={lessonInputs[index].time ? lessonInputs[index].time : undefined}
                    >
                        {time.map(item => {
                            let t = item.split(" ");
                            t = t[0]
                            return <Option value={t} key={t}>{item}</Option>
                        })}
                    </Select>
                </Form.Item>
                { mentor === null &&
                <CloseOutlined
                onClick={() => deleteLesson(index)}
                style={{
                    color: "#ff0000",
                    position: "absolute",
                    right: "-18px",
                    top: "13px",
                    cursor: "pointer"
                }}/>}
            </div>)}
            { mentor === null &&
            <Button onClick={addLesson}>Add</Button>
            }
        </Modal>
    )
}


const mapDispatchToProps = dispatch => ({
    createLessonAction: bindActionCreators(createLesson, dispatch),
    createBusyAction: bindActionCreators(createBusy, dispatch),
    updateMentorAction: bindActionCreators(updateMentor, dispatch),
    getActiveGroupsAction: bindActionCreators(getActiveGroups, dispatch),
    getRoomsAction: bindActionCreators(getRooms, dispatch),
    getCoursesAction: bindActionCreators(getCourses, dispatch),
    getMentorsAction: bindActionCreators(getMentors, dispatch),
    updateLessonAction: bindActionCreators(updateLesson, dispatch),
    updateBusyAction: bindActionCreators(updateBusy, dispatch)
})

const mapStateToProps = state => ({
    loading: state.lessonsReducers.isLoading,
    load: state.searchReducers.isLoading,
    rooms: state.roomsReducers.rooms,
    courses: state.coursesReducers.courses,
    mentors: state.mentorsReducers.mentors,
    errors: state.lessonsReducers.errors,
    activeGroups: state.groupsReducers.activeGroups,
})

export default  connect(mapStateToProps, mapDispatchToProps)(LessonModal)