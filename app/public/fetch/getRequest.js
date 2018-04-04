import CryptoJS from 'crypto-js'
/**
 * [getRequest description]
 * @param  {[json]} params [参数]
 * 拼接参数 转换成aes加密密文
 *
 */
export default function getRequest (pm) {
  let key = CryptoJS.enc.Utf8.parse('d3YmI1BUOSE2S2YmalBVZUQ='),
    iv = CryptoJS.enc.Utf8.parse('0000000000000000');
  let params = JSON.stringify(pm);
  let srcs = CryptoJS.enc.Utf8.parse(params);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let res =encodeURI(CryptoJS.enc.Base64.stringify(encrypted.ciphertext)).replace(/\+/g, '%2B');;
  return res;
  // return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
