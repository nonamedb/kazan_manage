import React, { useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import './Welcome.css';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import VKconnect from '@vkontakte/vk-connect';
import { connect } from 'react-redux';
import { setVkInfo, setToken, setMyEvents, getVolEvents } from '../store/actions';
import { Avatar } from '@vkontakte/vkui';
import Axios from 'axios';

const Welcome = ({ id, go, setVkInfo, vkInfo }) => {
	useEffect(() => {
		VKconnect.subscribe(e => {
			console.log('event', e);
			const { type, data } = e.detail;
			if (type === 'VKWebAppGetUserInfoResult') {
				setVkInfo(data);

				return;
			}
			if (type === 'VKWebAppAccessTokenReceived') {
				setToken(data.access_token);

				return;
			}

			if (type === 'VKWebAppCallAPIMethodResult' && data.request_id === 'groups.get') {
				setMyEvents(data.response.items);

				return;
			}
		});
		VKconnect.send('VKWebAppGetUserInfo');
		VKconnect.send('VKWebAppGetAuthToken', { app_id: 7151645, scope: 'groups' });
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader>
				Старт
			</PanelHeader>
			<div className="welcome">
				<img className="logo" src="/Logo.gif"></img>
				<span className="greeting">{`Привет, ${vkInfo.first_name}!`}</span>
				<div className="desc">С помощью этого приложения вы сможете привлечь добровольцев со всей России для Вашего проекта</div>
				<div className="divider"></div>
				<Button className="goButton" size="xl" onClick={() => go('home')}>Начать</Button>
			</div>
		</Panel>
	);
};

const mapStateToProps = state => {
	console.log('welcome', state);
	return { vkInfo: state.user.vkInfo };
}

export default connect(
	mapStateToProps,
	{ setVkInfo },
  )(Welcome);
