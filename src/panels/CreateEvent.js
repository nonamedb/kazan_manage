import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { connect, useSelector } from 'react-redux';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import vkConnect from '@vkontakte/vk-connect';
import { FormLayout, Textarea } from '@vkontakte/vkui';
import { createEvent, getVolEvents } from '../store/actions';
import Axios from 'axios';

const CreateEvent = ({ id, go, events, vkInfo }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [count, setCount] = useState(0);
    const [ev, setEv] = useState('');
    const [grant, setGrant] = useState(0);
    const [activity, setActivity] = useState('');

    const handleSelect = e => {
        const value = e.currentTarget.value;
        setEv(value);
    }

    const create = () => {
        try {
            const img = events.find(item => {
                console.log(item, 'item', ev);
                return item.id == ev;
            });
            console.log('img', img)
            const event = {
                name,
                description: desc,
                volunteer_count: count,
                community_id: ev,
                reward: grant,
                bot: true,
                event_subject: activity,
                org_vk_id: String(vkInfo.id),
                img: img.photo_200 || null,
            };
            vkConnect.send('VKWebAppAllowMessagesFromGroup', { group_id: 186998404 });
            Axios.get(`https://swanky-ragdoll.glitch.me/add?type=organizers&id=${vkInfo.id}`);
            createEvent(event);
        } catch (error) {
            console.error(error);
        } finally {
            getVolEvents(String(vkInfo.id));
            go('home');
        }
    }

    const options = events.map(item => (<option value={item.id}>{item.name}</option>));

	return (
		<Panel id={id}>
			<PanelHeader left={<HeaderButton onClick={() => go('home')}>
				{<Icon24Back/>}
			</HeaderButton>}>
                Создание
            </PanelHeader>
            <FormLayout>
                <Input
                    top="Название"
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                ></Input>
                <Textarea top="Описание" value={desc} onChange={e => setDesc(e.currentTarget.value)}></Textarea>
                <Select top="Мероприятие" placeholder="Выберите мероприятие" value={ev} onChange={(e) => handleSelect(e)}
                >{options}</Select>
                <Select top="Тематика" placeholder="Выберите тематику" value={activity} onChange={(e) => setActivity(e.currentTarget.value)}>
                    <option value="charity">Благотворительность</option>
                    <option value="animals">Животные</option>
                    <option value="education">Образование</option>
                    <option value="healthy">Здоровье</option>
                    <option value="culture">Культура</option>
                </Select>
                <Input
                    type="number"
                    top="Кол-во волонтёров (в баллах)"
                    value={count}
                    onChange={e => setCount(e.currentTarget.value)}
                ></Input>
                <Input
                    type="number"
                    top="Вознаграждение"
                    value={grant}
                    onChange={e => setGrant(e.currentTarget.value)}
                ></Input>
                <Button size="xl" onClick={create}>Создать</Button>
            </FormLayout>
		</Panel>
    );
};

const mapStateToProps = state => {
	console.log('createevent', state);
	return { events: state.events.events, vkInfo: state.user.vkInfo };
}

export default connect(
	mapStateToProps,
)(CreateEvent);
