import React from 'react';
import moment from 'moment';
import { List, Space, Divider, Avatar } from 'antd';
import { useRouteMatch, Link } from 'react-router-dom';

const SearchResultCard = ({ cardType, content }) => {
    const { url } = useRouteMatch();

    switch (cardType) {
        case "room":
            return ((
                <Link to={`/room/${content.id}`}>
                    <List.Item
                        className="discussion-card"
                        key={content.id}
                        style={{ background: 'white'}}
                        grid={{ column: 4 }}
                    >
                        <List.Item.Meta
                            title={
                                <div className="discussion-header-styles">
                                    {content.room_name}
                                </div>
                            }
                        />
                        {content.description}
                    </List.Item>
                </Link>
            ));
        case "post":
            return ((
                <Link to={`${url}/discussion/${content.id}?view=popular`} >
                    <List.Item
                        className="discussion-card"
                        key={content.id}
                        style={{ background: 'white'}}
                        grid={{ column: 4 }}
                    >
                        <List.Item.Meta
                        title={
                            <div className="discussion-header-styles">
                                {content.title}
                            </div>
                        }
                        description={
                            <Space>
                                Posted by {content.display_name}
                                <Divider type="vertical" />
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
                <Link to={`${url}/discussion/${content.post_id}?view=popular`} >
                    <List.Item
                        className="discussion-card"
                        key={content.id}
                        style={{ background: 'white'}}
                        grid={{ column: 4 }}
                    >
                        <List.Item.Meta
                        title={
                            <div className="discussion-header-styles">
                                {''}
                            </div>
                        }
                        description={
                            <Space>
                                Posted by {content.display_name}
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
                <Link to={`/user/${content.id}`} >
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
            return 'No card type supplied.'; 
    }
};


export default SearchResultCard;
