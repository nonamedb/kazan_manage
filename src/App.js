import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import { Provider } from "react-redux";
import store from "./store/store";
import EventDetail from './panels/EventDetail';
import CreateEvent from './panels/CreateEvent';
import InviteUsers from './panels/InviteUsers';

import Welcome from './panels/Welcome';
import Home from './panels/Home';

const App = ({ setVkInfo }) => {
	const [activePanel, setActivePanel] = useState('welcome');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	const go = e => {
		setActivePanel(e);
	};

	return (
		<Provider store={store}>
			<View activePanel={activePanel}>
				<Welcome id="welcome" go={go} />
				<Home id='home' go={go} />
				<EventDetail id='eventdetail' go={go} />
				<CreateEvent id='createevent' go={go}></CreateEvent>
				<InviteUsers id="inviteusers" go={go}></InviteUsers>
			</View>
		</Provider>
	);
}

export default App;
