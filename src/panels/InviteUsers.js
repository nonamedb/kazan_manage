import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import InfoRow from '@vkontakte/vkui/dist/components/InfoRow/InfoRow';
import { connect, useSelector } from 'react-redux';
import vkConnect from '@vkontakte/vk-connect';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import { FormLayout, Textarea, Group } from '@vkontakte/vkui';

const InviteUsers = ({ id, go, events, vkInfo }) => {

	return (
		<Panel id={id}>
			<PanelHeader left={<HeaderButton onClick={() => go('createevent')}>
				{<Icon24Back/>}
			</HeaderButton>}>
                Приглашения
            </PanelHeader>
            <Group title="Фильтры">
                <FormLayout>
                    
                </FormLayout>
            </Group>
		</Panel>
    );
};

const mapStateToProps = state => {
	console.log('createevent', state);
	return { events: state.events.events, vkInfo: state.user.vkInfo };
}

export default connect(
	mapStateToProps,
)(InviteUsers);
