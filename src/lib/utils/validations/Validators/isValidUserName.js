export default function isValidUserName(username) {
    // Regex rule for usernames. 
    // Usernames can contain characters a-z, 0-9, underscores and periods.
    // The username cannot start with a period nor end with a period. 
    // It must also not have more than one period sequentially. 
    // Max length is 26 chars
    // Min length is 5 chars
    var pattern = new RegExp(/^[a-zA-Z_](?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,26}$/);
    // must start with alphbets or _
    // must not contain special characters other then . _
    var pattern2 = new RegExp(/^[a-zA-Z_][a-zA-Z0-9._]*$/);
    // 
    return pattern.test(username);
}