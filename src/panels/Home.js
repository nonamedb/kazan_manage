import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import { connect, useSelector } from 'react-redux';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Store from '../components/Store';
import { Div, InfoRow, Button, Avatar } from '@vkontakte/vkui';
import Event from '../components/Event';
import VKconnect from '@vkontakte/vk-connect';
import { openEvent, getVolEvents } from '../store/actions';
import './Home.css';

const Home = ({ id, go, vkInfo, token, events, volEvents }) => {
	const [popout, setPopout] = useState(null);
	const handleClick = (id) => {
		openEvent(id);
		go('eventdetail');
	};

	useEffect(() => {
		(async function() {
			try {
				getVolEvents(vkInfo.id);
			} catch (error) {
				
			}
		})();
	}, []);

	const eventsList = events.map(e => {
		return (<Event key={e.id} handleClick={() => handleClick(e.id)} event={e} />)
	});

	const volEvs = volEvents.map(e=> {
		const ev = events.find(item => item.id === e.community_id);
		const data = {
			name: e.name,
			description: e.description,
			photo_200: ev.photo_200,
		};
		return (<Event key={e.id} handleClick={() => handleClick(ev.id)} event={data} />);
	});

	return (
		<Panel id={id}>
			<PanelHeader>Личный кабинет</PanelHeader>
			<div className="info">
				<img className="ava" src={vkInfo.photo_200}></img>
				<div className="name">{`${vkInfo.first_name} ${vkInfo.last_name}`}</div>
				<Button className="create" size="xl" onClick={() => go('createevent')}>Объявить набор</Button>
			</div>
			<Group title="Текущие наборы">{volEvs}</Group>
			<Group title="Мои события">{eventsList}</Group>
		</Panel>
	);
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
	console.log('home', state)
	if (state.events.events.length === 0 && state.user.token) {
		VKconnect.send('VKWebAppCallAPIMethod', {
			method: 'groups.get', request_id: 'groups.get', params: {
				v: '5.61', access_token: state.user.token, filter: 'moder',
				extended: 1,
				fields: 'description,start_date,finish_date',
			}
		});
	}
	return { vkInfo: state.user.vkInfo, token: state.user.token, events: state.events.events, volEvents: state.events.volEvents };
}

export default connect(
	mapStateToProps,
  )(Home);
