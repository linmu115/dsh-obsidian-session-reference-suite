# 0.3.4-rc2.14：会话主干图组合

> 历史适用范围：本文保留当时的设计、包名、测试和安装事实。Suite 父组/旧桥包的交付形态已被 2026-09-18 用户确认的[单一 Bridge 产品方案](changes/2026-09-18-single-bridge-product.md)取代；当前安装项与验收不从本文旧版本推定。

更新显式兼容范围、开发构件及 members：Annotation Core 0.3.12-rc2.8、Bridge Lifecycle 0.3.3-rc2.12、Reference Adapter 0.3.4-rc2.12、Sticker Board 0.7.3-rc2.14。Obsidian Companion 保持 0.6.4-rc2.6。

保持 Core → Lifecycle → Reference Adapter → Sticker 的单一父组顺序，子项不重复挂载为根 bundle。12 项组合测试通过；实际 DSH 0.1.5-rc.2 副本由同批 Maintenance 报告记录完整宿主探针及安装结果。
