# LeftMenu组件二级菜单导航使用手册

#### 调用说明

```
<my-left-menu :menus="menus" @click="changeRoute"></my-left-menu>
```

#### 参数说明

| 参数            | 说明                             |  类型   | 默认值             |
| :-------------- | :------------------------------- | :-----: | :----------------- |
| menus           | 传入数据                         |  Array  | []                 |
| default-active  | 默认展开的菜单                   | string  | ''                 |
| uniqueOpened    | 是否只保持一个子菜单的展开单元格 | boolean | true               |
| delay           | 展开缩放动画延时                 | number  | 300                |
| activeImg       | 下拉图标                         | string  |
| background      | 背景色                           | string  | #263238            |
| textColor       | 文本颜色                         | string  | #ffffff            |
| activeTextColor | 激活文本颜色                     | string  |                    |
| borderColor     | 激活菜单border颜色               | string  | #34a0ce            |
| hoverBgColor    | hover菜单背景色                  | string  | rgba(0, 0, 0, 0.1) |

#### 数据格式说明
```
[
  {
    name: "网站配置",
    route: "net",
    icon: "my-icon-milk-tea",
    img: require("@/assets/images/menu/icon.png"),
    activeImg: require("@/assets/images/menu/icon-a.png"),
    children: [
      { name: "网站设置", route: "test1" },
      { name: "分类管理", route: "test2" },
    ],
  }
]

```
| 参数      | 说明                             |
| :-------- | :------------------------------- |
| name      | 菜单名称                         |
| route     | 跳转路由名称                     |
| icon      | 自定义图标（配置icon后自动隐藏） |
| img       | 非激活菜单时的图片               |
| activeImg | 激活菜单时的图片                 |
| children  | 子元素                           |


#### icon说明

icon集成element-ui图标，命名修改 el-icon-platform-eleme --> my-icon-platform-eleme。
如果不用icon图标需要传入activeImg及 menus参数中的img和activeImg。
icon地址：https://element.eleme.cn/#/zh-CN/component/icon


#### 事件说明

```
changeRoute({route}){
  this.$router.push({name: route})
}
```
| 事件名称 | 说明                                             |
| :------- | :----------------------------------------------- |
| click    | 菜单点击事件时的回调，默认参数为当前点击菜单对象 |
