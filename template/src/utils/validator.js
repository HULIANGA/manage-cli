import Schema from 'async-validator';

export const validateRules = {
  password: {
    type: 'string',
    required: true,
    asyncValidator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (value.length < 6 || value.length > 18) {
          reject(new Error('请输入6至18位密码')); // reject with error message
        } else {
          resolve();
        }
      });
    }
  }
};

export default function validate(valid) {
  var descriptor = {};
  var validData = {};
  valid.forEach(obj => {
    descriptor[obj.key] = validateRules[obj.type];
    validData[obj.key] = obj.value;
  });
  var validator = new Schema(descriptor);

  return new Promise((resolve, reject) => {
    validator.validate(validData, (errors, fields) => {
      if (errors) {
        reject(errors[0].message); // 返回第一条错误信息
      } else {
        resolve();
      }
    });
  });
}