import React from 'react';
import moment from 'moment';
import { List, Space, Divider, Avatar } from 'antd';
import { useRouteMatch, Link } from 'react-router-dom';

const SearchResultCard = ({ cardType, content }) => {
    const { url } = useRouteMatch();
    console.log({ content, cardType });

    switch (cardType) {
        case "room":
            return ((
                <Link to="room-link">
                    <List.Item
                        className="discussion-card"
                        key={''}
                        style={{ background: 'white'}}
                        grid={{ column: 4 }}
                    >
                        <List.Item.Meta
                        title={
                            <div className="discussion-header-styles">
                                <Link to={`${url}/discussion/${''}?view=popular`} >
                                    {content.room_name}
                                </Link>
                            </div>
                        }
                        />
                        {content.description}
                    </List.Item>
                </Link>
            ));
        case "post":
            return ((
                <Link to="post-link">
                    <List.Item
                        className="discussion-card"
                        key={''}
                        style={{ background: 'white'}}
                        grid={{ column: 4 }}
                    >
                        <List.Item.Meta
                        title={
                            <div className="discussion-header-styles">
                                <Link to={`${url}/discussion/${content.id}?view=popular`} >
                                    {content.title}
                                </Link>
                            </div>
                        }
                        description={
                            <Space>
                            {moment(content.created_at).fromNow()}
                            </Space>
                        }
                        />
                        {content.description}
                    </List.Item>
                </Link>
            ));
        case "comment":
            return ((
                <Link to="parent-post-link">
                    <List.Item
                        className="discussion-card"
                        key={''}
                        style={{ background: 'white'}}
                        grid={{ column: 4 }}
                    >
                        <List.Item.Meta
                        title={
                            <div className="discussion-header-styles">
                                <Link to={`${url}/discussion/${''}?view=popular`} >
                                    {''}
                                </Link>
                            </div>
                        }
                        description={
                            <Space>
                            Posted by
                            <Link to={`/user/${''}`} >
                                username_goes_here
                            </Link>
                            <Divider type="vertical" />
                            {moment(content.created_at).fromNow()}
                            </Space>
                        }
                        />
                        {content.comment}
                    </List.Item>
                </Link>

            ));
        case "user":
            return ((
                <Link to="user-profile-link">
                    <List.Item
                        className="discussion-card"
                        key={''}
                        style={{ background: 'white'}}
                        grid={{ column: 4 }}
                    >
                        <List.Item.Meta
                        title={
                            <Space>
                                <Avatar src={content.profile_picture} size="large" />
                                {content.display_name}
                            </Space>
                        }
                        />
                        {'user bio here blah blah blah'}
                    </List.Item>
                </Link>
            ));
        default:
            return 'No card type supplied.'    
    }
};


export default SearchResultCard;
