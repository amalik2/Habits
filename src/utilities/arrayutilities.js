
/**
 * Remove the first occurrence of the specified value from the array
 
 */
export function removeFromArray(array, value){
	for (var i = array.length - 1; i >= 0; --i) {
		if (array[i] === value) {
			array.splice(i,1);
			return;
		}
	}
}