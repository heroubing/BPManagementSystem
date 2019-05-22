/**
 * 工具类
 */
import {Loading, Notification} from 'element-ui'
import MockData from './MockData'

export default class Utils {
  // 是否使用模拟数据
  // static USE_MOCK = false;
  static USE_MOCK = true;

  /**
   * get网络请求公共方法
   * @param url           请求接口(controller的actionName+'!'+方法名+'.json'：eg.'mobilemain!getListCacheManager.json')
   * @param params        参数
   * @param isShowLoading 是否加载遮罩层
   * @param dealError     是否需要自动处理错误
   */
  static getInfo (url, params = {}, isShowLoading = true, dealError = true) {
    console.log('【网络请求接口及入参】', url, params)
    if (isShowLoading && !window.TOAST_STS) {
      window.TOAST_STS = true
      this.loading = Loading.service({
        lock: true,
        text: '加载中，请稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        fullscreen: true
      })
    }

    if (Utils.USE_MOCK) {
      return MockData(url, params, isShowLoading)
    }
    // 拼写方法
    url += '?' + this.paramsToUrl(params)
    return fetch(url, {
      credentials: 'include'
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`${res.status}-${res.statusText}`)
        } else {
          return res.json()
        }
      })
      .then((json) => {
        console.log('【网络请求接口及出参】', url, json)
        if (isShowLoading) this.closeLoading()
        if (dealError) {
          if (json.code === 200) {
            return json
          } else if (json.code === 400) {
            this.deal400Error(json)
            return Utils.stopPromise()
          } else {
            Notification.error({
              title: '错误',
              message: json.msg
            })
            return Utils.stopPromise()
          }
        } else {
          return json
        }
      })
      .catch(e => {
        console.error(e)
        if (isShowLoading) this.closeLoading()
        Notification.error({
          title: '错误',
          message: '请求出错，请联系管理员。【错误信息】' + e.message
        })
        // 停止链式传递
        return Utils.stopPromise()
      })
  }

  /**
   * get网络请求公共方法
   * @param url           请求接口(controller的actionName+'!'+方法名+'.json'：eg.'mobilemain!getListCacheManager.json')
   * @param params        参数
   * @param isShowLoading 是否加载遮罩层
   * @param dealError     是否需要自动处理错误
   */
  static getInfoPost (url, params = {}, isShowLoading = true, dealError = true) {
    console.log('【网络请求接口及入参】', url, params)
    if (isShowLoading && !window.TOAST_STS) {
      window.TOAST_STS = true
      this.loading = Loading.service({
        lock: true,
        text: '加载中，请稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        fullscreen: true
      })
    }
    if (Utils.USE_MOCK) {
      return MockData(url, params, isShowLoading)
    }
    let formData = new FormData()
    for (let key in params) {
      formData.append(key, this.isNotNull(params[key]) ? params[key] : '')
    }
    return fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`${res.status}-${res.statusText}`)
        } else {
          return res.json()
        }
      })
      .then((json) => {
        console.log('【网络请求接口及出参】', url, json)
        if (isShowLoading) this.closeLoading()
        if (dealError) {
          if (json.code === 200) {
            return json
          } else if (json.code === 400) {
            this.deal400Error(json)
            return Utils.stopPromise()
          } else {
            Notification.error({
              title: '错误',
              message: json.msg
            })
            return Utils.stopPromise()
          }
        } else {
          return json
        }
      })
      .catch(e => {
        console.error(e)
        if (isShowLoading) this.closeLoading()
        Notification.error({
          title: '错误',
          message: e.message
        })
        // 停止链式传递
        return Utils.stopPromise()
      })
  }

  /**
   * 对象参数转url拼接
   * @param params
   * @returns {string}
   */
  static paramsToUrl (params) {
    try {
      let paramsArr = []
      for (let key in params) {
        let param = key + '=' + (this.isNotNull(params[key]) ? params[key] : '')
        paramsArr.push(param)
      }
      return paramsArr.join('&')
    } catch (e) {
      console.error(e)
      return ''
    }
  }

  /**
   * 获取字符串真实长度
   * @param string
   * @returns {number}
   */
  static getStringRealLength (string) {
    let l = string.length
    let length = 0
    for (let i = 0; i < l; i++) {
      if ((string.charCodeAt(i) & 0xff00) !== 0) {
        length++
      }
      length++
    }
    return length
  }

  /**
   * 递归获取分页查询的所有数据
   * @param API
   * @param list
   * @param page
   * @returns {Promise<*>}
   */
  static async getAllPageList (API, list, page) {
    let {result, info} = await Utils.getInfo(API, {page})
    let returnList = [...list, ...result]
    if (returnList.length < info.pagination.count) {
      returnList = await this.getAllPageList(API, returnList, ++page)
    }
    return returnList
  }

  static closeLoading () {
    this.loading.close()
    window.TOAST_STS = false
  }

  /**
   * 判断是否不为[空字符串/null/undefined]
   * @param value
   * @returns {boolean}
   */
  static isNotNull (value) {
    // number类型且为0时为真
    if (typeof value === 'number' && value === 0) {
      return true
    }
    return !!value
  }

  /**
   * 400类错误处理
   * @param json
   */
  static deal400Error (json) {
    let {info} = json
    let message = ''
    if (info && info.errors) {
      let {errors} = info
      message += `【${json.msg}】\n`
      for (let key in errors) {
        message += `【${key}】`
        errors[key].forEach((item) => {
          message += `${item.message}`
        })
        message += '\n'
      }
    } else {
      message = json.msg
    }
    Notification.error({title: '错误', message})
  }

  /**
   * 阻止promise继续链式下去
   */

  static stopPromise () { return new Promise(() => {}) }
}
