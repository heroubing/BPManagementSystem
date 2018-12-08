/**
 * 工具类
 */
import MockData from './MockData'

export default class Utils {
  static USE_MOCK = false;
  /**
   * get网络请求公共方法
   * @param url           请求接口(controller的actionName+'!'+方法名+'.json'：eg.'mobilemain!getListCacheManager.json')
   * @param params        参数
   * @param that          传入vue用于显示遮罩层
   */
  static getInfo (url, params = {}, that) {
    console.log('【网络请求接口】', url)
    console.log('【网络请求入参】', params)
    const loading = that.$loading({
      lock: true,
      text: '加载中，请稍等...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    if (Utils.USE_MOCK) {
      return MockData(url, params, loading)
    }
    // 拼写方法
    url += '?' + this.paramsToUrl(params)
    return fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log('【网络请求出参】', json)
        loading.close()
        if (json.code === 200) {
          return json
        } else {
          that.$notify.error({
            title: '错误',
            message: json.msg
          })
          return Promise.stop()
        }
      })
      .catch(e => {
        console.error(e)
        loading.close()
        that.$notify.error({
          title: '错误',
          message: e.message
        })
        // 停止链式传递
        return Promise.stop()
      })
  }

  /**
   * get网络请求公共方法
   * @param url           请求接口(controller的actionName+'!'+方法名+'.json'：eg.'mobilemain!getListCacheManager.json')
   * @param params        参数
   * @param that          传入vue用于显示遮罩层
   */
  static getInfoPost (url, params = {}, that) {
    console.log('【网络请求接口】', url)
    console.log('【网络请求入参】', params)
    const loading = that.$loading({
      lock: true,
      text: '加载中，请稍等...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    if (Utils.USE_MOCK) {
      return MockData(url, params, loading)
    }
    return fetch(url, {
      method: 'POST',
      body: params
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('【网络请求出参】', json)
        loading.close()
        if (json.code === 200) {
          return json
        } else {
          that.$notify.error({
            title: '错误',
            message: json.msg
          })
          return Promise.stop()
        }
      })
      .catch(e => {
        console.error(e)
        loading.close()
        that.$notify.error({
          title: '错误',
          message: e.message
        })
        // 停止链式传递
        return Promise.stop()
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
        paramsArr.push(key + '=' + params[key])
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
   * @param that
   * @returns {Promise<*>}
   */
  static async getAllPageList (API, list, page, that) {
    let {result, info} = await Utils.getInfo(API, {page}, that)
    let returnList = [...list, ...result]
    if (returnList.length < info.pagination.count) {
      returnList = await this.getAllPageList(API, returnList, ++page, that)
    }
    return returnList
  }
}
