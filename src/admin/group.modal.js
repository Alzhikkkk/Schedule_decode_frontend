import {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createGroup, updateActiveGroup } from '../store/actions/groupActions';
import {Modal , Input , Button, DatePicker} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import moment from 'moment';
const { RangePicker } = DatePicker;
function GroupModal({group, isModalVisible , handleCancel, loading, createGroupAction, updateGroupAction}){
    const [name, setName] = useState("");
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const handleOk = () => {
        if(!group){
            createGroupAction(name,start,end)
        }
        else{
            updateGroupAction({id: group.id, name, start, end})
           }
        };

    const onChange = e => {
        setName(e.target.value)
    }

    const onChangeDebut = (range) => {
        setStart(new Date(range[0].format()));
        setEnd(new Date(range[1].format()));
        console.log(typeof new Date(range[0].format()))
    }

    useEffect(() => {
        if(group){
            setName(group.name)
            setStart(group.start)
            setEnd(group.end)
        }
    }, [group])

    useEffect(() => {
        if(!loading) {
            setName("")
            setStart(null)
            setEnd(null)
            handleCancel();
        }
    }, [loading])

    
        
    

    return(
        <Modal 
            title="Добавление группы" 
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
            <Input value={name} onChange={onChange} size="large" placeholder="Введите имя группы" prefix={<UserOutlined />} className='group'/>
            {
            group !== null ?
            <RangePicker showTime  size="large" onChange={onChangeDebut} value={[moment(end), moment(start)]}/>
            :
            <RangePicker showTime  size="large" onChange={onChangeDebut} />
            }
        </Modal>
    )
   
}


const mapDispatchToProps = dispatch => ({
    createGroupAction: bindActionCreators(createGroup, dispatch),
    updateGroupAction: bindActionCreators(updateActiveGroup, dispatch)
})

const mapStateToProps = state => ({
    loading: state.groupsReducers.isLoading
})

export default  connect(mapStateToProps, mapDispatchToProps)(GroupModal)