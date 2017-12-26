
/**
 * Get whether the specified string is alphanumeric or not. Spaces are allowed, there must be
 * atleast one non-space character
 * @param str the string to check
 * @return whether the string contains only alphanumeric characters or not
 */
export function isAlphanumeric(str) {
	
	if (str.length === 0)
		return false;
	
	// whether all characters in the string are spaces or not
	let allSpaces = true;;
	
	for (let i = 0, len = str.length; i < len; i++) {
		const code = str.charCodeAt(i);
		
		if (str.charAt(i) != ' '){
			if (!(code > 47 && code < 58) && // numeric (0-9)
				!(code > 64 && code < 91) && // upper alpha (A-Z)
				!(code > 96 && code < 123)) { // lower alpha (a-z)
			  return false;
			}
			allSpaces = false;
		}
	}
	
	return !allSpaces;
}