import React from 'react';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

const Event = ({ go, event, handleClick }) => (
    <Cell onClick={handleClick}
        before={event.photo_200 ? <Avatar src={event.photo_200}/> : null}
        description={event.description}
    >
        {event.name}
    </Cell>
);

export default Event;
