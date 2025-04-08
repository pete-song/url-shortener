export function generateShortId(URL_SIZE: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let shortenUrl = '';
    for (let i = 0; i < URL_SIZE; i++) {
      shortenUrl += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortenUrl;
}