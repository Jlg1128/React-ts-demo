const RegExr = {
  // 手机号验证
  isMobileNumber(value: string) {
    const val = value.trim();
    return this.isNumber(val) && val.length >= 8;
  },

  // 验证EMAIL
  isEmail: (email: string) => /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(email),

  // 6位验证码验证
  codeNumber: (value: string) => {
    const reg = /^\d{6}$/;
    return reg.test(value);
  },

  // 验证整数
  integer: (value: string) => {
    const reg = /[^0-9]|^0+(?!$)/g;
    return reg.test(value);
  },

  // 验证字符串中是否存在数字
  haveNum: (value: string) => {
    const reg = /\d/g;
    return reg.test(value);
  },

  // 验证数字
  isNumber(value: string) {
    return this.isNotEmpty(value) && !isNaN(Number(value));
  },

  isEmpty(val: string) {
    return val === '' || val === undefined || val === null || val === 'undefined' || val === 'null';
  },

  isNotEmpty(val: string) {
    return !this.isEmpty(val);
  },

  // 去除无效字符串
  removeInvalidString: (value: string) => {
    if (value) {
      const reg = value.replace(/(^\s*)|(\s*$)/g, '');
      return reg;
    }
    const reg = undefined;
    return reg;
  },

  /**
   * 去除所有空字符串
   */
  removeAllSpace: (value: string) => {
    if (value) {
      const reg = value.replace(/\s+/g, '');
      return reg;
    }
    const reg = undefined;
    return reg;
  },

  /**
   * 占位符匹配 表达式
   */
  matchPlaceholder: () => /\{%([^{.]*)}/g,

  isUrl: (url: string) => {
    const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(url);
  },

  /**
   * 过滤a标签，获取<a>文本</a>
   * */
  getTagAContent: (value: string): string => {
    const re = /<a[^>]*href=['"]([^"]*)['"][^>]*>(.*?)<\/a>/g;
    const arr = [];
    while (re.exec(value) !== null) {
      //如果是RegExp.$1那么匹配的就是href里的属性了!
      arr.push(RegExp.$2);
    }
    return arr.join('');
  },
};

export default RegExr;
