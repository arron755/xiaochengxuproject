export default {
	namespaced: true,

	state: () => ({
		address1: JSON.parse(uni.getStorageSync('address') || '{}'),
	}),

	mutations: {
		updateaddress(state,val) {
			state.address1 = val
			this.commit('address/saveAddressToStorage')
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address1))
		},
	},

	getters: {
		useraddress(state){
			if (!state.address1.provinceName) return ''
			return state.address1.provinceName + state.address1.cityName + state.address1.countyName + state.address1.detailInfo
		}
	},
}
