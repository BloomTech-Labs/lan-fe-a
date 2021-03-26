// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { Link, useParams, useRouteMatch } from 'react-router-dom';
// import { Modal, Button } from 'antd';

// const FlagManagerModal = (props) => {
//   const { id } = useParams;
//   const { path, url } = useRouteMatch;

//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [flaggingReasons, setFlaggingReasons] = useState(
//     'this is the list of flag type filters'
//   );
//   const [flagList, setFlagList] = useState('this is the list of flags');

//   useEffect(() => {
//     //fetch reasons for flagging
//     //fetch flags by discussion or comment id
//     setFlaggingReasons();
//   }, []);

//   handleApprove = (params) => {};
//   handleArchive = (params) => {};
//   handleEscalate = (params) => {};
//   handleContactUser = (params) => {};

//   return (
//     <div>
//       <Modal></Modal>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(FlagManagerModal);
