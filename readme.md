## Lambda Alumni Network (LAN)

An app that allows Lambda School alums to connect and grow in their profession by providing career advice, job opportunities, and much more!

### Contributors

Team A Members...

### Documentation

- [Product Canvas](https://docs.google.com/document/d/1-EyxKbikGrsTf08nTBxqso0zCdZ0HnKnJG7sbXu-d3s/edit#heading=h.n2quesrx1caj)
- [Trello Board](https://trello.com/b/NOH7uQ8q/lambda-alumni-network)
- [Design Files](https://projects.invisionapp.com/share/DRJBSR53VNS#/screens?browse)

### Tech Stack

* `React`
* `Redux`
* `styled-components`
* `antd`
* `axios`

### Installation

1. Once you have cloned the repository, download the dependencies with `npm install`.
2. Start the server with `npm start`.

Note: there used to be a linting issue with Windows machines where it would throw a "carrige return" (cr) error. This should be fixed by now but in case it shows up, make sure your files are saved, then run `npm run lint` to fix it. 

### Organization

If you want to follow Lambda School conventions, here is the [documentation](https://docs.labs.lambdaschool.com/labs-spa-starter/components#component-tree-architecture) for that. All of the components that'll be refering to are inside of `assets`. Below is a chart of what components are being rendered where.

```
Dashboard.js
|-- Navbar.js
|   |-- LambdaLogo.js
|   |-- ProfileIcon.js
|   `-- SearchBar.js
|-- SiderMenu.js
|   `-- CreateNewModal.js
|-- RoomContent.js
|   `-- Feed.js
|       `-- DiscussionCard.js
|           |-- PopoverContent.js
|           |   |-- UserFlaggingModal.js
|           |   `-- FlagManagerModal.js
|           |-- FlagChip.js
|           `-- DiscussionDrawer.js
`-- DashboardContent.js
```

You'll notice that there are a few files not included in this chart but that are inside of assets.

`GlobalStyleTheme.js` - This is part of the global themes. It's a JS file but it's interpreted as `.less`. In fact, you'll notice the files inside of `styles` are all `.less`.

`CheckIfModOrAdmin.js` - This should be in `utils`.

#### **pages**

Pages are any components that are rendered through the route in `App.js`. The only component for the new UI so far is `Dashboard.js` under the "/sample" endpoint. Everything else is subrouted from there.

In terms of file structure it would be good to have a `pages` folder. This would be good for expandability, for example `Settings.js` could be rendered as it's own page.

```
src
| ...
|
|-- pages
|   `-- Dashboard.js
|
...
```

#### **components**

* `CreateNewRoomModal.js` - the modal that shows up when you click "Create Room" at the bottom of the sider menu. The state managment for this modal is handeled through the redux store. 
* `DashboardContent.js` - just a placeholder for now but the idea is that you could import `Feed.js` and use it to display the most recent posts for all of the rooms. 
* `DiscussionCard.js` - the individual discussion that shows up in the feed.
* `DiscussionDrawer.js` - when the title of any discussion is clicked, this component is rendered with the appropriate route as well. This component is also rendered when the `FlagChip.js` component is clicked but with the "?view=flagged" route appended. 
* `Feed.js` - uses `antd`'s `List` component to show all of the appriate posts.
* `FlagChip.js` - rendered on the discussion card. This should only be rendered for moderators. 
* `FlagManagerModal.js`
* `LambdaLogo.js`
* `Navbar.js`
* `PopoverContent.js`
* `ProfileIcon.js`
* `RoomContent.js`
* `SearchBar.js`
* `UserFlaggingModal.js`
