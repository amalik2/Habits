/**
 * Get whether two dates are on the same day or not
 * NOTE: both dates will have their time component modified
 * @param one the first date to compare
 * @param two the second date to compare
 * @return whether the two dates on the same day
 */
export function isSameDate(one, two){
	
	if (one == null || two == null)
		return false;
	
	one.setHours(1);
	one.setMinutes(1);
	one.setSeconds(1);
	one.setMilliseconds(1);
	
	two.setHours(1);
	two.setMinutes(1);
	two.setSeconds(1);
	two.setMilliseconds(1);
	
	return !(one.getTime() < two.getTime()) && !(two.getTime() < one.getTime());
}
