// pages/table/table.js
import * as echarts from '../ec-canvas/echarts';
const app = getApp();
function inityearChart(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    var option = {
        xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
            type: 'value'
        },
        color: ["#76c17e","#e65b62"],
        title: {
            text: '年收支情况表',
            textStyle: {
                color: '#000',
                fontFamily: '微软雅黑',
                fontSize: '14',
                left: 'left',
                top: 'bottom'
            },
        },
        legend: {
            data: ['收入', '支出']
        },
        series: [{
            name: '收入',
            data: [3003, 2500, 5000, 6000, 3500, 2600, 3500, 3003, 2500, 5000, 6000, 3500],
            type: 'line'
        },
            {
                name: '支出',
                data: [3500, 1200, 1230, 1200, 1500, 2303, 1000, 1000, 2000, 1200, 1300, 600],
                type: 'line'
            }]
    };
    chart.setOption(option);
    return chart;
};
function initmonthChart(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            data: ['餐饮', '购物', '交通', '送礼', '缴费'],
            y: 'bottom',
            x: 'center'
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '餐饮' },
                    { value: 310, name: '购物' },
                    { value: 234, name: '交通' },
                    { value: 135, name: '送礼' },
                    { value: 1548, name: '缴费' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    chart.setOption(option);
    return chart;
};
Page({
    /**
     * 页面的初始数据
     */
    data: {
        year:'2019',
        montharr:[1,2,3,4,5,6,7,8,9,10,11,12],
        totalmout:2000,
        avemout:600,
        totalmin:5000,
        avemin:150,
        nowmonth: null,
        showyearechars:true,
        ec: {
            onInit: inityearChart
        },
        em:{
            onInit : initmonthChart
        }
    },
    choosemonth(ev){
        this.setData({
            nowmonth: ev.target.dataset.id,
            showyearechars: false
        })
    },
    dataChange(ev){
        this.setData({
            year: ev.detail.value,
            nowmonth:null,
            showyearechars: true
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
            url: 'http://localhost:1223/getyeardata',
            data: {
                "user_name": app.globalData.openid,
                "bill_year": this.data.year
            },
            method:'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: (res) => {
                let arr = res.data.arr;
                let yearout = 0;//年总支出
                let yearin = 0;//总收入
                let avin = 0;
                let avout = 0;
                for(var a=0;a<arr.length;a++){
                    if (arr[a].bill_sync){
                        yearin+=arr[a].bill_money
                    }else{
                        yearout += arr[a].bill_money
                    }
                }
                avin=yearin/12;//月平均收入
                avout=yearout/12;//月平均支出
                var iNow = 0;
                var arr1 = [];
                arr1[0] = [];
                arr1[0].push(arr[0]);
                var currentValue = arr[0];
                for (var i = 1; i < arr.length; i++) {
                    if (currentValue.bill_month == arr[i].bill_month) {
                        arr1[iNow].push(arr[i])
                    } else {
                        currentValue = arr[i];
                        iNow++;
                        arr1[iNow] = [];
                        arr1[iNow].push(arr[i])
                    }
                }
                var arr2 = [];
                var arr3 = [];

                for(var i=0;i<arr1.length;i++){
                    var outm = 0;
                    var inm = 0;

                    for(var j=0;j<arr1[i].length;j++){
                        if(arr1[i][j].bill_sync){
                            inm += parseFloat(arr1[i][j].bill_money)
                        }else{
                            outm += parseFloat(arr1[i][j].bill_money)
                        }
                    }
                    arr2.push(outm);
                    arr3.push(inm);

                }
                console.log(arr2,arr3)

                this.setData({
                    totalmout: yearout,
                    avemout: avout,
                    totalmin: yearin,
                    avemin: avin,
                })

            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})









// pages/table/table.js
import * as echarts from '../ec-canvas/echarts';
const app = getApp();
var Chart = null;
var Chart2 = null;
var dataList1 = [];//年支出
var dataList2 = [];//年收入
Page({
    /**
     * 页面的初始数据
     */
    data: {
        year:'2019',
        montharr:[1,2,3,4,5,6,7,8,9,10,11,12],
        totalmout:2000,
        avemout:600,
        totalmin:5000,
        avemin:150,
        nowmonth: null,
        showyearechars:true,
        showcharts:true,
        ec: {
            lazyLoad: true // 延迟加载
        }
    },
    choosemonth(ev){
        this.setData({
            nowmonth: ev.target.dataset.id,
            showyearechars: false
        });
        this.getmonthdata();
    },
    dataChange(ev){
        this.setData({
            year: ev.detail.value,
            nowmonth:null,
            showyearechars: true,
            showcharts: true
        });
        Chart = null;
        this.echartsComponnet = this.selectComponent('#mychart-dom-bar');
        this.getyeardata();
    },
    //年图表
    getyeardata(){

        wx.request({
            url: 'http://localhost:1223/getyeardata',
            data: {
                "user_name": app.globalData.openid,
                "bill_year": this.data.year
            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: (res) => {
                if(res.data.arr.length){
                    let arr = res.data.arr;
                    let yearout = 0;//年总支出
                    let yearin = 0;//总收入
                    let avin = 0;
                    let avout = 0;
                    for (var a = 0; a < arr.length; a++) {
                        if (arr[a].bill_sync) {
                            yearin += arr[a].bill_money
                        } else {
                            yearout += arr[a].bill_money
                        }
                    }
                    avin = yearin / 12;//月平均收入
                    avout = yearout / 12;//月平均支出
                    var iNow = 0;
                    var arr1 = [];
                    arr1[0] = [];
                    arr1[0].push(arr[0]);
                    var currentValue = arr[0];
                    for (var i = 1; i < arr.length; i++) {
                        if (currentValue.bill_month == arr[i].bill_month) {
                            arr1[iNow].push(arr[i])
                        } else {
                            currentValue = arr[i];
                            iNow++;
                            arr1[iNow] = [];
                            arr1[iNow].push(arr[i])
                        }
                    }
                    var arr2 = [0,0,0,0,0,0,0,0,0,0,0,0];
                    var arr3 = [0,0,0,0,0,0,0,0,0,0,0,0];

                    for (var i = 0; i < arr1.length; i++) {
                        var outm = 0;
                        var inm = 0;

                        for (var j = 0; j < arr1[i].length; j++) {
                            if (arr1[i][j].bill_sync) {
                                inm += parseFloat(arr1[i][j].bill_money)
                            } else {
                                outm += parseFloat(arr1[i][j].bill_money)
                            }
                        }

                        arr2[arr1[i][0].bill_month-1]=outm;
                        arr3[arr1[i][0].bill_month - 1] = inm

                    }
                    dataList1 = arr2;
                    dataList2 = arr3;

                    this.setData({
                        totalmout: yearout,
                        avemout: avout,
                        totalmin: yearin,
                        avemin: avin
                    })
                    if (!Chart) {
                        this.init_echarts(); //初始化图表
                    } else {
                        this.setOption(Chart); //更新数据
                    }
                }else{
                    this.setData({
                        totalmout: 0,
                        avemout: 0,
                        totalmin: 0,
                        avemin: 0,
                        showcharts:false
                    });
                    wx.showModal({
                        title: '暂无数据'
                    })
                }
            }
        })
    },
    init_echarts: function () {
        this.echartsComponnet.init((canvas, width, height) => {
            // 初始化图表
            console.log(width,height)
            Chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            // Chart.setOption(this.getOption());
            this.setOption(Chart);
            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return Chart;
        });
    },
    setOption: function (Chart) {
        Chart.clear();  // 清除
        Chart.setOption(this.getOption());  //获取新数据
    },
    getOption: function () {
        // 指定图表的配置项和数据
        var option = {
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            },
            yAxis: {
                type: 'value'
            },
            color: ["#76c17e", "#e65b62"],
            title: {
                text: '年收支情况表',
                textStyle: {
                    color: '#000',
                    fontFamily: '微软雅黑',
                    fontSize: '14',
                    left: 'left',
                    top: 'bottom'
                },
            },
            legend: {
                data: ['收入', '支出']
            },
            series: [{
                name: '收入',
                data: dataList2,
                type: 'line'
            },
                {
                    name: '支出',
                    data: dataList1,
                    type: 'line'
                }]
        }
        return option;
    },
    //月图表
    init_echarts2: function () {
        this.echartsComponnet.init((canvas, width, height) => {
            // 初始化图表
            console.log(width, height)
            Chart2 = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            // Chart.setOption(this.getOption());
            this.setOption2(Chart2);
            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return Chart2;
        });
    },
    setOption2: function (Chart) {
        Chart2.clear();  // 清除
        Chart2.setOption2(this.getOption2());  //获取新数据
    },
    getOption2: function () {
        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                data: ['餐饮', '购物', '交通', '送礼', '缴费'],
                y: 'bottom',
                x: 'center'
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: '餐饮' },
                        { value: 310, name: '购物' },
                        { value: 234, name: '交通' },
                        { value: 135, name: '送礼' },
                        { value: 1548, name: '缴费' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option;
    },
    getmonthdata() {

        wx.request({
            url: 'http://localhost:1223/getmonthdata',
            data: {
                "user_name": app.globalData.openid,
                "bill_year": this.data.year,
                "bill_month": this.data.nowmonth
            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: (res) => {
                if (res.data.arr.length) {
                    console.log(res.data.arr)
                    if (!Chart2) {
                        this.init_echarts(); //初始化图表
                    } else {
                        this.setOption(Chart2); //更新数据
                    }
                } else {
                    this.setData({
                        totalmout: 0,
                        avemout: 0,
                        totalmin: 0,
                        avemin: 0,
                        showcharts: false
                    });
                    wx.showModal({
                        title: '暂无数据'
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.echartsComponnet = this.selectComponent('#mychart-dom-bar');
        this.getyeardata();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})