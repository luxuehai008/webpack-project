let shareTrackFN=(function(){
	var uniqInstance;
	var appid = "wx0b0c2925d63500ad"; //微信公众号appid-----------需要修改
	var new_str = "f0f440064f2e23b2d541c22b4d2d8a1b"; //微信公众号secret---需要修改
	var g_config;
	var pagetit=document.title;
	var pageUrl= campaignINFO.url;//window.location.href;
	var pageHost=window.location.origin;
	var head = document.getElementsByTagName('head')[0];

	var shareData = { //发送给朋友
			title: campaignINFO.wechatTit,
			desc: campaignINFO.wechatDesc,
			link: pageUrl,
			imgUrl: pageHost+campaignINFO.shareImg,
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {
				sendfn('分享到朋友成功');
			}
		};
		var shareData2 = { //分享到朋友圈
			title: campaignINFO.wechatFriendTit,
			link: pageUrl,
			imgUrl: pageHost+campaignINFO.shareImg,
			success: function() {
				sendfn('分享到朋友圈成功');
			}
		};
		var shareData3 = { //分享到QQ,腾讯微博,QQ空间
			title: campaignINFO.wechatTit,
			desc: campaignINFO.wechatDesc,
			link: pageUrl,
			imgUrl: pageHost+campaignINFO.shareImg,
			success: function() {
				sendfn('分享到QQ-腾讯微博-QQ空间成功');
			}
		};


	function jsonp(options){
		options = options || {};
		if (!options.url || !options.callback) {
			throw new Error('请传入合法参数');
		}
		var callbackName = ('jsonp_' + Math.random()).replace('.', '');
		options.data[options.callback] = callbackName;
		var paramas = formatParams(options.data);
		var script = document.createElement('script');
		head.appendChild(script);
		window[callbackName] = function(json) {
			head.removeChild(script);
			clearTimeout(script.timer);
			window[callbackName] = null;
			options.success && options.success(json);
		};
		script.src = options.url + '?' + paramas;
		if (options.timeout) {
			script.timer = setTimeout(function() {
				window[callbackName] = null;
				head.removeChild(script);
				options.fail && options.fail(message, '请求超时');
			}, timeout);
		}
	}
	function formatParams(data) {
	    var arr = [];
	    for (var name in data) {
	        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
	    }
	    return arr.join('&');
	}
	function isWeChat(){
	  var ua = window.navigator.userAgent.toLowerCase();
	  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	  	return true;
	  }else{
	  	return false;
	  }
	}

  function $ele(ele){
  	this.eles = null;
  	if(ele.match(/^\#/)){
  		this.eles = document.getElementById(ele.replace('#',''));
  	}else if(ele.match(/^\./)){
  		this.eles = document.getElementsByClassName(ele.replace('.',''));
  	}else{
  		this.eles = document.getElementsByTagName(ele);
  	}
  	return this.eles;
  }

	function loadScript(url,callback){
	　　var script=document.createElement('script');
	　　script.type='text/javascript';
	　　script.async='async';
	　　script.src=url;
	　　head.appendChild(script);
	　　if(script.readyState){
	　　　　script.onreadystatechange=function(){
	　　　　　if(script.readyState=='complete'||script.readyState=='loaded'){
	　　　　　　　script.onreadystatechange=null;
	　　　　　　　callback && callback();
	　　　　　}
	　　　　}
	　　}else{
	　　　　script.onload=function(){
				callback && callback();
			}
	　　}
	}

	function weixinShare(){
			loadedCall();
			function loadedCall(){
				jsonp({
					url: '//special.mercedes-benz.com.cn/v-class_vip_limoexperience/action/wx_jssdk.php',
					callback: 'jsonpcallback',
					data: {
						url: encodeURIComponent(window.location.href.split('#')[0]),
						appid: appid,
						new_str: new_str
					},
					success: function(result){
						g_config = result;
						wxreset(result);
					}
				});
			}
	}


	function wxreset(result){
					wx.config({
						debug: false,
						appId: appid, // 必填，公众号的唯一标识
						timestamp: result.timestamp, // 必填，生成签名的时间戳
						nonceStr: result.noncestr, // 必填，生成签名的随机串
						signature: result.signature, // 必填，签名
						jsApiList: [
							'onMenuShareTimeline', //分享到朋友圈
							'onMenuShareQQ', //分享到QQ
							'onMenuShareWeibo', //分享到腾讯微博
							'onMenuShareAppMessage', //发送给朋友
							'onMenuShareQZone', //分享到QQ空间
							'openLocation'
						]
					});
					wx.ready(function() {
						wx.onMenuShareAppMessage(shareData); //发送给朋友
						wx.onMenuShareTimeline(shareData2); //分享到朋友圈
						wx.onMenuShareQQ(shareData3); //分享到QQ
						wx.onMenuShareWeibo(shareData3); //分享到腾讯微博
						wx.onMenuShareQZone(shareData3); //分享到QQ空间
					});
	}



	function resetShareWechat(){
		//setWeChatShareCon();
		wx.ready(function() {
			wx.onMenuShareAppMessage(shareData); //发送给朋友
			wx.onMenuShareTimeline(shareData2); //分享到朋友圈
			wx.onMenuShareQQ(shareData3); //分享到QQ
			wx.onMenuShareWeibo(shareData3); //分享到腾讯微博
			wx.onMenuShareQZone(shareData3); //分享到QQ空间
		});
	}

	function sendfn(data,data1){
		if(data != ''){
			var dataC = (''+data).split('_');
			if(typeof _smq != 'undefined') {
				_smq.push(['custom', campaignINFO.name, dataC[0], dataC[1]]);
			}
		}
		if(data1 != ''){
			if(typeof _ha != 'undefined') {
				_ha("send","action",data1);
			}
		}
	}
	function bindTrack(){
		var _ele = document.getElementsByClassName('setAMTrack');
		var _len = _ele.length,_data = null,_data1 = null,_target = '',_href = '';
		var re = /\/|\.html/;
		for(var i = 0; i < _len; i++) {
			_target = _ele[i].getAttribute('target') ? _ele[i].getAttribute('target') : '';
			_href = _ele[i].getAttribute('href') ? _ele[i].getAttribute('href') : '';
			if(_href.search(re) > -1 && _target != '_blank') {
				_ele[i].onclick = function() {
					_data = this.getAttribute('data-admtrack');
					_data1 = this.getAttribute('data-dmptrack');
					sendfn(_data,_data1);
					var d = this.target ? this.target : "_self",e = this.href;
					setTimeout(function() {
						window.open(e, d);
					}, 200);
					return false;
				}
			} else {
				_trackBindEvent(_ele[i], 'click', function() {
					_data = this.getAttribute('data-admtrack');
					_data1 = this.getAttribute('data-dmptrack');
					sendfn(_data,_data1);
				})
			}
		}
		function _trackBindEvent(obj, ev, fn) {
			obj.addEventListener ? obj.addEventListener(ev, fn, false) : obj.attachEvent('on' + ev, fn);
		}
	}
	function definit(){
		bindTrack();
		weixinShare();
	}
	return {
		restWeChat : function(){
			return resetShareWechat();
		},
		track: function(data){
			return sendfn(data);
		},
		init: function() {
			if(!uniqInstance) {
				uniqInstance = definit();
			}
			return uniqInstance;
		}
	}
})()

function bindEvent(obj, ev, fn){
    obj.addEventListener?obj.addEventListener(ev, fn, false):obj.attachEvent('on'+ev, fn);
}
bindEvent(window,'load',function(){shareTrackFN.init()});
$('.form-submit').bind('click',function(){
	  var name = $('.last_name').val() + $('.first_name').val();
		var tel = $('.mobile').val();
		_smq&&_smq.push(['custom', 'EQC_提交', name, tel]);
		_ha&&_ha("send","action","tdr_submit")
})
