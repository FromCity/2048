function animation(params) {
	const { update, render, clear } = params;

	requestAnimationFrame(tick);

	function tick() {
		requestAnimationFrame(tick)

		update()
		clear()
		render()
	}
}