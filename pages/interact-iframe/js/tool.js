export default {
	listToSet(list) {
		const set = {}
		list.forEach(item => {
			set[item.id] = item
		})
		return set
	}
}