import { useEffect, useState, useRef } from 'react'
import AMapLoader from "@amap/amap-jsapi-loader";
import { Cascader } from 'antd-mobile'
import { options } from '@/lib/data.js'

export default function Weather() {
  const [visible, setVisible] = useState(false)
  const [city, setCity] = useState('北京市')
  const isFirstRef = useRef(true)
  const [currentWeather, setCurrentWeather] = useState({})


  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "e0d42562628d66decf9dfc19065e6573",
    };
    AMapLoader.load({
      key: "abd14573dee674f98ef407ad5dd0c53b", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
      .then(() => {
        // 高德地图已经生效
        // 获取定位城市

        getLocationCity()

      })
      .catch((error) => {
        console.error('高德地图 SDK 加载失败：', error)
      })
  }, [])

  useEffect(() => {  // 我希望组件初次加载时不触发天气查询
    if (isFirstRef.current) {
      isFirstRef.current = false
      return
    }
    // 获取天气
    getWeather()
  }, [city])  // city变更后会重新执行   ===   观察者

  const getLocationCity = async () => {
    AMap.plugin('AMap.CitySearch',function () {
      var citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
          // console.log(result);
          setCity(result.city)
        } else if (status === 'no_data') {
          console.warn('高德城市查询无数据：高德未返回当前出口 IP 的城市信息，可尝试更换网络。', { status, result })
        } else {
          console.error('高德城市查询失败：', { status, result })
        }
      })
    })
  }

  const selectedCity = (value) => {
    setCity(value[1])
  }

  const getWeather = () => {
    //加载天气查询插件
    AMap.plugin("AMap.Weather", function () {
      //创建天气查询实例
      var weather = new AMap.Weather();
      //执行实时天气信息查询
      weather.getLive(city, function (err, data) {
        console.log(err, data);
        //err 正确时返回 null
        //data 返回实时天气数据，返回数据见下表
        setCurrentWeather(data)
      });
    });
  }

  return (
    <div>
      <div className="head flex justify-between h-[53px] bg-[#8E6FF7] text-white items-center pr-[15px] pl-[15px]">
        <div className="location">
          <i className="iconfont icon-dingwei mr-[8px]"></i>
          <span className="text-[18px]">{city}</span>
        </div>
        <div className="change-location">
          <div onClick={() => setVisible(true)} className="btn pl-[13px] pr-[13px] pt-[4px] pb-[4px] bg-white/20 rounded-[4px]">
            <i className="iconfont icon-24gf-city text-[14px]! mr-[3px]"></i>
            <span className="text-[14px]">切换城市</span>
          </div>
        </div>
      </div>
      <div className="main p-[16px]">
        <div className="current rounded-[16px] bg-linear-to-br from-[#8E6FF7]/10 to-[#8E6FF7]/5 p-[24px]">
          <div className="value text-center">
            <div className="num text-[60px]">{currentWeather.temperature + '°'}</div>
            <div className="weather text-[18px] text-[#4B5563]">{currentWeather.weather}</div>
          </div>
          <div className="detail flex gap-4 mt-6 text-center text-[16px]">
            <div className="item flex-1 ">
              <i className="iconfont icon-shuidi text-[#8E6FF7]"></i>
              <p className="text-[#4B5563]">湿度</p>
              <p className="font-medium">{currentWeather.humidity + '%'}</p>
            </div>
            <div className="item flex-1">
              <i className="iconfont icon-fengxiang text-[#8E6FF7]"></i>
              <p className="text-[#4B5563]">风向</p>
              <p className="font-medium">{currentWeather.windDirection}</p>
            </div>
            <div className="item flex-1">
              <i className="iconfont icon-wind-power text-[#8E6FF7]"></i>
              <p className="text-[#4B5563]">风力</p>
              <p className="font-medium">{currentWeather.windPower}</p>
            </div>
          </div>
        </div>
        <div className="future"></div>
        <div className="temperature"></div>
      </div>

      <Cascader
        options={options}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        onConfirm={selectedCity}
      />
    </div>
  )
}
