import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import InfoRow from '@vkontakte/vkui/dist/components/InfoRow/InfoRow';
import { connect, useSelector } from 'react-redux';
import vkConnect from '@vkontakte/vk-connect';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Axios from 'axios';

const EventDetail = ({ id, go, events, currentOpen, vkInfo }) => {
	const handleClick = () => {
		vkConnect.send('VKWebAppAllowMessagesFromGroup', { group_id: 186998404 });
	};

	const beep = () => {
		Axios.get('https://swanky-ragdoll.glitch.me/beep');
	}

	const currentInfo = events.find(item => item.id === currentOpen) || {};

	return (
		<Panel id={id}>
			<PanelHeader left={<HeaderButton onClick={() => go('home')}>
				{<Icon24Back/>}
			</HeaderButton>}>
				{currentInfo.name}
            </PanelHeader>
			<Group title="Информация о событии">
				<List>
					<Cell>
						<InfoRow title="Описание">
							{currentInfo.description}
						</InfoRow>
					</Cell>
					<Cell>
						<InfoRow title="Дата начала">
							{`${new Date(currentInfo.start_date * 1000).toLocaleString('ru-RU')}`}
						</InfoRow>
					</Cell>
					<Cell>
						<Button onClick={beep}>Привлечь внимание</Button>
					</Cell>
				</List>
			</Group>
		</Panel>
    );
};

const mapStateToProps = state => {
	console.log('eventDetailed', state);
	return { events: state.events.events, currentOpen: state.events.currentOpen, vkInfo: state.user.vkInfo };
}

export default connect(
	mapStateToProps,
)(EventDetail);
