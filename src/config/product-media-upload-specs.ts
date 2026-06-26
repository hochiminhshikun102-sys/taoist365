export type ProductMediaType = "original" | "main" | "detail" | "scene" | "pc" | "mobile" | "social" | "motion";

export type ProductMediaUploadSpec = {
  type: ProductMediaType;
  title: string;
  usage: string;
  accept: string;
  required?: boolean;
  specs: string[];
};

export const productMediaUploadSpecs: ProductMediaUploadSpec[] = [
  {
    type: "main",
    title: "白底产品图 / 首位视频",
    usage: "商品页、流转物件、收纳物件、通用合成打底；也是列表、搜索、集合、购物车的首图来源。",
    accept: "image/*,video/*",
    required: true,
    specs: [
      "图片锁定 2400 x 2400，1:1，纯白底，留白充足，淡光影，无重反光。",
      "第一张主图必须是白底产品图；如果详情页第一屏用视频，仍要上传白底产品图做列表缩略图和合成打底。",
      "视频建议 1920 x 1080，静音循环短片，MP4/WebM，无水印、无硬字幕。",
      "纯白底图进入 Air Engine 后统一调成 RI 低饱和治愈调性。",
    ],
  },
  {
    type: "original",
    title: "原始素材",
    usage: "保留买手、供应商、链接导入或老板上传的原始证据。",
    accept: "image/*,video/*,.pdf",
    specs: [
      "可保留原比例、原水印和原始文件名，用于溯源，不直接作为前台主图。",
      "同一宝贝的供应商图、买手实拍、聊天资料和授权资料都放这里。",
      "产品边缘被裁切的原图必须标记，后续由 Air Engine 自动补全，保证商品完整。",
    ],
  },
  {
    type: "detail",
    title: "细节图",
    usage: "用于详情页材质、纹理、瑕疵、尺寸和包装说明。",
    accept: "image/*",
    specs: [
      "锁定 1800 x 2400，3:4。",
      "必须拍清材质、纹理、边角、底部、瑕疵、刻印、包装和尺寸参照。",
      "不得过度美颜到失真，瑕疵与使用痕迹要如实呈现。",
    ],
  },
  {
    type: "scene",
    title: "场景图",
    usage: "用于房间、桌面、架上、使用状态和氛围展示。",
    accept: "image/*",
    specs: [
      "横版场景图锁定 2400 x 1600，3:2。",
      "要求欧美居家风、横构图、松弛自然光，画面要能看出真实摆放场景。",
      "非白底图不符 RI 调性时，后续由 Air Engine 自动换合规背景。",
    ],
  },
  {
    type: "pc",
    title: "首页大气主图 / PC 大封面",
    usage: "用于首页首屏、板块大封面、桌面端宽屏详情模块。",
    accept: "image/*",
    specs: [
      "锁定 3200 x 1800，16:9。",
      "要求大留白、强空气感，适合横向讲故事、组合陈列和购买理由。",
    ],
  },
  {
    type: "mobile",
    title: "手机竖版氛围图",
    usage: "用于移动端首页、手机分区氛围页和移动端详情模块。",
    accept: "image/*",
    specs: [
      "锁定 1600 x 2400，2:3。",
      "文字说明要留安全边距，不能贴边，不能被底部按钮遮挡。",
    ],
  },
  {
    type: "social",
    title: "AI 融合氛围图 / 社媒输出",
    usage: "用于全平台通用氛围感成品图、小红书、Pinterest、Instagram、广告和分享卡片。",
    accept: "image/*",
    specs: [
      "AI 融合氛围图锁定 2400 x 1600，3:2。",
      "不得带第三方平台水印；如有文字，保留上下安全区。",
    ],
  },
  {
    type: "motion",
    title: "氛围视频 / 动效",
    usage: "用于详情页视频、静音循环背景氛围短片、开箱证明和动态展示。",
    accept: "video/*",
    specs: [
      "锁定 1920 x 1080，16:9，静音循环优先。",
      "拍清商品转动、开合、细节和手持比例；不得有第三方水印。",
    ],
  },
];

export function findProductMediaUploadSpec(type: string) {
  return productMediaUploadSpecs.find((spec) => spec.type === type);
}
