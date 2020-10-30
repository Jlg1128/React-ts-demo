let baseURL;
let paybackURL;
if (REACT_APP_TEST === 'local') {
  baseURL = 'https://meetingtest.abcpen.com/api';
  paybackURL = 'https://meetingtest.abcpen.com/playback/presentation/2.0/playback.html';
} else {
  baseURL = `${window.location.origin}/api`;
  paybackURL = `${window.location.origin}/playback/presentation/2.0/playback.html`;
}

/**
 * 和网络请求相关的参数信息
 */
const apiConf = {
  // baseURL: 'https://approuter.abcpen.com/api',
  baseURL,
  paybackURL,
  shareURL: 'https://a.abcpen.com',
  openSchemeURL: 'zmeet://meeting/join',
  userApi: {
    login: '/user/signIn',
    loginForAccount: '/user/loginPassword', // 账号密码登录
    loginForWechat: '/user/signInWechat',
    sendVerifyCode: '/user/sendVerifyCode',
    refreshToken: '/user/refreshToken',
    registerStatus: '/userSetting/registerStatus',
    registerPassword: '/user/registerPassword', // 用户名密码注册
    resetPassword: '/user/resetPassword', // 重置密码
  },
  roomApi: {
    getJoinUrl: '/room/getJoinUrl',
    getJoinUrlByOpen: '/room-open/getJoinUrl',
    getMainJoinUrl: '/room/mainJoinUrl',
    getJoinSessionToken: '/room/getJoinSessionToken',
    getJoinSessionTokenByOpen: '/room-open/getJoinSessionToken',
    roomDetailByMeetingId: '/room-open/roomDetailByMeetingId',
    roomDetailByUid: '/room-open/roomDetailByUid',
    getReservedList: '/room/listTodayReservedRooms', 
    reserveRoom: '/room/reserveRoom',
    updateReservedRoom: '/room/updateReservedRoom',
    cancelReserved: '/room/cancelReservedRoom',
  
  },
  //会议相关
  meetingApi:{ 
     getMeetingAttendees:'/room/historicalMeetingAttendeeList', //导出参会人员列表excel
     getMeetingDetail: '/room/historicalMeetingDetail', //获取会议详情
     getMeetingListByDuration: '/room/findHomeMeeting'  ,//获取时间段的会议记录 包括历史和计划。替代getReservedList: '/room/listTodayReservedRooms
     deleteHistoryMeeting: '/room/deleteHistroyRoom' //删除历史会议
  },
  // 录像接口
  videoApi: {
    getList: '/recordInfo/list', // 获取录制列表
    isPublic: '/record/isPublic', // 是否公开录像
    delete: '/recordInfo/delete', // 删除录像
  },

 
  // 企业信息配置
  enterpriseApi: {
    getMemberList: '/org/findOrgUser', // 获取企业成员列表
    deleteUser: '/org/deleteOrgUser', // 删除企业机构用户
    getMeetingList: '/room/findRoom', // 获取企业成员列表 
    getVideoListByMeeting:'/recordInfo/findRecordsByMeetingIdAndStartTime', //根据会议获取录像
    createMember:'/org/addOrgUser',  //机构新增用户
    updateMember:'/org/updateOrgUser',//更新机构用户
    activeMember:'/orgopen/updateInviteStatus', //激活机构用户
    // imgUploadToken: '/cloud/getUploadToken', //cos图片上传,
    imgUploadToken: '/org/getUploadToken', //cos图片上传,
    enterPriseSettings: '/org/addOrgInfo', //添加机构信息
    updataEnterPriseInfo: '/org/updateOrgInfo',  //更新机构信息。
    enterPriseInfo: '/userSetting/basicInfo', //机构信息查询,
    getTotalMembers:'/org/addedAccountsNumber',//获取机构人员总数
  },

  // 云盘接口
  cloudDiskApi: {
    queryList: '/cloud/listUserCloudObjects', // 获取用户的云盘列表
    deleteItem: '/cloud/deleteUserCloudObject', // 删除云盘文件
    renameItem: '/cloud/renameUserCloudObject', // 重命名云盘文件 
    fileUploadToken: '/cloud/getUploadToken', //文件上传,
    addItem: '/cloud/deleteUserCloudObject', // 删除云盘文件
  },

  // 账户相关
  account: {
    basicInfo: '/userSetting/basicInfo', // 账户基本信息
    undateInfo: '/userSetting/update', // 更新基本信息
    bindMobile: '/userSetting/bindMobile', // 绑定手机
    bindEmail: '/userSetting/bindEmail', // 绑定邮箱
    uploadFile: '/upload/file', // 上传文件
    latestPackage: '/package/latest', // 最新客户端地址
  },
  systemApi: {
    getSystemSetting: '/systemSetting/list',
  },

  //二维码相关
  orCode: {
    getWechatQRCodeTicket: '/user/getQRCodeTicket', //  获取微信公众号二维码
    getWechatQRCodeLoginStatus: '/user/QRCode/query' //获取登录状态
  },
};

export default apiConf;
