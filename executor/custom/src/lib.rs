#[no_mangle]
pub extern fn fx(n: i32) -> i64 {
	if n < 0 {
		return -1;
	} else if n == 0 {
		return -1;
	} else if n == 1 {
		return 1;
	}

	let mut sum = 0;
	let mut last = 0;
	let mut curr = 1;
	for _i in 1..n {
		sum = last + curr;
		last = curr;
		curr = sum;
	}
	return sum
}