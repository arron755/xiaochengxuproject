<template>
	<!-- 地址栏组件 -->
	<view>

		<view class="myaddress" v-if="JSON.stringify(address1) === '{}'">
			<view>
				<button type="primary" class="addressbtn" @click="chooseAddress">请选择收货地址+</button>
			</view>
		</view>

		<view class="myaddress1" v-else @click="chooseAddress">
			<view class="rowone">
				<view>收货人：{{address1.userName}}</view>
				<view>电话：{{address1.telNumber}}</view>
			</view>
			<view class="rowtwo">
				收货地址：{{useraddress}}
			</view>
		</view>


		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>

</template>

<script>
	import {
		mapMutations,
		mapState,
		mapGetters
	} from 'vuex';
	export default {
		name: "my-address",
		data() {
			return {}
		},
		methods: {
			...mapMutations('address', ['updateaddress']),
			async chooseAddress() {
			 // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				//    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
			 const [err, succ] = await uni.chooseAddress().catch(err => err)
			 console.log(err);
			 console.log(succ);
				// 2. 用户成功的选择了收货地址
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					// 为 data 里面的收货地址对象赋值
					this.updateaddress(succ)
				}
				// 3. 用户没有授权
				if (err && (err.errMsg === 'chooseAddress:fail auth deny'|| err.errMsg === 'chooseAddress:fail authorize no response')) {
					this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
				}
			},
			// 调用此方法，重新发起收货地址的授权
			async reAuth() {
			  // 3.1 提示用户对地址进行授权
			  const [err2, confirmResult] = await uni.showModal({
			    content: '检测到您没打开地址权限，是否去设置打开？',
			    confirmText: "确认",
			    cancelText: "取消",
			  })
			
			  // 3.2 如果弹框异常，则直接退出
			  if (err2) return
			
			  // 3.3 如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
			  if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
			
			  // 3.4 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
			  if (confirmResult.confirm) return uni.openSetting({
			    // 3.4.1 授权结束，需要对授权的结果做进一步判断
			    success: (settingResult) => {
			      // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
			      if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
			      // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
			      if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
			    }
			  })
			}

		},
		computed: {
			...mapState('address', ['address1']),
			...mapGetters('address', ['useraddress'])
			// Alladdress(){
			// 	if (!this.address1.provinceName) return ''
			// 	return this.address1.provinceName + this.address1.cityName + this.address1.countyName + this.address1.detailInfo
			// }
		}
	}
</script>

<style lang="scss">
	.address-border {
		width: 100%;
		height: 5px;
	}


	.myaddress {
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.addressbtn {
			width: 130px;
			height: 30px;
			font-size: 12px;
			line-height: 30px;
		}
	}

	.myaddress1 {
		height: 150rpx;
		display: flex;
		flex-direction: column;
		padding: 10px;
		justify-content: space-around;

		.rowone {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-size: 12px;
		}

		.rowtwo {
			font-size: 12px;
		}
	}
</style>
