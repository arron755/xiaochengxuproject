export default{
	namespaced:true,
	
	
	state:() => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	}),
	
	mutations:{
		addcart(state,value){
			const findResult = state.cart.find(x => x.goods_id === value.goods_id)
			if(!findResult){
				state.cart.push(value)
			}else{
				findResult.goods_count++
			}
			this.commit('cart/saveToStorage')
		},
		
		// 将状态保存到vuex中
		updateGoodsState(state,value){
			const findResult = state.cart.find(x=>x.goods_id === value.goods_id)
			if(findResult){
				findResult.goods_state = value.goods_state 
			}
			this.commit('cart/saveToStorage')
		},
		// 将商品数量保存到vuex中
		updateGoodsCount(state,val){
			const findResult = state.cart.find(x=>x.goods_id === val.goods_id)
			if(findResult){
				findResult.goods_count = val.goods_count
			}
			this.commit('cart/saveToStorage')
		},
		deleteGoods(state,val){
			 state.cart = state.cart.filter(x => x.goods_id !== val.goods_id)
			 this.commit('cart/saveToStorage')
		},
		// 数据保存到本地
		saveToStorage(state) {
		   uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
		  // 循环更新购物车中每件商品的勾选状态
		  state.cart.forEach(x => x.goods_state = newState)
		  // 持久化存储到本地
		  this.commit('cart/saveToStorage')
		}
	},
	
	getters: {
		total(state){
			let c = 0	
			state.cart.forEach(v=>c += v.goods_count)
			return c
		},
		sum(state){
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total += item.goods_count * item.goods_price,0).toFixed(2)
		},
		// 勾选的商品的总数量
		checkedCount(state) {
		  // 先使用 filter 方法，从购物车中过滤器已勾选的商品
		  // 再使用 reduce 方法，将已勾选的商品总数量进行累加
		  // reduce() 的返回值就是已勾选的商品的总数量
		  return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		}
	},
}