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
    usage: "商品页、Objects、列表、搜索、合集、购物车、Wind Seeker、Windkeep 与 AI 合成打底的主素材。",
    accept: "image/*,video/*",
    required: true,
    specs: [
      "图片锁定 2400 x 2400，1:1，纯白或极浅灰白底，留白充足，淡光影，无重反光。",
      "第一张主图必须有白底产品图；详情首屏可以使用视频，但仍需上传白底图作为列表缩略图和合成打底。",
      "视频建议 1920 x 1080，MP4/WebM，静音循环短片，无水印、无硬字幕、无第三方平台标识。",
      "白底图进入 Air Engine 后统一调成 Dohara 低饱和、空气感、干净柔和的商品调性。",
    ],
  },
  {
    type: "original",
    title: "原始素材 / 来源证据",
    usage: "保留买手、供应商、链接导入、老板上传、聊天资料、授权文件或原始参考图。",
    accept: "image/*,video/*,.pdf",
    specs: [
      "可保留原比例、原水印和原文件名，用于溯源，不直接作为前台发布主图。",
      "同一宝贝的供应商图、买手实拍、聊天资料、授权资料都放在这里。",
      "产品边缘裁切、低清、重水印、疑似侵权的原图必须标记，后续由 Air Engine 重建、补边、换背景或替换。",
    ],
  },
  {
    type: "detail",
    title: "细节实拍图",
    usage: "详情页材质、纹理、瑕疵、尺寸、包装、局部质感展示。",
    accept: "image/*",
    specs: [
      "锁定 1800 x 2400，3:4。",
      "必须拍清材质、纹理、边角、底部、瑕疵、刻印、包装和尺寸参照。",
      "不得过度美颜到失真；瑕疵与使用痕迹要如实呈现。",
    ],
  },
  {
    type: "scene",
    title: "横版场景图",
    usage: "房间、桌面、架上、使用状态、生活实景和故事场景。",
    accept: "image/*",
    specs: [
      "锁定 2400 x 1600，3:2，横向构图。",
      "欧美真实空间、桌面、窗边、亚麻、木头、自然光，画面要松弛、留白、能呼吸。",
      "非白底图不符 Dohara 调性时，由 Air Engine 换合规背景或重建氛围图。",
    ],
  },
  {
    type: "pc",
    title: "首页大气主图 / PC 大封面",
    usage: "首页首屏、板块大封面、桌面端宽屏详情模块。",
    accept: "image/*",
    specs: [
      "锁定 3200 x 1800，16:9。",
      "大留白、强空气感、不拥挤，适合横向讲故事、组合陈列和购买理由。",
    ],
  },
  {
    type: "mobile",
    title: "手机竖版氛围图",
    usage: "移动端首页、手机分区氛围页和移动端详情模块。",
    accept: "image/*",
    specs: [
      "锁定 1600 x 2400，2:3。",
      "主体不要贴边，文字说明要留安全边距，不能被底部按钮或系统导航遮挡。",
    ],
  },
  {
    type: "social",
    title: "AI 融合氛围图 / 社媒输出",
    usage: "全平台通用氛围感成品图、小红书、Pinterest、Instagram、广告和分享卡片。",
    accept: "image/*",
    specs: [
      "锁定 2400 x 1600，3:2。",
      "不得带第三方平台水印；如有文字，保留上下安全区。",
    ],
  },
  {
    type: "motion",
    title: "氛围视频 / 动效",
    usage: "详情页视频、静音循环背景氛围短片、开箱证明和动态展示。",
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
