# EmailJS 配置说明

## 📧 如何设置真实的邮件发送功能

你的网站现在已经集成了EmailJS，但需要进行配置才能真正发送邮件。

### 🚀 设置步骤：

#### 1. 创建EmailJS账户
- 访问 [EmailJS官网](https://www.emailjs.com/)
- 注册免费账户（每月可发送200封邮件）

#### 2. 添加邮件服务
- 登录后，点击 "Add New Service"
- 选择你的邮件服务商（Gmail推荐）
- 按照指引连接你的Gmail账户

#### 3. 创建邮件模板
- 点击 "Create New Template"
- 设置模板内容，使用以下变量：
  ```
  From: {{from_name}} ({{from_email}})
  Subject: {{subject}}
  
  Message:
  {{message}}
  ```

#### 4. 获取配置信息
- **Public Key**: 在Account页面找到
- **Service ID**: 在Services页面找到
- **Template ID**: 在Templates页面找到

#### 5. 更新代码
在 `script.js` 文件中替换以下占位符：

```javascript
// 第308行 - 替换YOUR_PUBLIC_KEY
emailjs.init("YOUR_PUBLIC_KEY");

// 第356-357行 - 替换Service ID和Template ID
const response = await emailjs.send(
    'YOUR_SERVICE_ID',    // 替换为你的Service ID
    'YOUR_TEMPLATE_ID',   // 替换为你的Template ID
    templateParams
);
```

### 🔧 当前功能特点：

#### ✅ **已实现功能**：
- 表单验证（必填字段、邮箱格式）
- 发送中状态显示（按钮变为"Sending..."）
- 成功/失败通知
- 自动表单重置

#### 🛡️ **备用方案**：
- 如果EmailJS失败，会自动打开用户的邮件客户端
- 使用mailto链接，预填收件人和内容

#### 📬 **邮件接收**：
- 所有邮件都会发送到：`siruiw67@gmail.com`
- 包含发送者姓名、邮箱、主题和消息内容

### 🎯 **不配置EmailJS的情况**：
如果不配置EmailJS，表单仍然可以工作：
- 点击"Send Message"后会自动打开邮件客户端
- 预填收件人、主题和内容
- 用户可以直接发送邮件

### 📞 **需要帮助？**
如果在配置过程中遇到问题，请告诉我具体的错误信息，我可以帮你解决。
